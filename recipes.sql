CREATE TABLE IF NOT EXISTS recipe(
   recipeID INTEGER PRIMARY KEY 
   , userID INTEGER
   , categories TEXT
   , name TEXT
   , source TEXT
   , author TEXT
   , serves INTEGER
   , cookTimeHours INTEGER
   , cookTimeMinutes INTEGER
   , prepTimeHours INTEGER
   , prepTimeMinutes INTEGER
   , dateProp TEXT
   , nutrNotes TEXT
);

CREATE TABLE IF NOT EXISTS food(
   foodID INTEGER PRIMARY KEY
   , userID INTEGER
   , categories TEXT
   , name TEXT
   , nutrNotes TEXT
);

CREATE TABLE IF NOT EXISTS ingredient(
   ingredientID INTEGER PRIMARY KEY
   , substituteIngrID INTEGER
   , userID INTEGER
   , foodID INTEGER
   , recipeID INTEGER
   , categories TEXT
   , quantity INTEGER
   , weight REAL
   , weightUnit TEXT
   , volume REAL
   , volumeUnit TEXT
   , price REAL
);

CREATE TABLE IF NOT EXISTS ingrInstr(
   ingrInstrID INTEGER PRIMARY KEY
   , ingredientID INTEGER
   , instructionID INTEGER
);

CREATE TABLE IF NOT EXISTS instruction(
   instructionID INTEGER PRIMARY KEY
   , recipeID INTEGER
   , userID INTEGER
   , text TEXT
   , categories TEXT
   , stepNum INTEGER
   , isOptional INTEGER
   , notes TEXT
   , startTimeHrs INTEGER
   , startTimeMin INTEGER
);

CREATE TABLE IF NOT EXISTS favoriteRecipes(
   favRecID INTEGER
   , userID INTEGER
   , recipeID INTEGER
);

CREATE TABLE IF NOT EXISTS user(
   userID INTEGER PRIMARY KEY
   , firstName TEXT
   , lastName TEXT
   , password TEXT
   , email TEXT
);  

CREATE TABLE IF NOT EXISTS shoppingList(
   shoppingListID INTEGER PRIMARY KEY
   , userID INTEGER
   , date TEXT
   , cost REAL
); 
