import { io } from 'socket.io-client';
import { BASE_URL } from './helper.js';

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${BASE_URL}/api/v1/users/socket`;

export const socket = io(URL);