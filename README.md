Flatdango
Flatdango is a simple web application for Flatiron Movie Theater, allowing users to browse movies and purchase tickets interactively. The project demonstrates JavaScript, DOM manipulation, and server communication using JSON Server.

Features
View Movie Details: Displays the details of the first movie (poster, title, runtime, showtime, available tickets) on page load.
Movie Menu: Lists all available movies in a menu for easy browsing.
Buy Tickets: Users can purchase tickets, updating the available ticket count dynamically. Prevents purchases if the movie is sold out.
Bonus Features:
Click a movie in the menu to display its details.
Indicate sold-out movies with visual cues (button text and CSS class).
Persist ticket purchase data to the server using PATCH.
Delete movies from the list and server.
Technologies Used
HTML: Structure and layout.
CSS: Styling.
JavaScript: Application logic and DOM manipulation.
JSON Server: Local data storage and server communication.
Setup Instructions
Prerequisites
Node.js installed.
A basic understanding of JavaScript and APIs.
Steps
Clone this repository:

bash
Copy code
git clone https://github.com/your-username/flatdango.git
Navigate to the project directory:

bash
Copy code
cd flatdango
Install JSON Server:

bash
Copy code
npm install -g json-server
Start the JSON Server:

bash
Copy code
json-server --watch db.json
The server will run at http://localhost:3000.

Open the index.html file in your browser.

API Endpoints
Get All Movies
URL: GET /films
Response Example:
json
Copy code
[
  {
    "id": "1",
    "title": "The Giant Gila Monster",
    "runtime": "108",
    "capacity": 30,
    "showtime": "04:00PM",
    "tickets_sold": 27,
    "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
    "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
  }
]
Get Movie by ID
URL: GET /films/:id
Update Tickets Sold
URL: PATCH /films/:id
Request Body Example:
json
Copy code
{
  "tickets_sold": 28
}
Delete Movie
URL: DELETE /films/:id
Core Deliverables
Display details of the first movie on page load.
List all movies in the menu.
Update available tickets dynamically on purchase.
Bonus Deliverables
Show details of a clicked movie.
Indicate sold-out status visually.
Persist updates and deletions to the server.
File Structure
plaintext
Copy code
flatdango/
├── index.html      # Main HTML file
├── style.css       # CSS for styling
├── app.js          # JavaScript logic
├── db.json         # JSON Server data
└── README.md       # Project documentation
Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

License
This project is licensed under the MIT License.

Implementation Notes
Basic Steps for Development
Project Initialization:

Set up your project folder.
Create index.html, style.css, and app.js files.
JSON Server:

Use the provided db.json for movie data.
Start the server to enable fetching and updating movie details.
DOM Manipulation:

Fetch movie details from GET /films/1 and display them on page load.
Populate the movie menu by fetching data from GET /films.
Update the available ticket count dynamically.
Event Handling:

Add a "Buy Ticket" button to decrease available tickets.
Prevent purchases when tickets are sold out.
Change the button text to "Sold Out" for unavailable movies.
Bonus Features:

Implement movie deletion with a DELETE request.
Update the server using PATCH for ticket purchases.
Example Code Snippets
Fetching Movie Data

javascript
Copy code
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(movie => {
    displayMovieDetails(movie);
  });
Display Movie Details

javascript
Copy code
function displayMovieDetails(movie) {
  const poster = document.getElementById('poster');
  const title = document.getElementById('title');
  const runtime = document.getElementById('runtime');
  const showtime = document.getElementById('showtime');
  const availableTickets = document.getElementById('available-tickets');

  poster.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  availableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
}
Buying a Ticket

javascript
Copy code
document.getElementById('buy-ticket').addEventListener('click', () => {
  if (availableTickets > 0) {
    availableTickets--;
    document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
    if (availableTickets === 0) {
      document.getElementById('buy-ticket').textContent = 'Sold Out';
    }
  }
});
By following the provided guidelines and implementing the features step-by-step, you’ll have a fully functional Flatdango web application! Let me know if you need further assistance with specific parts.
