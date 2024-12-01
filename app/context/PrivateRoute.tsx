// components/PrivateRoute.tsx
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps extends RouteProps {
  // Giriş yapmamış kullanıcılar yönlendirilecek sayfa
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/login",
  ...rest
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          rest.children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
