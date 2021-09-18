const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=827224caa2c943a71745e14fac622e1f&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
                
            </div>
            
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
                <button id ="saveMovie" onClick="saveForLAter(' ${IMGPATH + poster_path},${title}, ${vote_average}')"  >Watch Later</button> 
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

function saveForLAter(movieInfo){
    var test = movieInfo.split(',');
    console.log(test);
    var movie ={
        "moviePosterLink" : test[0],
        "movieTitle" : test[1],
        "movieAverage" : test[2]
    };
    console.log("movie", movie);
    var allMovies = localStorage.getItem("allMovies");
    if (allMovies === null) {
        allMovies = [];
    } else {
        allMovies = JSON.parse(allMovies);
    }
    allMovies.push(movie);
    allMovies = JSON.stringify(allMovies);
    localStorage.setItem("allMovies", allMovies);
    retrieveSaveForLater();

    // window.location.replace("./scoreshistory.html");
}

function retrieveSaveForLater(){

var laterWatchEL = document.querySelector("#laterWatch");
var clear = document.querySelector("#clear");

// Event listener to clear Movies
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage
var allMovies = localStorage.getItem("allMovies");
alert(allMovies[0][1]);
allMovies = JSON.parse(allMovies);
alert(allMovies);
if (allMovies !== null) {
    for (var i = 0; i < allMovies.length; i++) {
        // alert("Title"+allMovies[i]);
        var createLi = document.createElement("li");
        createLi.textContent = allMovies[i].movieTitle + " " + allMovies[i].movieAverage;
        var imgEl =document.createElement("img");
        imgEl.setAttribute("src",allMovies[i].moviePosterLink);
        createLi.append(imgEl);
        laterWatchEL.appendChild(createLi);
    }
}

}
