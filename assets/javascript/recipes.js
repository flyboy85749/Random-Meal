// first, we'll assign the button to display the info from the API in the get-meal div
const get_meal_btn = document.getElementById("get_meal");
const search_meal_btn = document.getElementById("search_meal");

// then, the meal_container const will display the related items
const meal_container = document.getElementById("meal");

// Let's see what the API pulls in.
// if we paste this url in our browser, we'll get information for one recipe; an apple franzipan tart.
// https://www.themealdb.com/api/json/v1/1/random.php
// if you refresh the page, you'll get another item.
// that's great. Now, let's connect it to our button.
get_meal_btn.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

// that's great. Now we need to pass that meal into our code
const createMeal = (meal) => {
  // create an empty array to store ingredients
  const ingredients = [];
  const directions = ((meal.strInstructions).split('.'));

  console.log(directions);

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }
  const newInnerHTML = `
		<div class="row-one">
			
            <div class="columns seven">
            
                <h4 class="meal-type">${meal.strMeal}</h4>
               
                
                <p>${directions}</p>
              
            
            </div>
            <div class="row-two">
            <div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${
          meal.strCategory
            ? `<ul><li><strong>Category:</strong> ${meal.strCategory}</li>`
            : ""
        }
				${meal.strArea ? `<li><strong>Area:</strong> ${meal.strArea}</li>` : ""}
				${
          meal.strTags
            ? `<li><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</li>`
            : ""
        }
                <h5>Ingredients:</h5>
                <ul>
				
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ""
    }
	`;
  meal_container.innerHTML = newInnerHTML;
};

search_meal_btn.addEventListener("click", () => {
  const name = document.querySelector("#search").value;
  
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((res) => {
      findMeal(res.meals[1]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

const findMeal = (meal) => {
  // create an empty array to store ingredients
  const ingredients = [];

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;

    }
  }
  const newInnerHTML = `
            <div class="row-one">
                
                <div class="columns seven">
                
                    <h4 class="meal-type">${meal.strMeal}</h4>
                   
                    
                    <p>${meal.strInstructions}</p>
                   
                
                </div>
                <div class="row-two">
                <div class="columns five">
                    <img src="${meal.strMealThumb}" alt="Meal Image">
                    ${
                      meal.strCategory
                        ? `<ul><li><strong>Category:</strong> ${meal.strCategory}</li>`
                        : ""
                    }
                    ${
                      meal.strArea
                        ? `<li><strong>Area:</strong> ${meal.strArea}</li>`
                        : ""
                    }
                    ${
                      meal.strTags
                        ? `<li><strong>Tags:</strong> ${meal.strTags
                            .split(",")
                            .join(", ")}</li>`
                        : ""
                    }
                    <h5>Ingredients:</h5>
                    
                    
                        ${ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}
                    </ul>
                </div>
            </div>
            ${
              meal.strYoutube
                ? `
            <div class="row">
                <h5>Video Recipe</h5>
                <div class="videoWrapper">
                    <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}">
                    </iframe>
                </div>
            </div>`
                : ""
            }
        `;

  meal_container.innerHTML = newInnerHTML;
};