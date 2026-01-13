import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequests, removeRequest } from "../utils/requestsSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
    const dispatch = useDispatch();
    
    // Selecting the requests state from your slice
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, requestId, removeId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );
            // Calling your removeRequest reducer to update the UI
            dispatch(removeRequest(removeId));
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            // Setting the array into your slice
            // Ensure you pass the array part of the response
            dispatch(setRequests(response?.data?.data || response?.data));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        if(!requests)fetchRequests();
    }, []);

    // IMPORTANT: Since your initialState is null, 
    // we must check for !requests before trying to map.
    if (!requests) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center my-20 opacity-60">
                <div className="text-6xl mb-4">📩</div>
                <p className="text-xl font-bold">No pending connection requests.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <h1 className="text-3xl font-black mb-8 text-center text-primary">
                Review Requests
            </h1>
            
            <div className="grid grid-cols-1 gap-4">
                {requests.map((item) => {
                    // Safety check for the sender's data from your schema
                    const user = item?.fromUserId;
                    if (!user) return null;

                    const { firstName, lastName, bio, photoURL, age, gender } = user;

                    return (
                        <div
                            key={item._id}
                            className="card card-side bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <figure className="w-1/3 max-w-[120px] sm:max-w-[150px]">
                                <img
                                    src={photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                                    alt="User"
                                    className="h-full w-full object-cover"
                                />
                            </figure>

                            <div className="card-body p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h2 className="card-title text-xl font-bold">
                                            {firstName} {lastName}
                                        </h2>
                                        <div className="flex gap-2 text-xs font-semibold uppercase text-base-content/50">
                                            <span>{age} years</span> • <span>{gender}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="card-actions flex-nowrap gap-2">
                                        <button
                                            className="btn btn-sm btn-circle btn-outline btn-error"
                                            onClick={() => reviewRequest("rejected", user._id , item._id)}
                                            title="Reject"
                                        >
                                            ✕
                                        </button>
                                        <button
                                            className="btn btn-sm btn-circle btn-primary"
                                            onClick={() => reviewRequest("accepted", user._id ,item._id)}
                                            title="Accept"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="mt-2 text-sm text-base-content/70 italic line-clamp-2">
                                    {bio || "No bio provided."}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;