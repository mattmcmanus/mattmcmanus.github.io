import MicropubRequest from './lib/micropub-request';

export async function handler(event, context, callback) {
  let request = new MicropubRequest(event);
  try {
    let tokenResponse = await request.verifyToken();
  } catch (e) {
    console.error(e);
  }

  console.log("EVENT", event)
  console.log("CONTEXT", context)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!"})
  })
}
