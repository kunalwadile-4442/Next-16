'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@/hooks/useReduxHook';
import { ws_response } from './ws_response';
import { setLoader } from '../Redux/ReduxSlices/uiSlice';

let singletonSocket: Socket | null = null;
let isSocketInitialized = false;

type WebSocketContextType = {
  socket: Socket | null;
  sendMessage: (event: string, data?: Record<string, any>) => void;
  isConnected: boolean;
  lastEvent?: { event: string; data: any } | null;
};

export const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  sendMessage: () => {},
  isConnected: false,
  lastEvent: null,
});

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useAppSelector(state => state?.auth?.accessToken);
  const guestAccessToken = process.env.NEXT_PUBLIC_GUEST_ACCESS_TOKEN;

  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<{
    event: string;
    data: any;
  } | null>(null);

  let messageQueue: Array<{ event: string; data: any }> = [];

  const sendMessage = useCallback(
    (event: string, data?: any) => {
      if (!singletonSocket || !singletonSocket.connected) {
        messageQueue.push({ event, data });
        return;
      }
      dispatch(setLoader(true));
      console.log('SEND::', event, data);
      singletonSocket.emit(event, data);
    },
    [dispatch],
  );

  const initializeSocket = useCallback(() => {
    if (isSocketInitialized) return;

    const tokenToUse = accessToken || guestAccessToken;
    if (!tokenToUse) {
      console.warn('No token available for WebSocket connection');
      return;
    }

    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!url) {
      console.warn('NEXT_PUBLIC_API_BASE_URL is not set');
      return;
    }

    singletonSocket = io(url, {
      auth: { token: tokenToUse },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true,
    });

    // Attach listeners
    singletonSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket.IO connected (singleton)');
    });

    singletonSocket.on('disconnect', reason => {
      setIsConnected(false);
      console.log('Socket.IO disconnected', reason);
    });

    singletonSocket.on('connect_error', err => {
      console.error('Socket.IO connection error:', err);
    });

    singletonSocket.onAny((event, data) => {
      // if (data?.request?.demo?.showloader) {
      dispatch(setLoader(false));
      // }
      setLastEvent({ event, data });
      console.log('RECEIVE IO::', event, data);
      dispatch(
        ws_response({ evt: { event, data } }, router, (d: any) =>
          sendMessage(event, d),
        ) as any,
      );
    });

    isSocketInitialized = true;
  }, [accessToken, guestAccessToken, dispatch, router, sendMessage]);

  // Initialize once when provider mounts
  // Re-initialize socket whenever accessToken changes
  React.useEffect(() => {
    if (!accessToken && !guestAccessToken) return;

    // Disconnect previous socket if exists
    if (singletonSocket) {
      singletonSocket.disconnect();
      singletonSocket = null;
      isSocketInitialized = false;
    }

    initializeSocket();
  }, [accessToken, guestAccessToken, initializeSocket]);
  return (
    <WebSocketContext.Provider
      value={{
        socket: singletonSocket,
        sendMessage,
        isConnected,
        lastEvent,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
