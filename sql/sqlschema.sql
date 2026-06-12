CREATE TABLE IF NOT EXISTS recipes
(
recipe_id VARCHAR(50) PRIMARY KEY,

recipe_category TEXT,

food_category TEXT,

ingredients TEXT,

preparation_time TEXT,

cooking_time TEXT,

tag TEXT,

no_of_servings TEXT,

cuisine_category TEXT,

recipe_url TEXT UNIQUE,

meal_plan VARCHAR(10),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS recipe_add_ingredients
(
id SERIAL PRIMARY KEY,


recipe_id VARCHAR(50)
REFERENCES recipes(recipe_id),

ingredient_name TEXT


);

CREATE TABLE IF NOT EXISTS recipe_rejections
(
id SERIAL PRIMARY KEY,


recipe_id VARCHAR(50),

recipe_url TEXT,

meal_plan VARCHAR(10),

rejected_ingredient TEXT,

rejection_reason TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);

CREATE INDEX IF NOT EXISTS idx_recipe_id
ON recipes(recipe_id);

CREATE INDEX IF NOT EXISTS idx_recipe_url
ON recipes(recipe_url);

CREATE INDEX IF NOT EXISTS idx_recipe_meal_plan
ON recipes(meal_plan);
