import React, { useEffect, useState } from "react";
import "../styles/likedProducts.css";
import { toast, ToastContainer } from "react-toastify";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = () => {
    const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
    setLikedProducts(likedRecipes);
  };


  const handleRemoveItem = (recipeId) => {
    if (window.confirm("Are you sure you want to remove this recipe from favorites?")) {
      const updatedLikedRecipes = likedProducts.filter(
        (recipe) => recipe.id !== recipeId
      );
      localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
      setLikedProducts(updatedLikedRecipes);
      toast.success("Item removed successfully");
    }
  };

  return (
    <div className="likedRecipes">
      <h2>Favourites</h2>
      <ul>
        {likedProducts.map((product) => (
          <li key={product.id} className="list">
            <div>
              <h3>{product.title}</h3>
              <img src={product.imageUrl} alt={product.title} />
              <h4>Ingredients:</h4>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h4>Instructions:</h4>
              <ol>
                {product.instructions.split("\n").map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(product.id)}
              >
                Remove Item
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;