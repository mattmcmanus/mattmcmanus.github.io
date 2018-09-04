import fetch from 'node-fetch';

const TOKEN_ENDPOINT = 'https://tokens.indieauth.com/token';
const ME_URL = 'https://mcmanus.io';

class IndieAuthToken {
  constructor(authHeader) {
    if (!authHeader) {
      throw new Error('No Bearer Token');
    }
  }

  async verify() {
    let json = {};
    try {
      let res = await fetch(TOKEN_ENDPOINT, {
        headers: {
          'Accept': 'application/json',
          'Authorization': bearer
        }
      });
      json = await res.json();
    } catch (e) {
      console.error('IndieAuthToken ERROR', e);
      return false;
    }

    return json.me === ME_URL;
  }
}
