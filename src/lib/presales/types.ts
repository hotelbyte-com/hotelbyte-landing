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

// A2UI v0.9 message types (subset relevant to presales)
export interface A2UIMessage {
  type: string;
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
