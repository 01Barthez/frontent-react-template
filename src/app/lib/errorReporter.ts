import { analytics } from './analytics';

export type ErrorReportInfo = {
  componentStack?: string;
  context?: Record<string, unknown>;
};

/**
 * Centralized error reporting helper.
 * - Calls `analytics.trackError` (project analytics adapter)
 * - Optionally attempts to forward to Sentry if `SENTRY_DSN` is configured (dynamic import)
 */
export async function reportError(error: Error, info?: ErrorReportInfo) {
  try {
    analytics.trackError(error, { ...info, errorBoundary: true });
  } catch (e) {
    // analytics adapter failed — swallow to avoid further crashes
    // eslint-disable-next-line no-console
    console.warn('analytics.trackError failed', e);
  }

  // Try to forward to Sentry if available at runtime (opt-in via env and install)
  try {
    if (typeof process !== 'undefined' && (process.env.SENTRY_DSN || (window as any).__SENTRY_DSN__)) {
      // dynamic import; if Sentry not installed this will fail silently
      const Sentry = await import('@sentry/browser');
      if (Sentry?.captureException) {
        Sentry.captureException(error, { extra: info });
      }
    }
  } catch (e) {
    // ignore failures — this package is optional and should not crash the app
  }
}
