const recipeSection = document.getElementById('recipe-section');
const mealSection = document.getElementById('meal-section');
const meals = document.getElementById('meals');
const recipe = document.getElementById('recipe');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');

// this function will show random meals item on content load
const defaultMenu = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            let foodCategories = data.categories;
            let randomNum = Math.floor(Math.random() * foodCategories.length);
            let category = foodCategories[randomNum].strCategory;
            showCategoryItems(category);
        });
}

function showCategoryItems(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {
            showMeals(data, meals);
            console.log(category);
        })
}

window.addEventListener('DOMContentLoaded', () => {
    defaultMenu();
});

searchBtn.addEventListener('click', () => {
    const searchBoxValue = searchBox.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBoxValue}`)
        .then(res => res.json())
        .then(data => {
            showMeals(data, searchResult);
            console.log(data)
        })
    meals.style.display = 'none'; //for cleaner view of search result

})

function showMeals(data, containerId) {
    let mealItems = data.meals;
    //If any food item not found in database this will prevent from chaos
    if (mealItems === null) {
        mealSection.innerHTML = `<h1>No item found please search another!</h1>`
    }
    else {
        //to clear previously fetched data
        while (containerId.firstChild) {
            containerId.removeChild(containerId.firstChild);
        }
        //loop through the item list and display this in UI
        mealItems.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.innerHTML = `
                <img src=${food.strMealThumb} alt="" />
                <div class="food-title">
                    <h3>${food.strMeal}</h3>
                </div>
            `;
            foodItem.classList.add('food-item');
            foodItem.addEventListener('click', () => {
                showRecipe(food.strMeal);
            })
            containerId.appendChild(foodItem);
        });
    }
    //to clear previously fetched ingredients list
    while (recipe.firstChild) {
        recipe.removeChild(recipe.firstChild);
    }
    recipeSection.style.display = 'none';
    mealSection.style.display = 'block';
}

function showRecipe(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            const item = data.meals[0];
            const recipeDiv = document.createElement('div');
            recipeDiv.innerHTML = `
            <img src=${item.strMealThumb} alt="" />
			<div class="item-recipe">
				<h1>${item.strMeal}</h1>
				<h4>Ingredients</h4>
				<ul>
					<li><i class="fas fa-check-square"></i> ${item.strMeasure1} - ${item.strIngredient1} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure2} - ${item.strIngredient2} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure3} - ${item.strIngredient3} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure4} - ${item.strIngredient4} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure5} - ${item.strIngredient5} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure6} - ${item.strIngredient6} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure7} - ${item.strIngredient7} </li>
                    <li><i class="fas fa-check-square"></i> ${item.strMeasure8} - ${item.strIngredient8} </li>
                </ul>
			</div>
        `;
            recipe.appendChild(recipeDiv);
            recipeSection.style.display = 'block';
            mealSection.style.display = 'none';
        })
}