var APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=827224caa2c943a71745e14fac622e1f&page=1";
var IMGPATH = "https://image.tmdb.org/t/p/w1280";
var SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=827224caa2c943a71745e14fac622e1f&query=";

var main = document.getElementById("main");
var form = document.getElementById("form");
var search = document.getElementById("search");

//Function to get the movies from the api
async function getMovies(url) {
    var resp = await fetch(url);
    var respData = await resp.json();
    showMovies(respData.results);
}
//To show movies
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        var { poster_path, title, vote_average, overview } = movie;

        var movieEl = document.createElement("div");
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
                <button id ="saveMovie" class="btn btn-primary mb-2" onClick="saveForLAter(' ${IMGPATH + poster_path},${title}, ${vote_average}')">Watch Later</button> 
            </div>
        `;
        main.appendChild(movieEl);
    });
}
//Change color of ratings based on the score
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
    //fetch name of movie from the textbox
    var searchTerm = search.value;
    if (searchTerm) {
        //if there is a search term them add it to the partially created serch query 
        getMovies(SEARCHAPI + searchTerm);
        //empty the textbox
        search.value = "";
    }
});

function saveForLAter(movieInfo) {

    //local storage
    //to populate the movie object with values send from the calle,the arguments where split and stored in an array 
    var movieInformation = movieInfo.split(',');
    var movie = {
        "moviePosterLink": movieInformation[0],
        "movieTitle": movieInformation[1],
        "movieAverage": movieInformation[2]
    };
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

}
function retrieveSaveForLater() {
    var laterWatchEL = document.querySelector("#laterWatch");
    var movieListLaterEL = document.querySelector("#movieList");
    var clear = document.querySelector("#clear");

    // Event listener to clear Movies
    clear.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    });
    // Retreives local stroage
    var allMovies = localStorage.getItem("allMovies");
    allMovies = JSON.parse(allMovies);

    if (allMovies !== null) {
        movieListLaterEL.innerHTML = "";
        for (var i = 0; i < allMovies.length; i++) {

            var createLi = document.createElement("li");
            createLi.textContent = allMovies[i].movieTitle + " " + allMovies[i].movieAverage;
            createLi.style.listStyle = "none";
            movieListLaterEL.appendChild(createLi);
        }
        clear.style.display = "block";
    }
}
$(document).ready(function () {
    //on load of the page,fetch trending movies from the API
    getMovies(APIURL);
    retrieveSaveForLater()
});
