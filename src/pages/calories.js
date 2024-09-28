import React, { useState } from 'react';
import food from '../assets/images/food1.png'; // Import your image

const Calories = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [calories, setCalories] = useState(null);
  const [meals, setMeals] = useState([]); // To store the list of meals and their calories

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Simulate a calorie count for the uploaded image (replace with actual logic)
      setCalories(Math.floor(Math.random() * 500 + 100)); // Random number between 100 and 600
    }
  };

  const handleAddMeal = () => {
    if (selectedFile && calories) {
      setMeals([...meals, { name: selectedFile.name, calories }]);
    //   alert(`Added ${calories} calories from your meal!`);
      // Reset for new meal upload
      setSelectedFile(null);
      setCalories(null);
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

      {calories && (
        <div className="mb-8">
          <p className="text-xl text-gray-800">
            This meal contains approximately <strong>{calories} calories</strong>.
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



