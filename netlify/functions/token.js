exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const params = event.queryStringParameters || {};
  const room = params.room || 'CMAlert-Giallo';

  const ACCOUNT_SID = 'AC11b5ad7414211cdc656b15a4b586da50';
  const API_KEY = 'SKcf48744b36ff73ba100d0ad47e22c79e';
  const API_SECRET = 'dpmL4MvigDeS328vxoArUdwTFwVOH8if';
  const TWIML_APP_SID = 'AP9818773ccd15d20c069d0d8da625c62d';

  try {
    const twilio = require('twilio');
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: TWIML_APP_SID,
      incomingAllow: true
    });

    const token = new AccessToken(
      ACCOUNT_SID,
      API_KEY,
      API_SECRET,
      { identity: 'web-' + Date.now() }
    );

    token.addGrant(voiceGrant);
    token.ttl = 3600;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token: token.toJwt(),
        room: room
      })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message })
    };
  }
};      statusCode: 200,
      headers,
      body: JSON.stringify({
        token: token.toJwt(),
        room: room
      })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message })
    };
  }
};
