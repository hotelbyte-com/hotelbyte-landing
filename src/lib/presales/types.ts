// Types for the PreSales AI chat widget.

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  streaming?: boolean;
}

export interface PresalesChatRequest {
  sessionId: string;
  visitorId: string;
  message: string;
  locale: string;
  pageContext: string;
}

export interface PresalesFeedbackRequest {
  visitorId: string;
  sessionId: string;
  email?: string;
  company?: string;
  name?: string;
  messageType: 'lead' | 'demo_request' | 'human_handoff';
  message?: string;
  context?: string;
  locale: string;
}

export interface PresalesFeedbackResponse {
  success: boolean;
  message: string;
}

// A2UI v0.9 SSE frame: the wire shape envelopes the payload under its message
// kind — {"version":"v0.9","updateDataModel":{"surfaceId","path","value"}}.
// A flat {type,path,value} shape is tolerated by the parser but not produced
// by the current backend.
export interface A2UIMessage {
  version?: string;
  createSurface?: Record<string, unknown>;
  updateComponents?: Record<string, unknown>;
  updateDataModel?: {
    surfaceId?: string;
    path?: string;
    value?: unknown;
  };
  // flat shape (legacy tolerance)
  type?: string;
  surfaceId?: string;
  catalogId?: string;
  theme?: Record<string, unknown>;
  components?: unknown[];
  path?: string;
  value?: unknown;
}

// SSE event structure
export interface SSEEvent {
  event?: string;
  data: string;
}
