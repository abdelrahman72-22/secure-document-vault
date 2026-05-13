import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Manager from "./pages/Manager";
import Profile from "./pages/Profile";
import TwoFactor from "./pages/TwoFactor";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";

import {
  useEffect
} from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import API from "./services/api";
function App() {

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

if (token) {

  localStorage.setItem(
    "token",
    token
  );

API.get(
  "/auth/profile",
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
).then((response) => {

  localStorage.setItem(

    "user",

    JSON.stringify(
      response.data.user
    )

  );

});

  localStorage.setItem(
    "is2FAVerified",
    "false"
  );

  window.history.replaceState(
    {},
    document.title,
    "/2fa"
  );

  setTimeout(() => {

  window.location.href =
    "/2fa";

}, 500);

}
  }, []);

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

	<Route
          path="/login"
          element={<Login />}
	/>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
	<Route
          path="/2fa"
          element={
            <ProtectedRoute>

             <TwoFactor />

           </ProtectedRoute>
  }
/>

	<Route
          path="/admin"
          element={
            <ProtectedRoute>

              <Admin />

           </ProtectedRoute>
  }
/>
	<Route
          path="/manager"
          element={
           <ProtectedRoute>

            <Manager />

          </ProtectedRoute>
  }
/>

	<Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

           </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;
