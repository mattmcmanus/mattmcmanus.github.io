import dotenv from 'dotenv';
dotenv.config();

import MicropubRequest from './lib/micropub-request';
import IndieAuthToken from './lib/indie-auth-token';
import MicropubDocument from './lib/micropub-document';
import GitHubPublisher from 'github-publish';

const { GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO } = process.env;

export async function handler(event, context, callback) {
  console.log("EVENT", event)
  console.log("CONTEXT", context)

  let authorized = await new IndieAuthToken(event, context).verify();

  if (!authorized) {
    return callback(null, { statusCode: 403, body: '' });
  }

  let request = new MicropubRequest(event);

  if (request.isPost()) {
    let rawObject = await request.parseBody();
    let document = new MicropubDocument(rawObject);

    let publisher = new GitHubPublisher(GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO);
    let path = document.path();
    let payload = await document.toYAML();

    let published = await publisher.publish(path, payload, {
      message: `Publishing ${path}`
    })

    if (published) {
      callback(null, { statusCode: 201, body: '' });
    } else {
      console.error('GITHUB PUBLISHING FAILED', published);
      
    }

  } else {
    callback(null, { statusCode: 200, body: '' });
  }
}
