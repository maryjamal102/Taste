let space=document.getElementById('data')
let exampleModalLabel=document.getElementById('exampleModalLabel');
let modalBody=document.getElementById('modal')
let helpBtn=document.getElementById('helpBtn');
let searchWords=document.getElementById('searchWords');
let input1=document.getElementById('input1');
let error=document.getElementById('error');


input1.addEventListener("keyup", async function (e) {
  let searchTerm = e.target.value.trim();

  if (searchTerm.length > 2) {
    try {
      let res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchTerm}`);
      let data = await res.json();

      if (data.recipes && data.recipes.length > 0) {
        allRecipes = data.recipes;
        displayAllRecipes();
        error.classList.add("d-none");
      } else {
        space.innerHTML = "";
        error.classList.remove("d-none");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      error.classList.remove("d-none");
    }
  } else {
    if (searchTerm === "") {
      getAllRecipes("cake");
      error.classList.add("d-none");
    }
  }
});

let allRecipes=[];
async function getAllRecipes(item){
let res=await fetch(`https://forkify-api.herokuapp.com/api/search?q=${item}`);
let data=await res.json();

allRecipes=data.recipes;
displayAllRecipes();
}
getAllRecipes("cake");

function displayAllRecipes(){
     let BoxForAll='';
     for(let i=0; i<allRecipes.length; i++){
        BoxForAll+=`
          <div class="p-5 col-lg-3 col-md-6 col-sm-12 recipe-container">
      <div class="text-center cards" onclick="getSingleRecipe(${allRecipes[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal">
         <img src="${allRecipes[i].image_url}" alt="${allRecipes[i].title}" onclick="getSingleRecipe(${allRecipes[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal">
         <h3 class="mt-3">${allRecipes[i].title}</h3>
      </div>
  </div>`
     }
     space.innerHTML=BoxForAll;
}

let singleRecipe={};
async function getSingleRecipe(id){
let res=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
let data=await res.json();
console.log(data.recipe);
singleRecipe=data.recipe;
displaySingleRecipe();
}

function displaySingleRecipe(){
    document.getElementById('exampleModalLabel').innerHTML=singleRecipe.title;

    let ing='';
    for(let i=0; i<singleRecipe.ingredients.length; i++){
        ing+=`
        <li>${singleRecipe.ingredients[i]}</li>
        `
    }

    let recipeBox='';
    recipeBox=`
    <img src="${singleRecipe.image_url}" alt="" class="w-50 h-75 m-auto">
<title>${singleRecipe.title}</title>
<ul>${ing}</ul>
    `
modalBody.innerHTML=recipeBox;
helpBtn.innerHTML=`<a href="${singleRecipe.source_url}" class="text-dark" target="_blank">Help</a>`
}


