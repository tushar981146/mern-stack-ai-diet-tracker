import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import {  useNavigate } from 'react-router-dom';

const DietTracker = () => {
  const [foodName, setFoodName] = useState('');

  const Navigate = useNavigate();;

    const { sendMeal } = useStore();



  const handleFoodChange = (e) => {
    setFoodName(e.target.value);
  };


  const handleAddMeal = () => {
    sendMeal({ foodName });
    setFoodName('');
    Navigate("/")
  }


 
  

  


  return (
    <div className="min-h-screen bg-green-50 flex items-start justify-center p-4 sm:p-8">
      
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-3xl font-extrabold">
            Daily Diet Logger
          </h1>
          <p className="mt-1 text-green-200">Track your intake with precision.</p>
        </div>

        {/* Form and Action Area */}
        <div className="p-6 space-y-6">
          
          

          {/* Input Fields (Responsive 2-column layout on medium screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Food Name Input */}
            <div className='w-full'>
              <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
                Food Item
              </label>
              <input
                type="text"
                id="foodName"
                value={foodName}
                onChange={handleFoodChange}
                placeholder="e.g., Grilled Chicken, Apple"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

  
            
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-2">
            
           
            
            <button
              onClick={handleAddMeal}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
            >
              Add Meal
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default DietTracker;