import React, { useState } from "react";
import axios from "axios";
import qs from "qs"; // Import qs library for encoding data in x-www-form-urlencoded format
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserInfo = () => {
  const { user } = useAuth();
  const history = useNavigate();

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async () => {
    const email = user.email;

    try {
      const response = await axios.post(
        "https://nutrition-ai.onrender.com/mongo_db/write_user_info_to_mongo",
        qs.stringify({ data: userInfo }), // Convert data to x-www-form-urlencoded format
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
        history.push("/success");
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
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">User Information</h1>
      <form>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Age:</label>
          <input
            type="number"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Gender:</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Job Type:</label>
          <select
            name="job_type"
            value={userInfo.job_type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="student">Student</option>
            <option value="working">Working</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Work Type:</label>
          <select
            name="work_type"
            value={userInfo.work_type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="office">Office</option>
            <option value="field">Field</option>
            <option value="home">Home</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Height (in feet):</label>
          <input
            type="number"
            name="height"
            value={userInfo.height}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Weight (in lbs):</label>
          <input
            type="number"
            name="weight"
            value={userInfo.weight}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Activity Level:</label>
          <select
            name="activity_level"
            value={userInfo.activity_level}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Exercise Hours (per week):
          </label>
          <input
            type="number"
            name="exercise_hours"
            value={userInfo.exercise_hours}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Work Hours (per week):
          </label>
          <input
            type="number"
            name="work_hours"
            value={userInfo.work_hours}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Cooking Hours (per week):
          </label>
          <input
            type="number"
            name="cooking_hours"
            value={userInfo.cooking_hours}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Proficiency in Cooking:
          </label>
          <select
            name="proficiency_in_cooking"
            value={userInfo.proficiency_in_cooking}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Goals:</label>
          <select
            name="goals"
            value={userInfo.goals}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="healthy">Healthy</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Dietary Restrictions:
          </label>
          <select
            name="dietary_restrictions"
            value={userInfo.dietary_restrictions}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="None">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten_free">Gluten Free</option>
            <option value="dairy_free">Dairy Free</option>
            <option value="nut_free">Nut Free</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Diet Type:</label>
          <select
            name="diet_type"
            value={userInfo.diet_type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="balanced">Balanced</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Allergies:</label>
          <select
            name="allergies"
            value={userInfo.allergies}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="None">None</option>
            <option value="peanuts">Peanuts</option>
            <option value="shellfish">Shellfish</option>
            <option value="soy">Soy</option>
            <option value="dairy">Dairy</option>
            <option value="eggs">Eggs</option>
            <option value="gluten">Gluten</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Cuisine Preference:</label>
          <select
            name="cuisine_preference"
            value={userInfo.cuisine_preference}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="american">American</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="thai">Thai</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">Grocery Frequency:</label>
          <select
            name="grocery_frequency"
            value={userInfo.grocery_frequency}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold">
            Budget (in dollars):
          </label>
          <input
            type="number"
            name="budget"
            value={userInfo.budget}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
