/**
 * WebSocket Hook for Real-time Sessions
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { sessionsService } from '../services';
import type { WSServerMessage } from '../types';

interface UseWebSocketOptions {
  sessionId: string;
  enabled?: boolean;
  onMessage?: (message: WSServerMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn {
  ws: WebSocket | null;
  isConnected: boolean;
  sendCardClick: (cardId: number) => void;
  sendAudioStream: (audioData: string) => void;
  disconnect: () => void;
}

export const useWebSocket = ({
  sessionId,
  enabled = true,
  onMessage,
  onOpen,
  onClose,
  onError,
  reconnect = true,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions): UseWebSocketReturn => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const shouldReconnectRef = useRef(true);

  const connect = useCallback(() => {
    if (!enabled || !sessionId) return;

    try {
      const socket = sessionsService.createWebSocket(sessionId, {
        onOpen: () => {
          setIsConnected(true);
          reconnectAttemptsRef.current = 0;
          onOpen?.();
        },
        onMessage: (message) => {
          onMessage?.(message);
        },
        onClose: () => {
          setIsConnected(false);
          setWs(null);
          onClose?.();

          // Attempt reconnection
          if (
            reconnect &&
            shouldReconnectRef.current &&
            reconnectAttemptsRef.current < maxReconnectAttempts
          ) {
            reconnectAttemptsRef.current++;
            console.log(
              `Reconnecting... Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`,
            );
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectInterval);
          }
        },
        onError: (error) => {
          console.error('WebSocket error:', error);
          onError?.(error);
        },
      });

      setWs(socket);
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
    }
  }, [
    sessionId,
    enabled,
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnect,
    reconnectInterval,
    maxReconnectAttempts,
  ]);

  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (ws) {
      ws.close();
      setWs(null);
      setIsConnected(false);
    }
  }, [ws]);

  const sendCardClick = useCallback(
    (cardId: number) => {
      if (ws && isConnected) {
        sessionsService.sendCardClick(ws, cardId);
      } else {
        console.warn('WebSocket not connected, cannot send card click');
      }
    },
    [ws, isConnected],
  );

  const sendAudioStream = useCallback(
    (audioData: string) => {
      if (ws && isConnected) {
        sessionsService.sendAudioStream(ws, audioData);
      } else {
        console.warn('WebSocket not connected, cannot send audio stream');
      }
    },
    [ws, isConnected],
  );

  useEffect(() => {
    if (enabled && sessionId) {
      shouldReconnectRef.current = true;
      connect();
    }

    return () => {
      disconnect();
    };
  }, [sessionId, enabled, connect, disconnect]);

  return {
    ws,
    isConnected,
    sendCardClick,
    sendAudioStream,
    disconnect,
  };
};
