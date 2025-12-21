import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.meta?.requiresAuth ? (
                    <ProtectedRoute requiredRoles={route.meta.roles}>
                      <route.component />
                    </ProtectedRoute>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};
