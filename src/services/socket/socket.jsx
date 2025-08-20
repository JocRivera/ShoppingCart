import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://r6q0x0dq-3000.use2.devtunnels.ms';
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

