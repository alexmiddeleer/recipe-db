INSERT INTO recipe(recipeID, userID, categories, title, source)
   values
     (1, 1,'fish,dinner','Nice Cod', 'alexmiddeleer.com')
   , (2, 1,'beef,dinner','Good Steak', 'google.com')
;

INSERT INTO food(foodID, userID, categories, name)
   values
     (1, 1,'fish','cod')
   , (2, 1,'beef, red meat','top round')
   , (3, 1,'spices','salt')
   , (4, 1,'herbs, produce','basil')
;

INSERT INTO ingredient(ingredientID, userID, foodID, recipeID, weight, weightUnit)
   values
     (1, 1, 1, '1', 'pound')
   , (2, 1, 2, '2', 'pound')
;

INSERT INTO ingrInstr(ingrInstrID, ingredientID, instructionID)
   values
     (1, 1, 1)
   , (2, 2, 4)
;

INSERT INTO instruction(instructionID, userID, recipeID, text, stepNum)
   values
     (1, 1, 1, "cut up fish", 1)
     (2, 1, 1, "add salt", 2)
   , (3, 1, 1, "cook in pan", 3)
   , (4, 1, 2, "trim beef", 1)
   , (5, 1, 2, "add salt or tenderizer", 2)
   , (6, 1, 2, "grill to perfection", 3)
;


