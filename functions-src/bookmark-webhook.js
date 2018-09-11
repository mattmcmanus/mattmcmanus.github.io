import dotenv from 'dotenv';
dotenv.config();

import Request from './lib/request';
import MicropubDocument from './lib/micropub-document';
import GitHubPublisher from 'github-publish';

const { GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO, VALID_WEBHOOK_URLS } = process.env;

export async function handler(event, context, callback) {
  console.log("EVENT", event)

  let devMode = true;

  let request = new Request(event);

  if (request.isPost()) {
    let rawObject = await request.parseBody();
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
