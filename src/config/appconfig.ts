const { protocol, hostname } = window.location;

const LOCALHOST = "localhost";
const LOCALHOSTIP = "127.0.0.1";
const LOCAL_PORT = "3000";

const isLocalHost = (str: string): boolean =>
  str === LOCALHOST || str === LOCALHOSTIP || str.startsWith("192.168.");

const URL_REMOTE = "https://tiktok-proxy-vercel.vercel.app";
const LOCAL_API = `${protocol}//${hostname}:${LOCAL_PORT}`;

const appConfig = {
  API: {
    URL: isLocalHost(hostname) ? LOCAL_API : URL_REMOTE,
  },
};

export { appConfig };
