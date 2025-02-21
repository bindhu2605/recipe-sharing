import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  };


  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
      toast.success("Recipe deleted successfully");
    }
  };

  const handleAddToFavorites = (recipeId) => {
    const recipeToAdd = recipes.find((recipe) => recipe.id === recipeId);
    if (recipeToAdd) {
      const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
      const isAlreadyLiked = likedRecipes.some((recipe) => recipe.id === recipeId);

      if (isAlreadyLiked) {
        toast.warn("Recipe already exists in your favorites");
      } else {
        likedRecipes.push(recipeToAdd);
        localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
        toast.success("Recipe added to favorites successfully");
      }
    }
  };

  const SearchRecipes = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const filteredRecipes = storedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    setRecipes(filteredRecipes);
  };

  return (
    <div className="Recipes">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes"
          onChange={SearchRecipes}
        />
      </div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="Recipe">
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.split("\n").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <button
              className="delete-button"
              onClick={() => handleDeleteRecipe(recipe.id)}
            >
              Delete
            </button>
            <button
              className="add-to-favorites-button"
              onClick={() => handleAddToFavorites(recipe.id)}
            >
              Add to Favorites
            </button>
            <Link to="/addRecipe">Add more recipes</Link>
          </div>
        ))
      ) : (
        <h2 className="no-recipes">No Recipes Found</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default Recipes;