const recipeSection = document.getElementById('recipe-section');
const mealSection = document.getElementById('meal-section');
const meals = document.getElementById('meals');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        let foodCategories = data.categories;
        let randomNum = Math.floor(Math.random() * foodCategories.length);
        let category = foodCategories[randomNum].strCategory;
        showCategoryItems(category);
    });

searchBtn.addEventListener('click', () => {
    const searchBoxValue = searchBox.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBoxValue}`)
        .then(res => res.json())
        .then(data => showMeals(data))
})

function showCategoryItems(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => showMeals(data))
}


function showMeals(data) {
    let mealItems = data.meals;
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
        meals.appendChild(foodItem);
    });
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
            recipeSection.appendChild(recipeDiv);
            recipeSection.style.display = 'block';
            mealSection.style.display = 'none';
        })
}