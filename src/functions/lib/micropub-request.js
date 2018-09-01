import fetch from 'node-fetch';
const TOKEN_ENDPOINT = 'https://tokens.indieauth.com/token';

export default class MicropubRequest {
  constructor({
    path,
    httpMethod,
    queryStringParameters,
    headers = {},
    body,
    isBase64Encoded
  }) {
    this.method = httpMethod;
    this.queryString = queryStringParameters;
    this.headers = headers;
    this.body = body;
  }

  async verifyToken() {
    let bearer = this.headers.authorization;

    if (!bearer) {
      throw new Error('No Bearer Token');
    }

    let res;
    try {
      res = await fetch(TOKEN_ENDPOINT, {
        headers: {
          'Accept': 'application/json',
          'Authorization': bearer
        }
      });
    } catch (e) {
      console.error(e)
    } finally {

    }
  	let json = await res.json();
  	console.log('TOKEN', json);

    return json;
  }
}
