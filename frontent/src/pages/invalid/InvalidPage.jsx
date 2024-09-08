import React from "react";
import { useNavigate } from "react-router-dom";

const InvalidPage = () => {
  const navigate = useNavigate(); // To navigate back to the homepage

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl mb-8">Oops! Invalid Link</h2>
        {/* <button
          onClick={() => navigate("/")} // Go back to the homepage
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Go Back Home
        </button> */}
      </div>
    </div>
  );
};

export default InvalidPage;
