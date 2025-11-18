import { create } from 'zustand';
import { axiosInstance } from '../libs/axios.js';

export const useStore = create((set) => ({
  totalObj: null,
  

  setTotalObj: async () => {
    try {
        const res = await axiosInstance.get('/today');

        
        set({ totalObj: res.data });
    } catch (error) {
        console.error('Failed to fetch total object:', error);
    }
  },

  sendMeal: async (mealData) => {
    try {
        const res = await axiosInstance.post('/today/add', mealData);
    } catch (error) {
        console.error('Failed to add meal:', error);
    }
  }
}));