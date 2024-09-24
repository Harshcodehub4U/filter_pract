const movieForm = document.getElementById('movieForm');
const moviesByCategoryDiv = document.getElementById('moviesByCategory');
let movies = [];

movieForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const movieName = document.getElementById('movieName').value;
    const categories = getSelectedCategories();
    const actors = document.getElementById('actors').value.split(',').map(actor => actor.trim());
    const duration = document.getElementById('duration').value;

    // Create a movie object
    const movie = {
        name: movieName,
        categories: categories,
        actors: actors,
        duration: duration
    };

    // Add the movie to the array
    movies.push(movie);

    // Reset form
    movieForm.reset();

    // Display movies by category
    displayMoviesByCategory();
});

function getSelectedCategories() {
    const categoryCheckboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    const selectedCategories = [];

    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    return selectedCategories;
}

function displayMoviesByCategory() {
    // Clear the current display
    moviesByCategoryDiv.innerHTML = '';

    // Group movies by category
    const moviesByCategory = {};

    movies.forEach(movie => {
        movie.categories.forEach(category => {
            if (!moviesByCategory[category]) {
                moviesByCategory[category] = [];
            }
            moviesByCategory[category].push(movie);
        });
    });

    // Display movies by category
    for (const category in moviesByCategory) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `<strong>Category: ${category}</strong>`;

        moviesByCategory[category].forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
                <strong>Movie Name:</strong> ${movie.name}<br>
                <strong>Actors:</strong> ${movie.actors.join(', ')}<br>
                <strong>Duration:</strong> ${movie.duration} minutes
            `;
            categoryDiv.appendChild(movieDiv);
        });

        moviesByCategoryDiv.appendChild(categoryDiv);
    }
}




