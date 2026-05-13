import {
  useEffect,
  useState
} from "react";

import { useNavigate }
from "react-router-dom";

import API from "../services/api";

function Admin() {

  const [users, setUsers] =
    useState([]);

  const token =
    localStorage.getItem("token");

const navigate =
  useNavigate();

  useEffect(() => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (
    user?.role !== "ADMIN"
  ) {

    navigate("/dashboard");

    return;

  }

  fetchUsers();

}, []);

  const fetchUsers = async () => {

    try {

      const response =
        await API.get(
          "/admin/users",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUsers(
        response.data.users
      );

    } catch (error) {

      console.log(error);

    }

  };

  const changeRole = async (
    id,
    role
  ) => {

    try {

      await API.put(

        `/admin/users/${id}/role`,

        { role },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-left p-3">
                Role
              </th>

              <th className="text-left p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.role}
                </td>

                <td className="p-3">

                  <select

                    className="border p-2 rounded"

                    onChange={(e) =>
                      changeRole(
                        user.id,
                        e.target.value
                      )
                    }

                    defaultValue={
                      user.role
                    }

                  >

                    <option value="USER">
                      USER
                    </option>

                    <option value="MANAGER">
                      MANAGER
                    </option>

                    <option value="ADMIN">
                      ADMIN
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Admin;
