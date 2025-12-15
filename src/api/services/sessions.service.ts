/**
 * Sessions Service with WebSocket Support
 */

import { axiosInstance, apiClient } from '../client';
import { API_CONFIG } from '../config';
import type {
  Session,
  SessionCreate,
  SessionLog,
  ListSessionsParams,
  WSClientMessage,
  WSServerMessage,
} from '../types';

export const sessionsService = {
  /**
   * List all sessions
   */
  async list(params?: ListSessionsParams): Promise<Session[]> {
    const response = await axiosInstance.get<Session[]>('/api/sessions', { params });
    return response.data;
  },

  /**
   * Get session by ID
   */
  async getById(id: string): Promise<Session> {
    const response = await axiosInstance.get<Session>(`/api/sessions/${id}`);
    return response.data;
  },

  /**
   * Create a new session
   */
  async create(data?: SessionCreate): Promise<Session> {
    const response = await axiosInstance.post<Session>('/api/sessions', data || {});
    return response.data;
  },

  /**
   * End session
   */
  async end(id: string): Promise<void> {
    await axiosInstance.delete(`/api/sessions/${id}`);
  },

  /**
   * Get session conversation logs
   */
  async getLogs(id: string): Promise<SessionLog[]> {
    const response = await axiosInstance.get<SessionLog[]>(`/api/sessions/${id}/logs`);
    return response.data;
  },

  /**
   * Create WebSocket connection for real-time session
   */
  createWebSocket(
    sessionId: string,
    callbacks: {
      onMessage?: (message: WSServerMessage) => void;
      onOpen?: () => void;
      onClose?: () => void;
      onError?: (error: Event) => void;
    },
  ): WebSocket {
    const token = apiClient.getAccessToken();
    const wsUrl = `${API_CONFIG.WS_URL}/ws/${sessionId}`;

    // Create WebSocket with token in query parameter (since headers not supported in browser WebSocket)
    const ws = new WebSocket(`${wsUrl}?token=${token}`);

    ws.onopen = () => {
      console.log(`WebSocket connected to session ${sessionId}`);
      callbacks.onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const message: WSServerMessage = JSON.parse(event.data);
        callbacks.onMessage?.(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log(`WebSocket disconnected from session ${sessionId}`);
      callbacks.onClose?.();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      callbacks.onError?.(error);
    };

    return ws;
  },

  /**
   * Send card click via WebSocket
   */
  sendCardClick(ws: WebSocket, cardId: number): void {
    const message: WSClientMessage = {
      type: 'card_click',
      card_id: cardId,
    };
    ws.send(JSON.stringify(message));
  },

  /**
   * Send audio stream via WebSocket
   */
  sendAudioStream(ws: WebSocket, audioData: string): void {
    const message: WSClientMessage = {
      type: 'audio_stream',
      data: audioData,
    };
    ws.send(JSON.stringify(message));
  },
};
