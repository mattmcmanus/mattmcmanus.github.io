import fetch from 'node-fetch';

const { STATIC_TOKEN } = process.env;

export default class StaticToken {
  constructor(event, devMode) {
    this.event = event;
    this.devMode = devMode;
  }

  async verify() {
    if (this.devMode) { return true; }

    return JSON.parse(this.event.body)['access_token'] === STATIC_TOKEN;
  }
}
