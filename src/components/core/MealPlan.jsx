const MealPlan = ({ mealDetails }) => {
  console.log("Rendering MealPlan with:", mealDetails); // Add this to check the structure of mealDetails

  return (
      <div className="relative shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm sm:text-base">
          <thead className="uppercase bg-base-300">
          <tr>
            <th scope="col" className="sm:px-6 sm:py-3 p-2 text-start">Day</th>
            <th scope="col" className="sm:px-6 sm:py-3 p-2 text-start">Breakfast</th>
            <th scope="col" className="sm:px-6 sm:py-3 p-2 text-start">Lunch</th>
            <th scope="col" className="sm:px-6 sm:py-3 p-2 text-start">Dinner</th>
          </tr>
          </thead>
          <tbody>
          {mealDetails.map((meal, index) => {
            const [day, meals] = Object.entries(meal)[0]; // Extract 'day1', 'day2', etc., and meal details
            return (
                <tr key={index} className="bg-base-200 border-b border-b-base-300 capitalize">
                  <td className="sm:px-6 sm:py-3 p-2">{day}</td>
                  <td className="sm:px-6 sm:py-3 p-2">{meals.breakfast}</td>
                  <td className="sm:px-6 sm:py-3 p-2">{meals.lunch}</td>
                  <td className="sm:px-6 sm:py-3 p-2">{meals.dinner}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
};