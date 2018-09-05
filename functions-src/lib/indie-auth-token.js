import fetch from 'node-fetch';

const { MICROPUB_TOKEN_ENDPOINT, MICROPUB_ME_URL } = process.env;

export default class IndieAuthToken {
  constructor(event, context) {
    if (!event.headers.authorization) {
      throw new Error('No Bearer Token');
    }

    if (Object.keys(context).length == 0) {
      this.devMode = true;
    }

    this.event = event;
  }

  async verify() {
    if (this.devMode) { return true; }

    let { authorization } = this.event.headers;
    let json = {};
    try {
      let res = await fetch(MICROPUB_TOKEN_ENDPOINT, {
        headers: {
          'Accept': 'application/json',
          'Authorization': authorization
        }
      });
      json = await res.json();
    } catch (e) {
      console.error('IndieAuthToken ERROR', e);
      return false;
    }

    return json.me === MICROPUB_ME_URL;
  }
}
