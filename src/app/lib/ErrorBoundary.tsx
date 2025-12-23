import React, { Component } from 'react';
import { analytics } from './analytics';
import { InternalErrorPage } from '@/pages/public/Errors/InternalErrorPage';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log l'erreur aux services d'analytics
    analytics.trackError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <InternalErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
