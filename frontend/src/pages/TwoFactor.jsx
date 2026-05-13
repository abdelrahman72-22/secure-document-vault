import { useEffect, useState } from "react";
import { useNavigate }
from "react-router-dom";

import API from "../services/api";

function TwoFactor() {
const navigate =
  useNavigate();

  const [qrCode, setQrCode] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [message, setMessage] =
    useState("");

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    generateQR();

  }, []);


  const generateQR = async () => {

    try {

      const response =
        await API.get(
          "/2fa/generate",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setQrCode(
        response.data.qrCode
      );

    } catch (error) {

      console.log(error);

    }

  };

  const verifyOTP = async () => {

    try {

      const response =
        await API.post(
          "/2fa/verify",

          {
            token: otp
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setMessage(
        response.data.message
      );

localStorage.setItem(
  "is2FAVerified",
  "true"
);

      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      setMessage(
        "Invalid OTP"
      );

    }

  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Two Factor Authentication
        </h1>

        {qrCode && (

          <img
            src={qrCode}
            alt="QR Code"
            className="w-64 mx-auto mb-6"
          />

        )}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={verifyOTP}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Verify OTP
        </button>

        <p className="mt-4 text-center">
          {message}
        </p>

      </div>

    </div>

  );

}

export default TwoFactor;
