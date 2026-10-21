// SSE client and A2UI v0.9 frame parser for the PreSales chat widget.
// Uses fetch() with ReadableStream (not EventSource) because we need POST.

import type { PresalesChatRequest, PresalesFeedbackRequest, PresalesFeedbackResponse, A2UIMessage } from './types';

// Default API base URL — can be overridden by VITE_API_BASE_URL env var.
// Must point at the hotel-be API host, not this site: www/apex are Vercel-served
// and have no /api route (a request there 307s to apex and 404s).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.hotelbyte.com';

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
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
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

      reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let receivedText = false;
      let completed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.trim() || line.startsWith(':')) continue; // Skip empty lines and comments

          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (!data) continue;

            let msg: A2UIMessage;
            try {
              msg = JSON.parse(data);
            } catch {
              throw new Error('Invalid presales response');
            }
            const components = msg.updateComponents?.components
              ?? (msg.type === 'updateComponents' ? msg.components : undefined);
            if (Array.isArray(components) && components.some(component =>
              typeof component === 'object' && component !== null
                && 'id' in component && component.id === 'error')) {
              throw new Error('The presales answer could not be completed');
            }

            // Tolerate both enveloped v0.9 and the existing flat shape.
            const udm = msg.updateDataModel
              ?? (msg.type === 'updateDataModel' ? msg : undefined);
            // EOF is not completion. Deploy the backend completion frame before this client.
            if (udm?.path === '/status' && udm.value === 'completed') completed = true;
            if (udm?.path === '/streamingText' && typeof udm.value === 'string') {
              receivedText ||= udm.value.trim().length > 0;
              callbacks.onToken(udm.value);
            }
          }
        }
      }

      if (buffer.trim() || !receivedText || !completed) throw new Error('Incomplete presales response');
      callbacks.onDone();
    } catch (err) {
      await reader?.cancel().catch(() => {});
      if (controller.signal.aborted) return;
      callbacks.onError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      reader?.releaseLock();
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
