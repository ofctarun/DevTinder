import { useState } from 'react'
import UserCard from "./UserCard"
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditForm = ({ user }) => {
    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base-200">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    const { firstName, lastName, email, photoURL, bio, age, gender, skills } = user;

    const [formData, setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        photoURL: photoURL || '',
        bio: bio || '',
        age: age || '',
        gender: gender || '',
        skills: skills || []
    })

    const [errorMessage, setErrorMessage] = useState("");
    const [newSkill, setNewSkill] = useState('')
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }))
            setNewSkill('')
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }))
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                age: Number(formData.age),
            };
            console.log("payload", payload);
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                payload,
                { withCredentials: true }
            );
            dispatch(addUser(res.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            },3000);
            console.log("Profile updated: ", res.data);
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong";
            console.log("Profile editing api error: " + errorMessage);
            setErrorMessage(errorMessage)
            if (err.response?.data?.errors) {
                console.log("Validation Details:", err.response.data.errors);
            }
        }
    }

    const handleCancel = () => {
        setErrorMessage("");
        setFormData({
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            photoURL: photoURL || '',
            bio: bio || '',
            age: age || '',
            gender: gender || '',
            skills: skills || []
        })
        console.log('Cancelled')
    }

    return (
        <div className="min-h-screen bg-base-200 py-2 sm:py-6 px-1 sm:px-2">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
                    {/* LEFT — Edit Form */}
                    <div className="xl:col-span-3 card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body p-4 sm:p-6 lg:p-8">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="card-title text-2xl sm:text-3xl">Edit Profile</h2>
                                    <p className="text-base-content/60 mt-1 text-sm sm:text-base">Update your personal information</p>
                                </div>
                                <div className="avatar">
                                    <div className="w-16 sm:w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={formData.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} alt="Profile" />
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            {/* Form */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">First Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Last Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Email Address</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your.email@example.com"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Photo URL */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Profile Photo URL</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="photoURL"
                                            placeholder="https://example.com/photo.jpg"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary"
                                            value={formData.photoURL}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* Age & Gender */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Age</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="25"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            min="18"
                                            max="100"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Gender</span>
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="select select-bordered"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="form-control">
                                    <label className="label pt-1">
                                        <span className="label-text font-semibold">Bio</span>
                                    </label>
                                    <textarea
                                        name="bio"
                                        className="textarea textarea-bordered w-full h-20 resize-none text-sm focus:textarea-primary"
                                        placeholder="Tell us about yourself..."
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>


                                {/* Skills */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Skills</span>
                                    </label>

                                    {/* Add Skill Input */}
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Add a skill"
                                            className="input input-bordered input-sm sm:input-md focus:input-primary flex-1"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleAddSkill()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm sm:btn-md"
                                            onClick={handleAddSkill}
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {/* Skills List */}
                                    {formData.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 p-3 sm:p-2 bg-base-200 rounded-lg">
                                            {formData.skills.map((skill, index) => (
                                                <div key={index} className="badge badge-md sm:badge-lg badge-primary gap-2">
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(skill)}
                                                        className="hover:text-error"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {formData.skills.length === 0 && (
                                        <div className="text-center text-base-content/60 text-xs sm:text-sm py-2 sm:py-2 bg-base-200 rounded-lg">
                                            No skills added yet
                                        </div>
                                    )}
                                    <p className='text-red-500 text-center mt-2'>{errorMessage}</p>
                                </div>

                                <div className="divider my-2"></div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 sm:gap-3 justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-sm sm:btn-md"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm sm:btn-md"
                                        onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Live Preview (Hidden on mobile, sticky on desktop) */}
                    <div className="xl:col-span-2 hidden xl:block">
                        <div className="h-full flex flex-col">
                            <UserCard user={formData} />
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Message sent successfully.</span>
                </div>
            </div>}
        </div>
    )
}


export default EditForm