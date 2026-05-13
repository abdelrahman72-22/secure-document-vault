import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Manager() {

  const [documents,
    setDocuments] =
      useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments =
    async () => {

      try {

        const response =
          await API.get(

            "/manager/documents",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
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

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">

        Manager Panel

      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                File
              </th>

              <th className="p-3 text-left">
                Owner
              </th>

              <th className="p-3 text-left">
                Uploaded
              </th>

            </tr>

          </thead>

          <tbody>

            {documents.map(
              (doc) => (

              <tr
                key={doc.id}
                className="border-b"
              >

                <td className="p-3">

                  {doc.filename}

                </td>

                <td className="p-3">

                  {
                    doc.owner?.email
                  }

                </td>

                <td className="p-3">

                  {

                    new Date(
                      doc.createdAt
                    ).toLocaleString()

                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Manager;
