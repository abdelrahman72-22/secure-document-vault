import { Link } from "react-router-dom";

function Navbar() {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (

    <nav className="bg-black text-white p-4 flex gap-4">

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/2fa">
        2FA
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      {

        user?.role === "ADMIN" && (

          <Link to="/admin">
            Admin
          </Link>

        )

      }

      {

        (
          user?.role ===
            "MANAGER"

          ||

          user?.role ===
            "ADMIN"

        ) && (

          <Link to="/manager">

            Manager

          </Link>

        )

      }

      {

        token && (

          <button

            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              localStorage.removeItem(
                "is2FAVerified"
              );

              window.location.href =
                "/login";

            }}

          >

            Logout

          </button>

        )

      }

    </nav>

  );

}

export default Navbar;
