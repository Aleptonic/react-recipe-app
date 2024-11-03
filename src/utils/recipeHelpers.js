export const searchRecipes = (recipes, searchTerm) => {
    if (!searchTerm) return recipes;
    return recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const validateRecipe = (recipe) => {
    return Boolean(
        recipe?.title &&
        recipe?.ingredients?.length > 0 &&
        recipe?.instructions?.length > 0
    );
};

export const calculateCookingTime = (recipe) => {
    if (!recipe?.prepTime || !recipe?.cookTime) return 0;
    return parseInt(recipe.prepTime) + parseInt(recipe.cookTime);
};

export const filterRecipesByDietary = (recipes, dietary) => {
    if (!dietary) return recipes;
    return recipes.filter(recipe => 
        recipe.dietary && recipe.dietary.includes(dietary)
    );
};

export const calculateServings = (ingredients, servings) => {
    if (!ingredients || servings <= 0) return [];
    return ingredients.map(ing => ({
        ...ing,
        amount: (ing.amount / 4) * servings // Assuming base recipe is for 4 servings
    }));
};