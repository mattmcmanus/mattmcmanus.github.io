import dotenv from 'dotenv';
dotenv.config();

import Request from './lib/request';
import MicropubDocument from './lib/micropub-document';
import GitHubPublisher from 'github-publish';

const { GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO, WEBHOOK_TOKEN } = process.env;

export async function handler(event, context, callback) {
  console.log("EVENT", event)

  let devMode = (Object.keys(context).length == 0);

  let request = new Request(event);

  if (request.isPost()) {
    let rawObject = await request.parseBody();

    if (rawObject.token !== WEBHOOK_TOKEN) {
      return callback(null, { statusCode: 403, body: 'You must provide the correct token' });
    }

    let document = new MicropubDocument(rawObject);

    let publisher = new GitHubPublisher(GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO);
    let path = document.path();
    let payload = await document.toYAML();

    let published = false;
    if (!devMode) {
      published = await publisher.publish(path, payload, {
        message: `Publishing ${path}`
      })
    } else {
      console.log('PUBLISH', path, payload);
    }

    if (published || devMode) {
      callback(null, { statusCode: 201, body: '' });
    } else {
      console.error('GITHUB PUBLISHING FAILED', published);
    }

  } else {
    callback(null, { statusCode: 200, body: '' });
  }
}
