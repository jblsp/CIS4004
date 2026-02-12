let filterForm;
let newArticleForm;
let next_id = 11;

window.onload = () => {
  filterForm = document.getElementById("filterContent");
  newArticleForm = document.getElementById("newContent");
  filterArticles();
};

function showFilter() {
  filterForm.style.display = "block";
  newArticleForm.style.display = "none";
}

function showAddNew() {
  filterForm.style.display = "none";
  newArticleForm.style.display = "flex";
}

function filterArticles() {
  let showOpinion = document.getElementById("opinionCheckbox").checked;
  let showRecipe = document.getElementById("recipeCheckbox").checked;
  let showUpdate = document.getElementById("updateCheckbox").checked;
  let articles = document.getElementById("articleList").children;
  for (let article of articles) {
    article.style.display = "block";
    if (!showOpinion && article.className === "opinion") {
      article.style.display = "none";
    }
    if (!showRecipe && article.className == "recipe") {
      article.style.display = "none";
    }
    if (!showUpdate && article.className == "update") {
      article.style.display = "none";
    }
  }
}

function addNewArticle() {
  let title = document.getElementById("inputHeader").value;
  let isOpinion = document.getElementById("opinionRadio").checked;
  let isRecipe = document.getElementById("recipeRadio").checked;
  let isUpdate = document.getElementById("lifeRadio").checked;
  let content = document.getElementById("inputArticle").value;

  console.log(isOpinion)

  let article = document.createElement("article");
  let markerText;
  if (isOpinion) {
    article.className = "opinion";
    markerText = "Opinion"
  }
  if (isRecipe) {
    article.className = "recipe";
    markerText = "Recipe";
  }
  if (isUpdate) {
    article.className = "update";
    markerText = "Update";
  }
  article.style.display = "block";
  article.id = "a" + next_id;
  next_id++;

  let marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = markerText; 
  article.appendChild(marker);

  let header = document.createElement("h2");
  header.textContent = title;
  article.appendChild(header);

  let p = document.createElement("p");
  p.textContent = content;
  article.appendChild(p);

  let p2 = document.createElement("p");
  let a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  p2.appendChild(a);
  article.appendChild(p2);

  document.getElementById("articleList").appendChild(article);

  filterArticles();
}
