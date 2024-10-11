import React from "react";

const LoggedOut = () => {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Successfully Logged Out
        </h1>
        <p className="text-slate-700 mb-8">
          You have been successfully logged out of your account. We hope to see you again soon!
        </p>

          <a className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Log In Again
          </a>
      </div>
    </div>
  );
};

export default LoggedOut;
