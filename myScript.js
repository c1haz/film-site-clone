document.addEventListener("DOMContentLoaded", function () {
   
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0f17bafeb7d9fda0c1560d29b6259066')
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const sliderContent = document.getElementById('sliderContent');

            movies.forEach(movie => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide', 'movie-slide');

                slide.innerHTML = `
                    <a href="/${movie.title.replace(/\s+/g, '-').toLowerCase()}" title="${movie.title}" class="poster">
                        <div class="poster-image">
                            <picture>
                                <source type="image/webp" data-srcset="https://image.tmdb.org/t/p/w500${movie.poster_path}" srcset="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                                <source type="image/jpeg" data-srcset="https://image.tmdb.org/t/p/w500${movie.poster_path}" srcset="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                                <img class="poster-img" alt="${movie.title}" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                            </picture>
                            <div class="poster-top">
                                <span class="poster-lng">
                                    <i class="tr-flag"></i>
                                </span>
                                <span class="poster-imdb">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa">
                                        <path fill="#ffc107" d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                                    </svg>
                                    ${movie.vote_average}
                                </span>
                            </div>
                            <div class="poster-title">
                                <div class="poster-year">${movie.release_date.substring(0, 4)}</div> <!-- Year only -->
                                <h2 class="title">${movie.title}</h2>
                            </div>
                        </div>
                    </a>
                `;

                sliderContent.appendChild(slide);
            });

            const swiper = new Swiper(".swiper-container", {
                slidesPerView: 'auto', 
                centeredSlides: false, 
                grabCursor: true, 
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    // When window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    // When window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    },
                    // When window width is >= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 0
                    },
                    // When window width is >= 1024px
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 0 
                    }
                }
            });
        });
});

//movie grids

document.addEventListener("DOMContentLoaded", function () {
    const movieGrid = document.querySelector(".movie-grid");
    const apiKey = "0f17bafeb7d9fda0c1560d29b6259066";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR&page=1`;
  
    // Fetch movies from the TMDB API
    async function fetchMovies() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderMovies(data.results); // Use 'results' array from TMDB response
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  
    // Render movies in the grid
    function renderMovies(movies) {
      movieGrid.innerHTML = ""; // Clear existing content
  
      // Limit to the first 20 movies for a 4x5 grid
      movies.slice(0, 20).forEach((movie) => {
        // Construct the poster path
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
        // Create poster element
        const moviePoster = document.createElement("div");
        moviePoster.classList.add("col-12", "col-md-2", "movie-poster");
  
        // Create the movie link
        const movieLink = document.createElement("a");
        movieLink.setAttribute(
          "href",
          `https://www.themoviedb.org/movie/${movie.id}`
        );
        movieLink.setAttribute("title", movie.title);
  
        // Create the movie image
        const movieImage = document.createElement("img");
        movieImage.setAttribute("src", posterPath);
        movieImage.setAttribute("alt", movie.title);
        movieImage.classList.add("lazyloaded");
  
        
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
  
        //movie title
        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;
  
        // movie year
        const movieDate = document.createElement("div");
        movieDate.classList.add("movie-date");
        movieDate.textContent = movie.release_date
          ? new Date(movie.release_date).getFullYear() // Only display year
          : "Tarih Yok";
  
        //  movie score
        const movieScore = document.createElement("div");
        movieScore.classList.add("movie-score");
        movieScore.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
  
        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieDate);
        movieInfo.appendChild(movieScore);
  
        
        movieLink.appendChild(movieImage);
        movieLink.appendChild(movieInfo);
  
        moviePoster.appendChild(movieLink);
  
        movieGrid.appendChild(moviePoster);
      });
    }
  
    fetchMovies();
});

//hide visibility in footer 

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-footer-content"); 
    const hiddenContent = document.querySelector(".hidden-content"); 

    if (toggleButton && hiddenContent) {
        toggleButton.addEventListener("click", function () {
            // Check if hidden content exists
            if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {
                hiddenContent.style.display = "block"; 
                toggleButton.style.display = "none"; 
            }
        });
    } else {
        console.error("not found!");
    }
});

 

    

