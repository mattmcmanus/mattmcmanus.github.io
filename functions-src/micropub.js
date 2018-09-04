import MicropubRequest from './lib/micropub-request';
import IndieAuthToken from './lib/indie-auth-token';

async function verifyRequest(event, context) {
  if (Object.keys(context).length == 0) {
    return true; // DEV MODE. Let em pass
  }

  return await new IndieAuthToken(event.headers.authorization).verify();
}

export async function handler(event, context, callback) {
  console.log("EVENT", event)
  console.log("CONTEXT", context)

  let authorized = await verifyRequest(event, context);

  if (!authorized) {
    return callback(null, { statusCode: 403, body: '' });
  }

  let request = new MicropubRequest(event);

  if (request.isPost()) {
    request.publish()

    callback(null, { statusCode: 201, body: '' });

  } else {
    callback(null, { statusCode: 200, body: '' });
  }
}
