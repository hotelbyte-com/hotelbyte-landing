import { Component, type ReactNode } from 'react';

// Pages and story bodies are separate chunks, so a navigation can fail when the
// network drops or when a new deploy replaced the hashed files an open tab still
// references. Reloading the current URL fixes both (the prerendered HTML for it
// always exists), so reload once, then show the fallback instead of looping.

const RELOAD_AT_KEY = 'hb-chunk-reload-at';
const RELOAD_COOLDOWN_MS = 30_000;

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  // Chrome / Firefox / Safari wording for a failed dynamic import().
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i.test(message);
}

function reloadOnce(): void {
  try {
    if (Date.now() - Number(sessionStorage.getItem(RELOAD_AT_KEY)) < RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(RELOAD_AT_KEY, String(Date.now()));
  } catch {
    // Storage blocked: reload anyway; the cooldown only guards against loops.
  }
  window.location.reload();
}

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  resetKey: string; // a navigation clears a previous failure
}

export default class ChunkErrorBoundary extends Component<Props, { error: unknown; failed: boolean }> {
  state = { error: null as unknown, failed: false };

  static getDerivedStateFromError(error: unknown) {
    return { error, failed: true };
  }

  componentDidCatch(error: unknown) {
    if (isChunkLoadError(error)) reloadOnce();
  }

  componentDidUpdate(previous: Props) {
    if (this.state.failed && previous.resetKey !== this.props.resetKey) this.setState({ error: null, failed: false });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    if (!isChunkLoadError(this.state.error)) throw this.state.error; // not ours: let it surface
    return this.props.fallback;
  }
}
