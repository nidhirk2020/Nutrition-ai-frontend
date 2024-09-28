

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.BASE_BACKEND_URL;
const UserInfo = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const [section, setSection] = useState(1);

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activity_level: "",
    exercise_hours: 0,
    job_type: "",
    work_type: "",
    work_hours: 0,
    cooking_hours: 0,
    proficiency_in_cooking: "",
    goals: "",
    dietary_restrictions: "",
    diet_type: "",
    allergies: "",
    cuisine_preference: "",
    budget: 0,
    grocery_frequency: "",
    calorie_goal:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async () => {
    const email = user.email;

    //validation to prevent negative values
    if(userInfo.age < 0){
      alert("Age can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, age:0}))
      return;
    }
    if(userInfo.height < 0){
      alert("Height can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, height:0}))
      return;
    }
    if(userInfo.weight < 0){
      alert("Weight can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, weight:0}))
      return;
    }
    if(userInfo.exercise_hours < 0){
      alert("Exercise Hours can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, exercise_hours:0}))
      return;
    }
    if(userInfo.work_hours < 0){
      alert("Work Hours can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, work_hours:0}))
      return;
    }
    if(userInfo.cooking_hours < 0){
      alert("Cooking Hours can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, cooking_hours:0}))
      return;
    }
    if(userInfo.calorie_goal < 0){
      alert("Daily Calorie Intake can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, calorie_goal:0}))
      return;
    }
    if(userInfo.budget < 0){
      alert("Budget can not be negative");
      setUserInfo((prevInfo) => ({ ...prevInfo, budget:0}))
      return;
    }

    setLoading(true);
    try {
      const userDetails = JSON.stringify(userInfo);
      console.log("user details are",userDetails);
      const response = await axios.post(
        // `${backendUrl}/mongo/write_user_info_to_mongo`,
        "https://nutrition-ai-backend.onrender.com/mongo/write_user_info_to_mongo",
        // qs.stringify({ data: userInfo }), // Convert data to x-www-form-urlencoded format
        { data: userDetails },
        {
          headers: {
            accept: "application/json",
            "email-id": email,
            "Content-Type": "application/x-www-form-urlencoded", // Set content type
          },
        }
      );

      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        console.log("User info successfully submitted to the server!");
        toast.success("Info successfully submitted!");
        navigate("/mealgenerator")
      } else {
        const responseBody = response.data;
        console.error(
          "Failed to submit user info to the server. Status:",
          response.status,
          "Response:",
          responseBody
        );
      }
    } catch (error) {
      console.error("Error occurred while submitting user info:", error);
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto pt-8 overflow-auto">
      <div className="xl:pr-[30rem]">
        <h1 className="text-3xl font-bold mb-6 text-center  ">
          User Information
        </h1>

        <form className="max-w-lg mx-auto px-2">
          {section === 1 && (
            <>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Age</span>
                  <input
                    type="number"
                    name="age"
                    min="0"
                    value={userInfo.age}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Gender</span>
                  <select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Job Type</span>
                  <select
                    name="job_type"
                    value={userInfo.job_type}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="student">Student</option>
                    <option value="working">Working</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Work Type</span>
                  <select
                    name="work_type"
                    value={userInfo.work_type}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="office">Office</option>
                    <option value="field">Field</option>
                    <option value="home">Home</option>
                    <option value="none">None</option>
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Height (ft.)</span>
                  <input  
                    type="number"
                    name="height"
                    min="0"
                    value={userInfo.height}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Weight (lbs)</span>
                  <input
                    type="number"
                    name="weight"
                    min="0"
                    value={userInfo.weight}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
            </>
          )}

          {section === 2 && (
            <>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Activity Level</span>
                  <select
                    name="activity_level"
                    value={userInfo.activity_level}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very_active">Very Active</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">
                    Exercise Hours (weekly)
                  </span>
                  <input
                    type="number"
                    name="exercise_hours"
                    min="0"
                    value={userInfo.exercise_hours}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Work Hours (weekly)</span>
                  <input
                    type="number"
                    name="work_hours"
                    min="0"
                    value={userInfo.work_hours}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">
                    Cooking Hours (weekly)
                  </span>
                  <input
                    type="number"
                    name="cooking_hours"
                    min="0"
                    value={userInfo.cooking_hours}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Proficiency in Cooking</span>
                  <select
                    name="proficiency_in_cooking"
                    value={userInfo.proficiency_in_cooking}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Goals</span>
                  <select
                    name="goals"
                    value={userInfo.goals}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                  </select>
                </label>
              </div>
            </>
          )}

          {section === 3 && (
            <>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Dietary Restrictions</span>
                  <select
                    name="dietary_restrictions"
                    value={userInfo.dietary_restrictions}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="None">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten_free">Gluten Free</option>
                    <option value="dairy_free">Dairy Free</option>
                    <option value="nut_free">Nut Free</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Diet Type</span>
                  <select
                    name="diet_type"
                    value={userInfo.diet_type}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Allergies</span>
                  <select
                    name="allergies"
                    value={userInfo.allergies}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="None">None</option>
                    <option value="peanuts">Peanuts</option>
                    <option value="shellfish">Shellfish</option>
                    <option value="soy">Soy</option>
                    <option value="dairy">Dairy</option>
                    <option value="eggs">Eggs</option>
                    <option value="gluten">Gluten</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Cuisine Preference</span>
                  <select
                    name="cuisine_preference"
                    value={userInfo.cuisine_preference}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="american">American</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="chinese">Chinese</option>
                    <option value="indian">Indian</option>
                    <option value="thai">Thai</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Grocery Frequency</span>
                  <select
                    name="grocery_frequency"
                    value={userInfo.grocery_frequency}
                    onChange={handleChange}
                    className="grow outline-none bg-inherit"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>
              </div>

                <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">
                   Daily Calorie Intake value
                  </span>
                  <input
                    type="number"
                    name="calorie_goal"
                    min="0"
                    value={userInfo.calorie_goal}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-4">
                  <span className="font-semibold leading-[0.8]">Budget (dollars)</span>
                  <input
                    type="number"
                    name="budget"
                    min="0"
                    value={userInfo.budget}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>

              <div className="mb-4 flex gap-4">
                <IoIosArrowDropleftCircle
                  onClick={() => setSection(section - 1)}
                  className="text-6xl cursor-pointer text-[#41b2de] hover:text-[#009DE4] -mt-1"
                />

                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-info text-base text-white w-full mb-10"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>

        <div className="flex justify-center gap-3">
          {section === 2 && (
            <IoIosArrowDropleftCircle
              onClick={() => setSection(section - 1)}
              className="text-6xl cursor-pointer text-[#41b2de] hover:text-[#009DE4]"
            />
          )}

          {section < 3 && (
            <IoIosArrowDroprightCircle
              onClick={() => setSection(section + 1)}
              className="text-6xl cursor-pointer text-[#41b2de] hover:text-[#009DE4]"
            />
          )}
        </div>
      </div>
      <div className="shadow-xl fixed top-[9rem] xl:right-[3%] 2xl:right-[6%] rounded-lg p-4 xl:block hidden bg-primary-content bg-opacity-80 text-white">
        <div className="text-xl mb-2 px-1 font-semibold">Tips</div>
        <div className="flex flex-col gap-4 text-sm">
          <p>• Ensure all information provided is accurate and up-to-date.</p>
          <p>• Clearly define your health and fitness goals.</p>
          <p>
            • Mention any dietary restrictions, allergies, or specific cuisine
            preferences.
          </p>
          <p>• Periodically review and update your information.</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
