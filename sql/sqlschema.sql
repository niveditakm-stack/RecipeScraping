CREATE TABLE IF NOT EXISTS lfv_eliminate_no_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS lfv_eliminate_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE,
    allergy_type        TEXT
);

CREATE TABLE IF NOT EXISTS lfv_add_no_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS lfv_add_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE,
    allergy_type        TEXT
);

CREATE TABLE IF NOT EXISTS lchf_eliminate_no_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS lchf_eliminate_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE,
    allergy_type        TEXT
);

CREATE TABLE IF NOT EXISTS lchf_add_no_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS lchf_add_allergy (
    recipe_id           INTEGER PRIMARY KEY,
    recipe_name         TEXT NOT NULL,
    recipe_category     TEXT,
    food_category       TEXT,
    ingredients         TEXT,
    preparation_time    TEXT,
    cooking_time        TEXT,
    tag                 TEXT,
    no_of_servings      TEXT,
    cuisine_category    TEXT,
    recipe_description  TEXT,
    preparation_method  TEXT,
    nutrient_values     TEXT,
    recipe_url          TEXT UNIQUE,
    allergy_type        TEXT


