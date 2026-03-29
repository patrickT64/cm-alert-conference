exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const params = event.queryStringParameters || {};
  const room = params.room || 'CMAlert-Giallo';

  const twilio = require('twilio');
  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const token = new AccessToken(
    'AC11b5ad7414211cdc656b15a4b586da50',
    'SKcf48744b36ff73ba100d0ad47e22c79e',
    'dpmL4MvigDeS328vxoArUdwTFwVOH8if',
    { identity: 'web-' + Date.now(), ttl: 3600 }
  );

  const grant = new VoiceGrant({
    outgoingApplicationSid: 'AP9818773ccd15d20c069d0d8da625c62d',
    incomingAllow: true
  });

  token.addGrant(grant);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ token: token.toJwt(), room: room })
  };
};
