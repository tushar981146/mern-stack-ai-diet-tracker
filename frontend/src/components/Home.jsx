import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

function Home() {

    const Navigate = useNavigate();

    const [items, setItems] = useState([
    "Initial Task Item 1",
    "Initial Task Item 2",
    "Initial Task Item 3",
    "Initial Task Item 4",
    "Initial Task Item 5",
    "Initial Task Item 6",
    "Initial Task Item 7",
    "Initial Task Item 8",
    "Initial Task Item 9",
    "Initial Task Item 10",

  ]);

  const { totalObj, setTotalObj } = useStore();

  useEffect(() => {
    setTotalObj();
  }, [])

  const list = totalObj ? totalObj.data : [];


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-6 md:p-8">

      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">
        Task List Manager
      </h1>

      <div className="flex items-center justify-evenly p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-sm transition duration-150 ease-in-out  text-gray-700 font-medium">

        <span>Date</span>
        <span>Protein</span>
        <span>Fiber</span>
        <span>Carbs</span>
        <span>Fats</span>
        <span>Calories</span>
      </div>


      <div
        id="list-container"
        className="grow overflow-y-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 transition-all duration-300 ease-in-out h-0"
      >


        <ul className="space-y-3">
          {list.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-evenly p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-sm transition duration-150 ease-in-out border-l-4 border-indigo-400 text-gray-700 font-medium"
            >
              
              <span>{item.date}</span>
              <span>{item.totals.protein}g</span>
              <span>{item.totals.fiber}g</span>
              <span>{item.totals.carbs}g</span>
              <span>{item.totals.fats}g</span>
              <span>{item.totals.calories}kcal</span>
            </li>
          ))}
        </ul>
        <div className="h-20" aria-hidden="true"></div>
      </div>


      <button
      onClick={() => Navigate('/add')}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 
                   bg-indigo-600 hover:bg-indigo-700 
                   text-white font-bold 
                   py-4 px-6 rounded-full 
                   shadow-xl hover:shadow-2xl 
                   transition-all duration-300 ease-in-out 
                   transform hover:scale-105 
                   focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 
                   flex items-center space-x-2 z-10"
        title="Add New Task Item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Item</span>
      </button>

    </div>
  )
}

export default Home