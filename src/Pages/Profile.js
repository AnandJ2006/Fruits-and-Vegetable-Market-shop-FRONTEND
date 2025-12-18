import "./../Style/Profile.css";
import {useForm} from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import LoginPrompt from "../Common/LoginPrompt";

const Profile = () => {
  const { isLoggedIn } = useOutletContext();

  const{
    register,
    handleSubmit,
  } = useForm();
  const onSubmitHandler=(fdata)=>{

    console.log(fdata);
    alert("Profile updated successfully");
  }

  if (!isLoggedIn) {
    return <LoginPrompt pageName="Profile" />;
  }

  return (
    <div className="forms">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>User id:</label>
        <input {...register("id")} type="text" />
        <label>User name:</label>
        <input {...register("name")} type="text" />
        <label>Age:</label>
        <input {...register("age")} type="Number" />
        <label>Contact:</label>
        <input {...register("capacity")} type="Number" />
        <label>Address:</label>
        <textarea {...register("description")} cols={10} rows={8} name="description" id="description"></textarea>
        
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};

export default Profile;
