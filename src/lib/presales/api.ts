// SSE client and A2UI v0.9 frame parser for the PreSales chat widget.
// Uses fetch() with ReadableStream (not EventSource) because we need POST.

import type { PresalesChatRequest, PresalesFeedbackRequest, PresalesFeedbackResponse, A2UIMessage } from './types';

// Default API base URL — can be overridden by VITE_API_BASE_URL env var
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hotelbyte.com';

/**
 * Streams a presales chat message via SSE (Server-Sent Events).
 * Calls onToken for each text chunk received.
 * Calls onDone when the stream completes.
 * Calls onError if the stream fails.
 *
 * Returns an AbortController so the caller can cancel the stream.
 */
export function streamPresalesChat(
  req: PresalesChatRequest,
  callbacks: {
    onToken: (text: string) => void;
    onDone: () => void;
    onError: (err: Error) => void;
  }
): AbortController {
  const controller = new AbortController();

  (async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/public/presales/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify(req),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => 'Request failed');
        throw new Error(`HTTP ${resp.status}: ${errText}`);
      }

      if (!resp.body) {
        throw new Error('No response body');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.trim() || line.startsWith(':')) continue; // Skip empty lines and comments

          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (!data) continue;

            try {
              const msg: A2UIMessage = JSON.parse(data);

              // Handle updateDataModel messages with /streamingText path
              if (msg.type === 'updateDataModel' && msg.path === '/streamingText') {
                if (typeof msg.value === 'string') {
                  callbacks.onToken(msg.value);
                }
              }
            } catch {
              // Not JSON, skip
            }
          }
        }
      }

      callbacks.onDone();
    } catch (err) {
      if (controller.signal.aborted) return;
      callbacks.onError(err instanceof Error ? err : new Error(String(err)));
    }
  })();

  return controller;
}

/**
 * Submits presales feedback / lead capture.
 */
export async function submitPresalesFeedback(
  req: PresalesFeedbackRequest
): Promise<PresalesFeedbackResponse> {
  const resp = await fetch(`${API_BASE_URL}/api/public/presales/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!resp.ok) {
    throw new Error(`Feedback submission failed: ${resp.status}`);
  }

  return resp.json();
}
