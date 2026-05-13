import { useEffect, useState }
from "react";

import API from "../services/api";

function Profile() {

  const [user, setUser] =
    useState(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get(
          "/auth/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(
        response.data.user
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Profile
        </h1>

        {

          user && (

            <div className="space-y-4">

              <p>

                <strong>Name:</strong>

                {" "}

                {user.name}

              </p>

              <p>

                <strong>Email:</strong>

                {" "}

                {user.email}

              </p>

              <p>

                <strong>Role:</strong>

                {" "}

                {user.role}

              </p>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default Profile;
