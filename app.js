let currentMovie = null; // Track the currently displayed movie

function displayMovieDetails(movie) {
    currentMovie = movie; // Store the current movie object
    const { id, poster, title, runtime, showtime, capacity, tickets_sold } = movie;
    const ticketsAvailable = capacity - tickets_sold;

    const moviePoster = document.getElementById('movie-poster');
    moviePoster.src = poster;
    moviePoster.style.display = 'block';

    document.getElementById('movie-title').textContent = title;
    document.getElementById('movie-runtime').textContent = `Runtime: ${runtime} minutes`;
    document.getElementById('movie-showtime').textContent = `Showtime: ${showtime}`;
    document.getElementById('movie-tickets').textContent = ticketsAvailable;

    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.disabled = ticketsAvailable === 0;
    buyTicketButton.textContent = ticketsAvailable === 0 ? 'Sold Out' : 'Buy Ticket';

    // Clear previous event listeners and attach a new one
    buyTicketButton.replaceWith(buyTicketButton.cloneNode(true));
    const newBuyTicketButton = document.getElementById('buy-ticket');

    if (ticketsAvailable > 0) {
        newBuyTicketButton.addEventListener('click', () => {
            // Update tickets sold and the DOM
            if (currentMovie.tickets_sold < currentMovie.capacity) {
                currentMovie.tickets_sold++;
                const updatedTicketsAvailable = currentMovie.capacity - currentMovie.tickets_sold;

                // Update the UI dynamically
                document.getElementById('movie-tickets').textContent = updatedTicketsAvailable;
                newBuyTicketButton.textContent = updatedTicketsAvailable === 0 ? 'Sold Out' : 'Buy Ticket';
                newBuyTicketButton.disabled = updatedTicketsAvailable === 0;

                // Update the corresponding film in the list
                const filmItem = document.getElementById(`film-${id}`);
                if (updatedTicketsAvailable === 0) {
                    filmItem.classList.add('sold-out');
                }
            }
        });
    }
}

function populateFilmMenu(films) {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = '';

    films.forEach(film => {
        const { id, title, capacity, tickets_sold } = film;
        const ticketsAvailable = capacity - tickets_sold;

        const li = document.createElement('li');
        li.classList.add('film-item');
        li.id = `film-${id}`;
        li.textContent = title;

        if (ticketsAvailable === 0) {
            li.classList.add('sold-out');
        }

        li.addEventListener('click', () => {
            displayMovieDetails(film); // Pass the film object directly to avoid re-fetching
        });

        filmsList.appendChild(li);
    });
}

// Fetch and populate films
fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(populateFilmMenu)
    .catch(error => console.log('Error:', error));
