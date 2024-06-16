import { io } from 'socket.io-client';
import { BASE_URL } from './helper';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : `${BASE_URL}/api/v1/users/socket`;

export const socket = io(URL);