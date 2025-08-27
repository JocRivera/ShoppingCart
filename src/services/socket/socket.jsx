import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACK_URL;
let socket;

export const initSocket = (token) => {
    socket = io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
        auth: { token },
    });
    socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
    });
    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
    });

    return socket;
};
export const getSocket = () => {
    if (!socket) {
        throw new Error('Socket not initialized. Call initSocket first.');
    }
    return socket;
};

