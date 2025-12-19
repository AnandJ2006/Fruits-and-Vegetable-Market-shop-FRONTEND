import "./../Style/Profile.css";
import {useForm} from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPrompt from "../Common/LoginPrompt";

const Profile = () => {
  const { isLoggedIn } = useOutletContext();
  const [userProfile, setUserProfile] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const{
    register,
    handleSubmit,
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const savedProfile = JSON.parse(localStorage.getItem(`profile_${userData.email}`) || "{}");
      setUserProfile({...userData, ...savedProfile});
      
      // Set form values
      setValue("name", savedProfile.name || "");
      setValue("age", savedProfile.age || "");
      setValue("contact", savedProfile.contact || "");
      setValue("address", savedProfile.address || "");
    }
  }, [isLoggedIn, setValue]);

  const onSubmitHandler=(fdata)=>{
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const profileData = {
      name: fdata.name,
      age: fdata.age,
      contact: fdata.contact,
      address: fdata.address
    };
    
    localStorage.setItem(`profile_${userData.email}`, JSON.stringify(profileData));
    setUserProfile({...userData, ...profileData});
    setShowForm(false);
    reset();
    alert("Profile updated successfully");
  }

  if (!isLoggedIn) {
    return <LoginPrompt pageName="Profile" />;
  }

  return (
    <div className="forms">
      <h1>User Profile</h1>
      
      {userProfile && (
        <div className="profile-info">
          <h3>Current Profile Information</h3>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Name:</strong> {userProfile.name || 'Not set'}</p>
          <p><strong>Age:</strong> {userProfile.age || 'Not set'}</p>
          <p><strong>Contact:</strong> {userProfile.contact || 'Not set'}</p>
          <p><strong>Address:</strong> {userProfile.address || 'Not set'}</p>
        </div>
      )}
      
      {showForm && (
        <>
          <h3>Update Profile</h3>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label>User name:</label>
            <input {...register("name", { required: true })} type="text" placeholder="Enter your name" required />
            <label>Age:</label>
            <input {...register("age", { required: true })} type="number" placeholder="Enter your age" required />
            <label>Contact:</label>
            <input {...register("contact", { required: true })} type="tel" placeholder="Enter your contact number" required />
            <label>Address:</label>
            <textarea {...register("address", { required: true })} cols={10} rows={8} placeholder="Enter your address" required></textarea>
            
            <button type="submit">Update Profile</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
