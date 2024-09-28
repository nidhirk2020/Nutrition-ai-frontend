import React, { useState } from 'react';
import axios from 'axios';
import food from '../assets/images/food1.png';
import {useAuth} from "../context/AuthContext"; // Import your image

const Calories = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [calories, setCalories] = useState(null);
  const [dishName, setDishName] = useState(''); // Store the name of the dish
  const [meals, setMeals] = useState([]); // To s// tore the list of meals and their calories
  const { user } = useAuth(); // Define email variable
  const email = user.email; // Get the email from the user object

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create FormData for API request
      const formData = new FormData();
      formData.append('image_file', file);

      try {
        // Call the Nutrition AI API to get the dish name and calorie count
        const response = await axios.post('https://nutrition-ai-backend.onrender.com/ai_image/get_calorie_value', formData, {
          headers: {
            'email-id': email,
            Accept: 'application/json',
          },
        });

        console.log('API Response:', response.data); // Log the response
        const { calorie_value, name } = response.data; // Destructure the response

        // Check if calorie_value and name are available
        if (calorie_value && name) {
          setCalories(calorie_value);
          setDishName(name);
        } else {
          alert('Failed to fetch the calorie information. Try again!');
        }
      } catch (error) {
        console.error('Error fetching calorie information:', error.response ? error.response.data : error.message);
        alert('Error fetching calorie information. Check the console for details.');
      }
    }
  };

  const handleAddMeal = async () => {
    if (selectedFile && calories && dishName) {
      // Store the meal in local state
      setMeals([...meals, { name: dishName, calories }]);

      const params = new URLSearchParams(); // Create URLSearchParams object for form data
      params.append('calorie', calories);
      params.append('food_item', dishName);

      try {
        // Save the meal to the database using the second API
        const response = await axios.post('https://nutrition-ai-backend.onrender.com/calorie/write_calorie_to_mongo', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'email-id': email,
            Accept: 'application/json',
          },
        });

        const result = response.data;
        if (response.status === 200 || result.success) {
          alert(`Meal added: ${dishName} with ${calories} calories.`);
        } else {
          alert('Failed to add meal to the database.');
        }
      } catch (error) {
        // Log detailed error response
        console.error('Error adding meal to the database:', error.response ? error.response.data : error.message);

      }

      // Reset for new meal upload
      setSelectedFile(null);
      setCalories(null);
      setDishName('');
    } else {
      alert('Please upload a meal image first!');
    }
  };

  return (
      <div className="w-full flex flex-col items-center p-5 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Count Your Daily Calories</h1>

        {/* Upload section */}
        <div className="mb-8">
          <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelection}
          />

          {/* Inserted food image above the button */}
          <img src={food} alt="Food Icon" className="w-32 h-32 rounded-md mx-auto mb-4" />
          <button
              onClick={() => document.getElementById('fileInput').click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-4"
          >
            Upload Meal Image
          </button>
        </div>

        {/* Preview the selected image and calorie info */}
        {selectedFile && (
            <div className="mb-8">
              <p className="text-gray-700 mb-2">Selected file: {selectedFile.name}</p>
              <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Meal preview"
                  className="max-w-xs h-auto rounded-md shadow-md mb-4"
              />
            </div>
        )}

        {calories && dishName && (
            <div className="mb-8">
              <p className="text-xl text-gray-800">
                {dishName} contains approximately <strong>{calories} calories</strong>.
              </p>
            </div>
        )}

        {/* Add Meal Button */}
        <button
            onClick={handleAddMeal}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-8"
        >
          Add to Daily Meal
        </button>

        {/* Table to show daily meals */}
        {meals.length > 0 && (
            <div className="w-full max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Meal Summary</h2>
              <table className="table-auto w-full text-left bg-white shadow-md rounded-md">
                <thead>
                <tr>
                  <th className="px-4 py-2 border-b font-semibold text-gray-800">Meal</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-800">Calories</th>
                </tr>
                </thead>
                <tbody>
                {meals.map((meal, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b text-gray-700">{meal.name}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{meal.calories} kcal</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default Calories;
