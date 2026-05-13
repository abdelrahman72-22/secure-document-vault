import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [documents, setDocuments] = useState([]);

  const token =
    localStorage.getItem("token");

  const fetchDocuments = async () => {

    try {

      const response = await API.get(
        "/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDocuments(
        response.data.documents
      );

    } catch (error) {

      console.log(error);

    }

  };

 useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (token) {

    fetchDocuments();

  }

}, []);

  const handleUpload = async () => {

    if (!file) {

      return alert("Select file");

    }

    try {

      const formData = new FormData();

      formData.append("document", file);

      await API.post(
        "/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setMessage(
        "File uploaded successfully 🔥"
      );

      fetchDocuments();

    } catch (error) {

      console.log(error);

      setMessage(

  error.response?.data?.message ||

  "Upload failed"

);

    }

  };

  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchDocuments();

    } catch (error) {

      console.log(error);

    }

  };

  const handleVerify = async (id) => {

    try {

      const response = await API.get(
        `/documents/verify/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (
        response.data.integrity
      ) {

        alert(
          "Document Integrity Verified ✅"
        );

      } else {

        alert(
          "Document Modified ❌"
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Secure Document Vault
      </h1>
<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="bg-red-500 text-white px-5 py-2 rounded mb-8"
>
  Logout
</button>

      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] mb-8">

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Upload Document
        </button>

        <p className="mt-4">
          {message}
        </p>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          My Documents
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                File
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {documents.map((doc) => (

              <tr
                key={doc.id}
                className="border-b"
              >

                <td className="p-3">
                  {doc.filename}
                </td>

                <td className="p-3">
                  {
                    new Date(
                      doc.createdAt
                    ).toLocaleString()
                  }
                </td>

                <td className="p-3 flex gap-2">

                  <a
                    href={`http://localhost:5000/api/documents/download/${doc.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Download
                  </a>

                  <button
                    onClick={() =>
                      handleVerify(doc.id)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Verify
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(doc.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Dashboard;
