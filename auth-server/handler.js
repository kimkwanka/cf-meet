const { google } = require('googleapis');

const calendar = google.calendar('v3');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const credentials = {
  clientID: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  calendarID: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirectURIs: ['https://kimkwanka.github.io/cf-meet/'],
  javascript_origins: ['https://kimkwanka.github.io', 'http://localhost:3000'],
};

const {
  clientSecret, clientID, redirectURIs, calendarID,
} = credentials;

/**
 *
 * The first step in the OAuth process is to generate a URL so users can log in with
 * Google and be authorized to see your calendar. After logging in, they’ll receive a code
 * as a URL parameter.
 *
 */
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in your project on your Google Console. Also, any passed
   *  scopes are the ones users will see when the consent screen is displayed to them.
   *
   */
  const oAuth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURIs[0],
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURIs[0],
  );

  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(token),
    }))
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURIs[0],
  );

  // Decode access_token extracted from the URL query
  const accessToken = decodeURIComponent(
    `${event.pathParameters.access_token}`,
  );

  oAuth2Client.setCredentials({ access_token: accessToken });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendarID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    );
  })
    .then((results) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ events: results.data.items }),
    }))
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};
