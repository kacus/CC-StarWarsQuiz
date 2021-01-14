import 'regenerator-runtime/runtime'; //async/await with Parcel
import { App } from './app/App';

const SW_API_BASE_URL = process.env.SW_API_BASE_URL || 'https://swapi.dev/api'; //'http://localhost:3000'
const QUIZ_MAX_TIME = process.env.QUIZ_MAX_TIME_SECONDS
  ? process.env.QUIZ_MAX_TIME_SECONDS
  : 120;

window.onload = () =>
  App({
    options: { swApiBaseUrl: SW_API_BASE_URL, quizMaxTime: QUIZ_MAX_TIME },
  });
