// function getUsers(callback) {
//     setTimeout(() => {
//         callback([
//             { name: 'John Doe', age: 30 },
//             { name: 'Jane Smith', age: 25 },
//             { name: 'Alice Johnson', age: 28 },
//             { name: 'Bob Brown', age: 35 }
//         ])
//     }, 5000);
// }

// function getUsersByName(name, users, callback) {
//     setTimeout(() => {
//         const filteredUsers = users.find((user) => { return user.name === name });
//         callback(filteredUsers);
//     }, 2000);
// }

// function getAge(user, callback) {
//     setTimeout(() => {
//         callback(user.age);
//     }, 1000);
// }

// getUsers((users) => {
//     getUsersByName('Alice Johnson', users, (user) => {
//         getAge(user, (age) => {
//             console.log(`The age of ${user.name} is ${age}`);
//         });
//     });
// });

// function getUsers() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve([
//                 { name: 'saif sais', age: 20 },
//                 { name: 'Jane Smith', age: 25 },
//                 { name: 'Alice Johnson', age: 28 },
//                 { name: 'Bob Brown', age: 35 }
//             ]);
//         }, 3000);
//     });
// }

// function getUserByName(users, name) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const user = users.find((user) => user.name === name);
//             if (user) {
//                 resolve(user);
//             } else {
//                 reject(new Error('User not found'));
//             }
//         }, 2000);
//     });
// }

// function getAge(user) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(user.age);
//         }, 1000);
//     });
// }

// getUsers()
//     .then(users => getUserByName(users, 'saif sais'))
//     .then(getAge)
//     .then(age => {
//         console.log(`The age of saif sais is ${age}`);
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     });
//------------------------------------------------------------
console.log("Lecture 1 - Asynchronous JavaScript");

let searchInput = document.getElementById("search-input");
let btn = document.getElementById("search-button");
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
        <div class="row g-0" style ="background-color: rgb(128, 163, 166);">
          <div class="col-md-4 bg-light">
            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}" style="width: 150px;">
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

fetchdata();
