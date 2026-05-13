import { Navigate }
from "react-router-dom";

function ProtectedRoute({
  children
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  const params =
    new URLSearchParams(
      window.location.search
    );

  const googleToken =
    params.get("token");

  const is2FAVerified =
    localStorage.getItem(
      "is2FAVerified"
    );

  const currentPath =
    window.location.pathname;

  if (
    !token &&
    !googleToken
  ) {

    return (
      <Navigate to="/" />
    );

  }

  if (

    is2FAVerified !==
      "true"

    &&

    currentPath !== "/2fa"

  ) {

    return (
      <Navigate to="/2fa" />
    );

  }

  return children;

}

export default
ProtectedRoute;
