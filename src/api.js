/* eslint-disable import/prefer-default-export */
import NProgress from 'nprogress';
import mockData from './mock-data';

const API_TOKEN_ENDPOINT = 'https://618uksm4h4.execute-api.eu-central-1.amazonaws.com/dev/api/token';
const API_GET_EVENTS_ENDPOINT = 'https://618uksm4h4.execute-api.eu-central-1.amazonaws.com/dev/api/get-events';
const API_GET_AUTH_URL_ENDPOINT = 'https://618uksm4h4.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url';

const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `${API_TOKEN_ENDPOINT}/${encodeCode}`,
  )
    .then((res) => res.json())
    .catch((error) => error);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

const checkToken = async (accessToken) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
    );
    return res.json();
  } catch (error) {
    return error.json();
  }
};

const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await fetch(API_GET_AUTH_URL_ENDPOINT);
      const { authUrl } = await results.json();
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const removeQuery = () => {
  let newurl = '';

  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState('', '', newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState('', '', newurl);
  }
};

const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `${API_GET_EVENTS_ENDPOINT}/${token}`;
    const result = await fetch(url);
    const data = await result.json();

    if (data) {
      const locations = extractLocations(data.events);
      localStorage.setItem('lastEvents', JSON.stringify(data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }

    NProgress.done();
    return data.events;
  }
};

export { extractLocations, getEvents, getAccessToken };
