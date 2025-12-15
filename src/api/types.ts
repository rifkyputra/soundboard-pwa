/**
 * API Type Definitions
 * Generated from OpenAPI Specification v1.0.0
 */

// ===== Authentication Types =====

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

// ===== Category Types =====

export interface Category {
  category_id: number;
  parent_id: number | null;
  user_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryCreate {
  parent_id?: number | null;
  name: string;
  description?: string;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  parent_id?: number | null;
}

// ===== Card Types =====

export interface Card {
  card_id: number;
  category_id: number | null;
  user_id: number;
  text_to_speak: string;
  s3_audio_url: string;
  duration_ms: number;
  created_at: string;
  updated_at: string;
}

export interface CardCreate {
  category_id?: number | null;
  text_to_speak: string;
}

export interface CardUpdate {
  category_id?: number | null;
  text_to_speak?: string;
}

// ===== Situation Types =====

export interface Situation {
  situation_id: number;
  user_id: number;
  name: string;
  description: string;
  card_ids_ordered: number[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SituationCreate {
  name: string;
  description?: string;
  card_ids_ordered: number[];
  tags?: string[];
}

export interface SituationUpdate {
  name?: string;
  description?: string;
  card_ids_ordered?: number[];
  tags?: string[];
}

// ===== Pronunciation Types =====

export interface Pronunciation {
  dict_id: number;
  user_id: number;
  input_word: string;
  ssml_output: string;
  created_at: string;
}

export interface PronunciationCreate {
  input_word: string;
  ssml_output: string;
}

// ===== Session Types =====

export type SessionStatus = 'active' | 'ended';
export type ActorType = 'survivor' | 'interlocutor';

export interface Session {
  session_id: string;
  survivor_user_id: number;
  interlocutor_name: string;
  start_time: string;
  end_time: string | null;
  status: SessionStatus;
}

export interface SessionCreate {
  interlocutor_name?: string;
}

export interface SessionLog {
  log_id: number;
  session_id: string;
  actor_type: ActorType;
  text_content: string;
  card_id: number | null;
  timestamp: string;
}

// ===== WebSocket Message Types =====

export interface WSCardClickMessage {
  type: 'card_click';
  card_id: number;
}

export interface WSAudioStreamMessage {
  type: 'audio_stream';
  data: string; // base64 encoded audio
}

export interface WSAudioUrlMessage {
  type: 'audio_url';
  url: string;
  text: string;
}

export interface WSTranscriptionMessage {
  type: 'transcription';
  text: string;
}

export type WSClientMessage = WSCardClickMessage | WSAudioStreamMessage;
export type WSServerMessage = WSAudioUrlMessage | WSTranscriptionMessage;

// ===== Error Types =====

export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
}

// ===== Query Parameters =====

export interface ListCategoriesParams {
  parent_id?: number;
}

export interface ListCardsParams {
  category_id?: number;
  search?: string;
}

export interface ListSituationsParams {
  tag?: string;
}

export interface ListSessionsParams {
  status?: SessionStatus;
}
