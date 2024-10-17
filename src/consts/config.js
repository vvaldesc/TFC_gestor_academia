// import data from './environment.json'

const data = {};

const FACEANALYCER_KEY = data.VITE_FACEANALYCER_API_KEY;
const FACEANALYCER_HOST = data.VITE_FACEANALYCER_API_HOST;

export const FACEANALYCER = { FACEANALYCER_KEY: FACEANALYCER_KEY, FACEANALYCER_HOST: FACEANALYCER_HOST };

const OPENWEATHER_KEY = data.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_HOST = data.VITE_OPENWEATHER_API_KEY;

export const OPENWEATHER = { OPENWEATHER_KEY: OPENWEATHER_KEY, OPENWEATHER_HOST: OPENWEATHER_HOST };

const WEB_URL = data.VITE_HOST;
const WEB_PORT = data.VITE_PORT;

export const WEB_URL_PORT = { url: WEB_URL, port: WEB_PORT };

const TFC_API_HOST = 'https://tfc-servicio-academia.vercel.app/';
const TFC_STATS_HOST = 'https://delaypredict.onrender.com/';

export const TFC_SERVICES = { TFC_API_HOST: TFC_API_HOST, TFC_STATS_HOST: TFC_STATS_HOST };