import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import food from '../assets/images/food1.png';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

const Calories = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [calories, setCalories] = useState(null);
  const [meals, setMeals] = useState([]); // Meals will be populated from API and new additions
  const [weeklyData, setWeeklyData] = useState([]); // Set weekly data initially as an empty array
  const [dishName, setDishName] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000); // Default goal
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0); // Set default to 0
  const { user } = useAuth(); // Get user from context
const email = user.email; // Get email from user
  const [loading, setLoading] = useState(false); // Loading state for the spinner

  // Function to get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
  };

  // Fetch daily calorie goal from the API
  const fetchCalorieGoal = async () => {
    try {
      const response = await fetch(`https://nutrition-ai-backend.onrender.com/mongo/read_user_info_from_mongo/${email}?email_id=${email}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const userData = JSON.parse(data.data.data);
        const dailyCalorieGoal = parseInt(userData.calorie_goal, 10);
        setDailyCalorieGoal(dailyCalorieGoal); // Set the state
      } else {
        console.error('Failed to fetch calorie goal.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch today's meals
  const fetchTodayMeals = async () => {
    const today = getCurrentDate(); // Get today's date
    try {
      const response = await fetch(`https://nutrition-ai-backend.onrender.com/calorie/get_individual_calorie_by_date/${email}/${today}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok && data.calorie_data) {
        const fetchedMeals = data.calorie_data.map(item => ({
          name: item.food_item,
          calories: item.calorie,
        }));
        setMeals(fetchedMeals); // Set the fetched meals in state
      } else {
        console.error('Failed to fetch today’s meals.');
      }
    } catch (error) {
      console.error('Error fetching today’s meals:', error);
    }
  };

  // Fetch weekly calorie data from the API
  const fetchWeeklyCalorieData = async () => {
    try {
      const response = await fetch(`https://nutrition-ai-backend.onrender.com/calorie/get_weekly_calorie/${email}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok && data.daily_calorie_data) {
        setWeeklyData(data.daily_calorie_data); // Set weekly data in the state
      } else {
        console.error('Failed to fetch weekly calorie data.');
      }
    } catch (error) {
      console.error('Error fetching weekly calorie data:', error);
    }
  };

  // Fetch calorie goal when the component mounts
  useEffect(() => {
    fetchCalorieGoal();
    fetchTodayMeals();
    fetchWeeklyCalorieData();
  }, [email]); // Re-run when the email changes

  // Update total calories consumed whenever meals change
  useEffect(() => {
    const newTotalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
    setTotalCaloriesConsumed(newTotalCalories);
  }, [meals]);

  const handleAddMeal = async () => {
    if (selectedFile && calories && dishName) {
      const params = new URLSearchParams(); // Create URLSearchParams object for form data
      params.append('calorie', calories);
      params.append('food_item', dishName);

      try {
        // Save the meal to the database using the API
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

          // Fetch the latest meals and weekly data
          fetchTodayMeals();
          fetchWeeklyCalorieData();

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

  // Handle meal image upload and calorie data extraction
  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('image_file', file);

      setLoading(true); // Start loading spinner

      try {
        const response = await axios.post('https://nutrition-ai-backend.onrender.com/ai_image/get_calorie_value', formData, {
          headers: {
            'email-id': email,
            Accept: 'application/json',
          },
        });

        const { calorie_value, name } = response.data;

        if (calorie_value && name) {
          setCalories(calorie_value);
          setDishName(name);
        } else {
          alert('Failed to fetch the calorie information. Try again!');
        }
      } catch (error) {
        console.error('Error fetching calorie information:', error);
        alert('Error fetching calorie information. Check the console for details.');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }
  };

  // Prepare data for the calorie spike graph
  const lineData = meals.map((meal, index) => ({
    name: `Meal ${index + 1}`,
    calories: meal.calories,
  }));

  // Calculate calories left for the pie chart
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
          <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelection} />
          <img src={food} alt="Food Icon" className="w-32 h-32 rounded-md mx-auto mb-4" />
          <button
              onClick={() => document.getElementById('fileInput').click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-4"
          >
            Upload Meal Image
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
            <div className="mb-8 flex justify-center">
              <div role="status">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                >
                  <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858
                100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50
                0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144
                50.5908C9.08144 73.1895 27.4013 91.5094 50
                91.5094C72.5987 91.5094 90.9186 73.1895 90.9186
                50.5908C90.9186 27.9921 72.5987 9.67226 50
                9.67226C27.4013 9.67226 9.08144 27.9921 9.08144
                50.5908Z"
                      fill="currentColor"
                  />
                  <path
                      d="M93.9676
                39.0409C96.393 38.4038 97.8624 35.9116 97.0079
                33.5539C95.2932 28.8227 92.871 24.3692 89.8167
                20.348C85.8452 15.1192 80.8826 10.7238 75.2124
                7.41289C69.5422 4.10194 63.2754 1.94025 56.7698
                1.05124C51.7666 0.367541 46.6976 0.446843 41.7345
                1.27873C39.2613 1.69328 37.813 4.19778 38.4501
                6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                10.1071C47.8511 9.54855 51.7191 9.52689 55.5402
                10.0491C60.8642 10.7766 65.9928 12.5457 70.6331
                15.2552C75.2735 17.9648 79.3347 21.5619 82.5849
                25.841C84.9175 28.9121 86.7997 32.2913 88.1811
                35.8758C89.083 38.2158 91.5421 39.6781 93.9676
                39.0409Z"
                      fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
        )}

        {/* Preview the selected image and calorie info */}
        {!loading && selectedFile && (
            <div className="mb-8 flex justify-center">
              <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Meal preview"
                  className="max-w-xs h-auto rounded-md shadow-md mb-4"
              />
            </div>
        )}

        {!loading && calories && dishName && (
            <div className="mb-8">
              <p className="text-xl text-gray-800 text-center">
                {dishName} contains approximately <strong>{calories} calories</strong>.
              </p>
            </div>
        )}

        {/* Button to add a meal */}
        {!loading && calories && dishName && (
            <button
                onClick={handleAddMeal}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-8"
            >
              Add to Daily Meal
            </button>
        )}

        {/* Group Table and Calorie Spike Graph in one row */}
        {meals.length > 0 && (
            <div className="w-full flex flex-wrap mb-8">
              <div className="w-full md:w-1/2 p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Meal Summary</h2>
                <div className="bg-white shadow-md rounded-md p-4 h-[300px] overflow-y-auto">
                  <table className="table-auto w-full text-left">
                    <thead>
                    <tr>
                      <th className="px-4 py-2 border-b font-semibold text-gray-800">Meal</th>
                      <th className="px-4 py-2 border-b font-semibold text-gray-800">Calories</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...meals].reverse().map((meal, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border-b text-gray-700">{meal.name}</td>
                          <td className="px-4 py-2 border-b text-gray-700">{meal.calories} kcal</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Calorie Spike Graph</h2>
                <div className="bg-white shadow-md rounded-md p-4 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
        )}

        {/* Group Weekly Analysis and Pie Chart in one row */}
        <div className="w-full flex flex-wrap mb-8">
          {weeklyData.length > 0 && (
              <div className="w-full md:w-1/2 p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Calorie Intake</h2>
                <div className="bg-white shadow-md rounded-md p-4 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total_calories" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
          )}
          <div className="w-full md:w-1/2 p-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Calorie Breakdown</h2>
            <div className="bg-white shadow-md rounded-md p-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
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
        </div>
      </div>
  );
};

export default Calories;
