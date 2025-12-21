import React from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { I18nProvider } from "./I18nProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ErrorBoundary } from "../lib/ErrorBoundary";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <I18nProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </I18nProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
