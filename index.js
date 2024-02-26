document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const mealCart = document.getElementById("mealCart");
    const mealrecipie =document.getElementById("recipies");


    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                let html = "";
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                            <div class="meal-item">
                                <div>
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200px" height="150px">
                                </div>
                                <div>
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#ff" class="get-recipe" data-meal-id="${meal.idMeal}">Get Recipe</a>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    html = "<h1>No items available. Sorry!</h1>";
                }
                mealCart.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

            mealrecipie.innerHTML=""

    });

    
    searchInput.addEventListener("keypress", (event) => {
        if(event.key=='Enter'){
        const searchTerm = searchInput.value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                let html = "";
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                            <div class="meal-item">
                                <div>
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200px" height="150px">
                                </div>
                                <div>
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#ff" class="get-recipe" data-meal-id="${meal.idMeal}">Get Recipe</a>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    html = "<h1>No items available. Sorry!</h1>";
                }
                mealCart.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
  } 

       
  mealrecipie.innerHTML=""
});

    // Event delegation for dynamically added elements
    mealCart.addEventListener('click', (event) => {
        if (event.target.classList.contains('get-recipe')) {
            event.preventDefault();
            const mealId = event.target.dataset.mealId;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    let html=""
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];
                        // Display recipe details
                        html += `<div id="recipe">
                            <h1>${meal.strMeal}</h1>
                            <h2>Ingredients</h2>
                            <ul>`;
                // Loop through ingredients
                for (let i = 1; i <= 20; i++) { // Assuming maximum 20 ingredients
                    const ingredient = meal['strIngredient' + i];
                    const measure = meal['strMeasure' + i];
                    if (ingredient && ingredient.trim() !== '') {
                        html += `<li>${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}</li>`;
                    }
                }
                html += `   </ul>
                            <h2>Recipe</h2>
                            <p>${meal.strInstructions}</p>
                        </div>`;
            } else {
                html = "<p>Recipe not found!</p>";
            }
            mealrecipie.innerHTML = html;
        
            mealrecipie.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .catch(error => {
                    console.error('Error fetching recipe:', error);
                    alert('Error fetching recipe!');
                });
        }   
    });
});  


