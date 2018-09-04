import busboy from 'busboy';
import dateformat from 'dateformat';
import matter from 'gray-matter';
import _ from 'lodash';

export default class MicropubRequest {
  constructor(request) {
    this.request = request;
    this.method = request.httpMethod;
    this.headers = request.headers;
  }

  isPost() {
    return this.method === 'POST';
  }

  async publish() {
    console.log("PUBLISH");
    let payload = await this.toYAML();
    console.log("YAML", payload);
  }

  async toYAML() {
    let body = await this.parseBody();
    body['date'] = dateformat(new Date(),'yyyy-mm-dd HH:MM:ss');
    console.log('BODY', body);

    let frontMatter = _.omit(body, 'content');

    return matter.stringify(body.content, frontMatter);
  }

  async parseBody() {
    if (this.headers['content-type'] === 'application/x-www-form-urlencoded') {
      return await this.parseFormBody(this.request.body);
    } else {
      return JSON.parse(this.request.body);
    }
  }

  parseFormBody(body) {
    let bb = new busboy({ headers: { 'content-type': 'application/x-www-form-urlencoded' }});
    let content = {};

    return new Promise(function(resolve, reject) {
      bb.on('field', (key, val) => content[key] = val)
        .on('finish', () => resolve(content))
        .on('error', err => reject(err))

      bb.end(body);
    });

  }

  async publishToGithub() {

  }
}

  // body: 'h=entry&name=&content=PANNDA',
  // { accept: 'application/json',
  //    'accept-encoding': 'br, gzip',
  //    'accept-language': 'en-us',
  //    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZSI6Imh0dHBzOlwvXC9ub3Rlcy0tbWNtYW51cy5uZXRsaWZ5LmNvbVwvIiwiaXNzdWVkX2J5IjoiaHR0cHM6XC9cL3Rva2Vucy5pbmRpZWF1dGguY29tXC90b2tlbiIsImNsaWVudF9pZCI6Imh0dHBzOlwvXC9taWNyby5ibG9nXC8iLCJpc3N1ZWRfYXQiOjE1MzU4MjI4MTUsInNjb3BlIjoiY3JlYXRlIiwibm9uY2UiOjMxNTIyODU2OX0.D2zpzb1ahttsbyptXx4cGxwYx5FEMO9qeKJIgSdcdk4',
  //    'client-ip': '108.2.209.236',
  //    connection: 'keep-alive',
  //    'content-length': '28',
  //    'content-type': 'application/x-www-form-urlencoded',
  //    'user-agent': 'Micro.blog/44 CFNetwork/902.1 Darwin/17.7.0 (x86_64)',
  //    via: 'https/2 Netlify[205e975a-b4c2-4711-b004-8acb6b4ed1b7] (ApacheTrafficServer/7.1.4)',

  // { me: 'https://notes--mcmanus.netlify.com/',
  // issued_by: 'https://tokens.indieauth.com/token',
  // client_id: 'https://micro.blog/',
  // issued_at: 1535822815,
  // scope: 'create',
  // nonce: 315228569 }
