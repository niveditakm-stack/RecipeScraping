export function classifyRecipeCategory(recipeName) {
if (!recipeName) {
return "Unknown";
}

const name = recipeName.toLowerCase();

// Starter
if (name.includes("salad")) return "Salad";
if (name.includes("soup")) return "Soup";
if (name.includes("manchurian")) return "Starter";
if (name.includes("chaat")) return "Snack";
if (name.includes("cutlet")) return "Snack";
if (name.includes("tikki")) return "Snack";
if (name.includes("pav bhaji")) return "Snack";
if (name.includes("veg frankie")) return "Snack";

// Breakfast
if (name.includes("idli")) return "Breakfast";
if (name.includes("dosa")) return "Breakfast";
if (name.includes("upma")) return "Breakfast";
if (name.includes("poha")) return "Breakfast";
if (name.includes("chole bhature")) return "Breakfast";

if (name.includes("sambar")) return "Breakfast";


// Main Course
if (name.includes("biryani")) return "Lunch";
if (name.includes("pulao")) return "Lunch";
if (name.includes("curry")) return "curry";

if (name.includes("sabzi")) return "Sabzi";

if (name.includes("malai")) return "Malaicurry";
if (name.includes("paneer")) return "Dinner";

if (name.includes("rasam")) return "Lunch";

if (name.includes("noodles")) return "Noodles";

// Bread
if (name.includes("paratha")) return "Roti";
if (name.includes("naan")) return "Roti";
if (name.includes("roti")) return "Roti";
if (name.includes("kulcha")) return "Roti";

// Dessert
if (name.includes("halwa")) return "Dessert";
if (name.includes("kheer")) return "Dessert";
if (name.includes("ice cream")) return "Dessert";

// Drink

if (name.includes("juice")) return "Drink";

if (name.includes("milkshake")) return "Drink";

return "Unknown";
}