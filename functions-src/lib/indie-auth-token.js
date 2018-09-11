import fetch from 'node-fetch';

const { MICROPUB_TOKEN_ENDPOINT, MICROPUB_ME_URL } = process.env;

export default class IndieAuthToken {
  constructor(event, devMode) {
    this.event = event;
    this.devMode = devMode;
  }

  async verify() {
    if (this.devMode) { return true; }
    if (!this.event.headers.authorization) { return false; }

    let { authorization } = this.event.headers;
    let res;
    try {
      console.log('Verifying IndieAuthToken at', MICROPUB_TOKEN_ENDPOINT);
      res = await fetch(MICROPUB_TOKEN_ENDPOINT, {
        headers: {
          'Accept': 'application/json',
          'Authorization': authorization
        }
      });
    } catch (e) {
      console.error('IndieAuthToken ERROR', e);
      return false;
    }

    let json = await res.json();
    console.log("IndieAuthToken TOKEN Response", json);


    //TODO: Throw Me and Scope specific errors

    return json.me === MICROPUB_ME_URL && json.scope.includes('create');
  }
}
