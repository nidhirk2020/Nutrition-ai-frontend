import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import food from '../assets/images/food1.png';

const Calories = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [calories, setCalories] = useState(null);
  const [meals, setMeals] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  
  // Sample weekly calorie data (replace with API fetched data)
  const sampleWeeklyData = {
    daily_calorie_data: [
      { date: '2024-09-28', total_calories: 700 },
      { date: '2024-09-27', total_calories: 1100 },
      { date: '2024-09-26', total_calories: 900 },
      { date: '2024-09-25', total_calories: 1200 },
      { date: '2024-09-24', total_calories: 800 },
      { date: '2024-09-23', total_calories: 1000 },
      { date: '2024-09-22', total_calories: 950 },
    ],
  };

  useEffect(() => {
    // Simulate fetching the weekly data from an API
    setWeeklyData(sampleWeeklyData.daily_calorie_data);
  }, []);

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setCalories(Math.floor(Math.random() * 500 + 100)); // Simulate calorie count
    }
  };

  const handleAddMeal = () => {
    if (selectedFile && calories) {
      setMeals([...meals, { name: selectedFile.name, calories }]);
      setSelectedFile(null);
      setCalories(null);
      setDishName('');
    } else {
      alert('Please upload a meal image first!');
    }
  };

  // Prepare data for the calorie spike graph
  const lineData = meals.map((meal, index) => ({
    name: `Meal ${index + 1}`,
    calories: meal.calories,
  }));

  // Calculate daily goal and calories left for the pie chart
  const dailyCalorieGoal = 2000; // Set your daily calorie goal
  const totalCaloriesConsumed = meals.reduce((total, meal) => total + meal.calories, 0);
  const caloriesLeft = dailyCalorieGoal - totalCaloriesConsumed;

  // Data for the pie chart
  const pieData = [
    { name: 'Calories Consumed', value: totalCaloriesConsumed },
    { name: 'Calories Left', value: caloriesLeft < 0 ? 0 : caloriesLeft }, // Prevent negative calories left
  ];

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
        <div className="w-full max-w-lg mb-8">
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

      {/* Calorie Spike Graph */}
      {meals.length > 0 && (
        <div className="w-full max-w-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Calorie Spike Graph</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weekly Calorie Bar Graph */}
      {weeklyData.length > 0 && (
        <div className="w-full max-w-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Calorie Intake</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_calories" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pie Chart for Daily Calories */}
      <div className="w-full max-w-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Calorie Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#ff6384'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Calories;






