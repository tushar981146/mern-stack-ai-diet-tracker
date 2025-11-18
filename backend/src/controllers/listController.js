import { GoogleGenerativeAI } from "@google/generative-ai";
import Food from "../modules/food.js";

export const addTodayList = async (req, res) => {
    try {


        const text = req.body.foodName;


        const genAI = new GoogleGenerativeAI(process.env.gemenai_api);

        // Fixed model name
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite"
        });

        const result = await model.generateContent(
            `Provide the nutritional breakdown in JSON format with keys protien, carbs, fats, calories, fiber for a diet with: ${text}. Only return pure JSON under string "".`
        );

        const output = result.response.text();

        const foodData = new Food({
            food: JSON.parse(output.replace(/```json|```/g, "").trim())
        });


        await foodData.save();



        return res.json({ success: true, data: output });

    } catch (error) {
        console.error("Error adding today's list:", error);
        res.status(500).json({ error: error.message });
    }
};

export const fetchLists = async (req, res) => {
    try {
        const result = await Food.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    foods: { $push: "$food" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } }
        ]);

        const finalData = [];

        for (const group of result) {
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFats = 0;
            let totalCalories = 0;
            let totalFiber = 0;

            const foods = group.foods;

            for (let i = 0; i < foods.length; i++) {
                for (const [key, value] of Object.entries(foods[i])) {

                    const cleanValue = typeof value === "string" ? value : String(value ?? "0");
                    const clean = cleanValue.replace(/[^0-9\-]/g, "");
                    let number;

                    if (clean.includes("-")) {
                        const [a, b] = clean.split("-").map(Number);
                        number = (a + b) / 2;
                    } else {
                        number = Number(clean);
                    }

                    if (key === "protein") totalProtein += number;
                    if (key === "carbs") totalCarbs += number;
                    if (key === "fats") totalFats += number;
                    if (key === "calories") totalCalories += number;
                    if (key === "fiber") totalFiber += number;
                }
            }

            // Date string create
            const date = `${group._id.year}-${String(group._id.month).padStart(2, "0")}-${String(group._id.day).padStart(2, "0")}`;

            finalData.push({
                date,
                foods,
                totals: {
                    protein: totalProtein,
                    carbs: totalCarbs,
                    fats: totalFats,
                    calories: totalCalories,
                    fiber: totalFiber
                }
            });
        }

        return res.json({ success: true, data: finalData });

    } catch (error) {
        console.error("Error fetching lists:", error);
        res.status(500).json({ error: error.message });
    }
};

