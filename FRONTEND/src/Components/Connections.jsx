import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addConnections } from "../utils/connectionsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections.connections);

  useEffect(() => {
    if (connections.length === 0) fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  // Add a check to ensure 'connections' is an array before calling .map
  if (!Array.isArray(connections) || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 opacity-50">
        <div className="text-5xl mb-4">🤝</div>
        <p className="text-xl font-semibold">No connections found yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-black mb-8 text-center">Your Connections</h1>
      <div className="space-y-4">
        {connections.map((item) => {
          const { _id, firstName, lastName, photoURL, age, gender, bio } = item;
          return (
            <div
              key={_id}
              className="card card-side bg-base-100 shadow-xl border border-base-300 hover:border-primary transition-all duration-300"
            >
              <figure className="p-4">
                <img
                  src={photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                  alt="User"
                  className="w-24 h-24 rounded-xl object-cover shadow-md"
                />
              </figure>
              <div className="card-body p-4 justify-center">
                <h2 className="card-title text-xl font-bold">
                  {firstName} {lastName}
                </h2>
                <div className="flex gap-2 text-sm opacity-70">
                  <span>{age} years</span> • <span>{gender}</span>
                </div>
                <p className="text-sm italic line-clamp-1">{bio || "No bio provided"}</p>
              </div>
              <div className="flex items-center pr-4">
                <Link to={"/chat/"+_id}>
                  <button className="btn btn-sm btn-primary rounded-full px-5">
                    Message
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;