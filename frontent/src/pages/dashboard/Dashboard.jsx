import React from "react";
import CreateEventForm from "./CreateEventForm";
import CreateSubUser from "./CreateSubUser";
import ShowSubUser from "./ShowSubUser";

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="btn font-semibold border border-2 px-3 py-2 border-x-black"
          onClick={() => {
            localStorage.removeItem("auth");
          }}
        >
          logout
        </button>
      </div>
      <CreateEventForm />
      <CreateSubUser />
      <ShowSubUser />
    </div>
  );
};

export default Dashboard;
