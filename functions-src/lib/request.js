import busboy from 'busboy';
import _ from 'lodash';

export default class Request {
  constructor(request) {
    this.request = request;
    this.method = request.httpMethod;
    this.headers = request.headers;
  }

  isPost() {
    return this.method === 'POST';
  }

  async parseBody() {
    if (this.headers['content-type'].includes('application/x-www-form-urlencoded')) {
      return await this.parseFormBody(this.request.body);
    } else {
      return JSON.parse(this.request.body);
    }
  }

  parseFormBody(body) {
    let bb = new busboy({ headers: { 'content-type': 'application/x-www-form-urlencoded' }});
    let content = {};

    return new Promise(function(resolve, reject) {
      bb.on('field', (key, val) => {
        if (key.includes('[]') ) {
          key = key.replace('[]', '');
          content[key] = content[key] || [];
          content[key].push(val);
        } else {
          content[key] = val
        }
        })
        .on('finish', () => resolve(content))
        .on('error', err => reject(err))

      bb.end(body);
    });
  }
}
