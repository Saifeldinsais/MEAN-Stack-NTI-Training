// function calc(a,b,o) { 
//     if (o == '+') {
//         console.log(a + b);       
//     }else if (o == '-') {
//         console.log(a - b);
//     } else if (o == '*') {
//         console.log(a * b);
//     } else if (o == '/') {
//         console.log(a / b);
//     }
//  }

// calc(10, 20, '+');
// calc(10, 5, '-');
// calc(10, 20, '*');
// calc(10, 5, '/');



// function countLastWord(str){
//     let count = 0;
//     for (let i = str.length - 1; i >= 0; i--) {
//         if (str[i] == ' ') {
//             console.log(count);
//         }
//         count++
//     }
// }

// countLastWord("hello saif");

// function isSotred(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] > arr[i + 1]) {
//             return false;
//         }
//     }
//     return true;
// }


// numberList = [1,3, 2, 4, 5, 6, 7, 8, 9, 10];
// console.log(isSotred(numberList));


// function removeDup(arr){
//     for(i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] == arr[j]) {
//                 arr.splice(j, 1);
//                 j--;
//             }
//         }
//     }
//     return arr;
// }

// numberList = [1,1,2];
// console.log(removeDup(numberList));


// var longestCommonPrefix = function(strs) {
//     if (strs.length === 0) return "";
//     let prefix = strs[0];
    
//     for (let i = 1; i < strs.length; i++) {
//         while (strs[i].indexOf(prefix) !== 0) {
//             prefix = prefix.substring(0, prefix.length - 1);
//             if (prefix === "") return "";
//         }
//     }
    
//     return prefix;
// };
// wordsList = ["saif", "sameh", "sara"];
// console.log(longestCommonPrefix(wordsList));


// document.getElementById('search-button').addEventListener('click', searchForMeals);

// async function fetchData() {
//     try {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
//         const data = await response.json();
//         meals = data.meals;
//         console.log(meals);

            
//     } catch (error) {
//         results.innerHTML = 'Error fetching data.';
//         console.error(error);
//     }
// }

// function searchForMeals() {
//     console.log('Search button clicked');
//     const word = document.getElementById('search-input').value;
//     const results = document.getElementById('results-p');
//     word = word.trim().toLowerCase();
//     if (word == '') {
//         results.innerHTML = 'Please enter a word to search.';
//         return;
//     }
// };

// fetchData();

console.log("Lecture 1 - Asynchronous JavaScript");

let searchInput = document.getElementById("search-input");
let btn = document.getElementById("Search-button");
let list = document.getElementById('results-p');
 let meals = [];

async function  fetchdata() {
    try{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await response.json();
        console.log(data);
        meals = data.meals;
    } catch(error){
        console.log(error);
    }
    
}
function searchforitems() {
  const values = searchInput.value.trim().toLowerCase();
  list.innerHTML = '';

  const matchedmeals = meals.filter(meal => {
    for (let i = 1; i <= 25; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient && ingredient.toLowerCase().includes(values)) {
        return true;
      }
    }
    return false;
  });

  if (matchedmeals.length === 0) {
    list.innerHTML = '<li class="list-group-item text-danger">No meals found with that ingredient.</li>';
  } else {
    matchedmeals.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4 bg-light">
            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
          </div>
          <div class="col-md-8  bg-light">
            <div class="card-body bg-light">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.substring(0,200)}...</p>
              <a href="${meal.strSource}"class="btn btn-outline-primary btn-sm">View details</a>
            </div>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  }
}


  btn.addEventListener("click", searchforitems);


clear_btn.onclick = function(){
  list.innerHTML = '';
  searchInput.value = '';
}

fetchdata();
