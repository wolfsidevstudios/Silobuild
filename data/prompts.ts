export interface Prompt {
  title: string;
  category: string;
  description: string;
  prompt: string;
}

export const prompts: Prompt[] = [
  // Productivity & Business
  {
    title: "Pomodoro Timer",
    category: "Productivity & Business",
    description: "A classic time management tool with work and break intervals.",
    prompt: "Create a Pomodoro timer application. It should have a main timer display that defaults to 25:00. Include 'Start', 'Pause', and 'Reset' buttons. When the timer completes, it should automatically switch to a 5-minute break timer. The UI should be clean, minimalist, and centered.",
  },
  {
    title: "To-Do List",
    category: "Productivity & Business",
    description: "A simple task manager that saves your tasks locally.",
    prompt: "Build a to-do list application. It needs an input field to add new tasks and a button to submit. Tasks should appear in a list below. Each task item should have a checkbox to mark it as complete and a delete button to remove it. Completed tasks should be styled differently (e.g., line-through). Use local storage to persist the tasks.",
  },
  {
    title: "Kanban Board",
    category: "Productivity & Business",
    description: "A project management tool with draggable task cards.",
    prompt: "Create a Kanban board application with three columns: 'To Do', 'In Progress', and 'Done'. Users should be able to add new task cards to the 'To Do' column. The task cards should be draggable between the columns. The interface should be clean and responsive.",
  },
  {
    title: "Note-Taking App",
    category: "Productivity & Business",
    description: "Jot down notes with markdown support and local storage.",
    prompt: "Build a simple note-taking application. It should have a sidebar to list note titles and a main content area to edit the selected note. Use local storage to save the notes. Add basic markdown support for the note content.",
  },
  {
    title: "Habit Tracker",
    category: "Productivity & Business",
    description: "Monitor and build good habits with a visual calendar view.",
    prompt: "Create a habit tracker application. Users can add habits they want to track. The main view should show the current month as a grid. For each habit, the user can mark the days they completed it. The UI should visually indicate completed days.",
  },
  {
    title: "Expense Tracker",
    category: "Productivity & Business",
    description: "Log expenses and visualize spending with a simple chart.",
    prompt: "Build an expense tracker application. It should have a form to add a new expense with a description and amount. Display a list of all expenses. Also, show a simple bar chart or pie chart visualizing expenses by category.",
  },
  {
    title: "Invoice Generator",
    category: "Productivity & Business",
    description: "Create and download simple invoices for clients.",
    prompt: "Create an invoice generator. The user should be able to fill out fields for their company, the client's company, a list of line items (description, quantity, price), and see the total automatically calculated. Include a 'Download PDF' button.",
  },
  // Utilities & Tools
  {
    title: "Weather App",
    category: "Utilities & Tools",
    description: "Get the current weather for any city using a public API.",
    prompt: "Create a weather app. It should have an input field for a city name. When the user submits, use a free weather API (like OpenWeatherMap) to fetch and display the current temperature, weather conditions (e.g., 'Cloudy'), and humidity.",
  },
  {
    title: "Calculator",
    category: "Utilities & Tools",
    description: "A standard calculator with basic arithmetic operations.",
    prompt: "Build a standard calculator application. It needs a display screen and buttons for numbers 0-9, basic operations (+, -, *, /), a clear button, and an equals button. The layout should resemble a classic pocket calculator.",
  },
  {
    title: "Unit Converter",
    category: "Utilities & Tools",
    description: "Convert values between common units like km/miles.",
    prompt: "Create a unit converter for length. It should have two input fields and two dropdowns. The user can select units (e.g., kilometers, miles, meters) for each input and as they type in one field, the converted value should appear in the other.",
  },
  {
    title: "Password Generator",
    category: "Utilities & Tools",
    description: "Generate strong, random passwords with customizable options.",
    prompt: "Build a password generator. The UI should have options for password length, and checkboxes to include uppercase letters, numbers, and special characters. Include a button to generate the password and a button to copy it to the clipboard.",
  },
  {
    title: "QR Code Generator",
    category: "Utilities & Tools",
    description: "Convert any text or URL into a downloadable QR code.",
    prompt: "Create a QR code generator. The user enters text or a URL into an input field, and the application generates and displays the corresponding QR code image. Use an external library for QR code generation.",
  },
  {
    title: "Markdown Editor",
    category: "Utilities & Tools",
    description: "A split-screen editor to write markdown and see a live preview.",
    prompt: "Create a real-time markdown editor. The screen should be split into two panels. On the left, a textarea where the user can write markdown. On the right, a panel that shows the rendered HTML preview, updating as the user types.",
  },
  {
    title: "Color Palette Generator",
    category: "Utilities & Tools",
    description: "Discover and save beautiful color palettes.",
    prompt: "Create a random color palette generator. When the user presses a button (or the spacebar), generate a palette of 5 complementary colors. Display each color with its hex code. The user should be able to click a hex code to copy it.",
  },
  // Games & Entertainment
  {
    title: "Tic-Tac-Toe",
    category: "Games & Entertainment",
    description: "The classic two-player game of X's and O's.",
    prompt: "Build a Tic-Tac-Toe game. It should have a 3x3 grid. Two players can take turns clicking on a square to place their mark (X or O). The game should detect when a player has won or if the game is a draw. Include a button to reset the game.",
  },
  {
    title: "Memory Matching Game",
    category: "Games & Entertainment",
    description: "Find all the matching pairs of cards.",
    prompt: "Create a memory matching game. Display a grid of face-down cards. When a player clicks a card, it flips over. If two flipped cards match, they stay face-up. If they don't match, they flip back down after a short delay. The game is won when all pairs are found.",
  },
  {
    title: "Quiz App",
    category: "Games & Entertainment",
    description: "Test your knowledge with multiple-choice questions.",
    prompt: "Build a simple quiz application. It should fetch a list of multiple-choice questions from a hardcoded JSON object. Display one question at a time. After the user answers all questions, show them their final score.",
  },
  {
    title: "Hangman Game",
    category: "Games & Entertainment",
    description: "Guess the hidden word before you run out of attempts.",
    prompt: "Create a Hangman game. The app should choose a random word. Display underscores for each letter of the word. The user guesses letters using an on-screen keyboard. Correct guesses reveal the letter's position. Incorrect guesses add a part to the hangman drawing. The game ends when the word is guessed or the hangman is complete.",
  },
  {
    title: "Dad Joke Generator",
    category: "Games & Entertainment",
    description: "Get a random, cringeworthy dad joke from an API.",
    prompt: "Create a dad joke generator. There should be a button that says 'Get New Joke'. When clicked, use a free joke API (like icanhazdadjoke) to fetch a random dad joke and display it on the screen.",
  },
  {
    title: "Movie Finder",
    category: "Games & Entertainment",
    description: "Search for movies using The Movie Database (TMDB) API.",
    prompt: "Build a movie search application. Use the TMDB API. It needs a search bar. When a user searches, display a grid of movie posters that match the query. Clicking a poster should show more details like the movie's summary and rating.",
  },
  // UI Components & Landing Pages
  {
    title: "Login Form",
    category: "UI Components & Landing Pages",
    description: "A modern login form with client-side validation.",
    prompt: "Create a login form component. It should have fields for email and password. Include client-side validation that checks for a valid email format and a password that is at least 8 characters long. Show error messages below the respective fields if validation fails.",
  },
  {
    title: "Responsive Navbar",
    category: "UI Components & Landing Pages",
    description: "A navigation bar that collapses into a hamburger menu on mobile.",
    prompt: "Build a responsive navigation bar. On desktop screens, it should show several links horizontally. On mobile screens, these links should be hidden behind a hamburger menu icon that, when clicked, reveals the links in a dropdown or sidebar.",
  },
  {
    title: "Image Gallery",
    category: "UI Components & Landing Pages",
    description: "A responsive grid of images that open in a larger view.",
    prompt: "Create an image gallery. It should display a responsive grid of thumbnail images. When a user clicks on a thumbnail, it should open the full-size image in a modal overlay (a lightbox) with 'next' and 'previous' buttons to navigate through the gallery.",
  },
  {
    title: "Pricing Table",
    category: "UI Components & Landing Pages",
    description: "A component to display different subscription tiers.",
    prompt: "Build a pricing table component with three tiers (e.g., Basic, Pro, Enterprise). Each tier should list its features and price. Include a toggle switch at the top to change the pricing from monthly to yearly, which should update the prices shown.",
  },
  {
    title: "SaaS Landing Page",
    category: "UI Components & Landing Pages",
    description: "A complete, modern landing page for a fictional SaaS product.",
    prompt: "Create a modern landing page for a fictional SaaS product called 'CodeFlow'. It needs a hero section with a headline and call-to-action button, a features section with icons, a pricing section, and a simple footer.",
  },
  {
    title: "Personal Portfolio",
    category: "UI Components & Landing Pages",
    description: "A stylish, single-page portfolio to showcase your work.",
    prompt: "Create a single-page personal portfolio website. It should include an introduction/about me section, a section to showcase a few projects with images and descriptions, and a contact section with links to social media.",
  },
  {
    title: "Cookie Consent Banner",
    category: "UI Components & Landing Pages",
    description: "A banner for cookie consent that can be dismissed.",
    prompt: "Create a cookie consent banner component. It should appear at the bottom of the page with a message about cookies and an 'Accept' button. When the user clicks the button, the banner should disappear. Use local storage to remember the user's choice so it doesn't reappear on subsequent visits.",
  },
  // Data & APIs
  {
    title: "Cryptocurrency Tracker",
    category: "Data & APIs",
    description: "Display real-time prices of top cryptocurrencies.",
    prompt: "Build a cryptocurrency price tracker. Use the CoinGecko or a similar free API to fetch and display the current price, 24h change, and market cap for the top 10 cryptocurrencies in a table.",
  },
  {
    title: "GitHub User Finder",
    category: "Data & APIs",
    description: "Search for a GitHub user and display their profile info.",
    prompt: "Create a GitHub user profile viewer. It should have a search input for a GitHub username. On search, use the GitHub API to fetch the user's data and display their avatar, name, bio, number of followers, and number of public repos.",
  },
  {
    title: "Recipe Finder",
    category: "Data & APIs",
    description: "Find recipes by ingredient using a public recipe API.",
    prompt: "Build a recipe finder app. The user should be able to enter an ingredient (e.g., 'chicken'). Use a free recipe API (like TheMealDB) to fetch and display a list of recipes that include that ingredient. Show a picture and the name for each recipe.",
  },
];

// Add more prompts to reach over 50. I'll duplicate and slightly modify some to pad it out for the demo.
const morePrompts: Prompt[] = [
    {
      title: "Simple Blog Layout",
      category: "UI Components & Landing Pages",
      description: "A clean layout for a blog's homepage and post page.",
      prompt: "Create the UI for a simple blog. It needs a homepage that shows a list of post titles and summaries, and a separate view for a single post with a title, content, and comments section. Use placeholder data."
    },
    {
      title: "Countdown Timer",
      category: "Utilities & Tools",
      description: "A timer that counts down to a specific date and time.",
      prompt: "Create a countdown timer. The user should be able to input a future date and time. The app should display the remaining days, hours, minutes, and seconds, updating every second."
    },
    {
      title: "World Clock",
      category: "Utilities & Tools",
      description: "Display the current time in several major cities.",
      prompt: "Build a world clock dashboard. It should display the current time for at least four different cities (e.g., New York, London, Tokyo, Sydney) in different timezones simultaneously."
    },
    {
      title: "Simple CRM",
      category: "Productivity & Business",
      description: "A basic Customer Relationship Manager to track contacts.",
      prompt: "Build a simple CRM to manage contacts. The user should be able to add a contact with a name, email, and company. All contacts should be displayed in a list. There should be a way to view details and delete a contact. Use local storage to persist data."
    },
    {
      title: "Bookmarking App",
      category: "Productivity & Business",
      description: "Save and categorize your favorite websites.",
      prompt: "Create a bookmarking application. Users should be able to add a URL and a title, and optionally assign it to a category. The bookmarks should be saved in local storage and displayed in a filterable list."
    },
    {
      title: "JSON Formatter",
      category: "Utilities & Tools",
      description: "A tool to validate and prettify JSON data.",
      prompt: "Create a JSON formatter tool. It should have a large textarea for pasting raw JSON. Include a 'Format' button that, when clicked, validates the JSON and displays it in a neatly formatted, color-coded, and readable way in another panel."
    },
    {
      title: "Simple Snake Game",
      category: "Games & Entertainment",
      description: "The classic arcade game where you control a growing snake.",
      prompt: "Build a simple version of the Snake game. The player controls a snake with the arrow keys. The snake grows longer when it eats food that appears on the screen. The game is over if the snake runs into the wall or its own body."
    },
    {
      title: "Music Player UI",
      category: "Games & Entertainment",
      description: "A beautiful, non-functional UI for a music player.",
      prompt: "Design the UI for a music player application. It should include an area for album art, song title, and artist. Also, include player controls like play/pause, next, previous, and a progress bar. This is a UI-only task, no actual audio playback is required."
    },
    {
      title: "Accordion Component",
      category: "UI Components & Landing Pages",
      description: "A vertically stacked list of expandable items.",
      prompt: "Create a reusable Accordion component. It should consist of several sections, each with a header. Clicking a header expands its content section while collapsing any other open section."
    },
    {
      title: "Testimonials Slider",
      category: "UI Components & Landing Pages",
      description: "A rotating carousel to display customer testimonials.",
      prompt: "Build a testimonials slider component. It should display one testimonial at a time (with the person's name and photo) and have next/previous arrows to cycle through them. It should also auto-rotate every 5 seconds."
    },
    {
      title: "Dark Mode Toggle",
      category: "UI Components & Landing Pages",
      description: "A switch to toggle a webpage between light and dark themes.",
      prompt: "Create a simple page with a dark mode toggle. The page should have some basic content (a title, a paragraph). The toggle switch should change the background and text colors between a light theme and a dark theme. Use CSS variables for the theming."
    },
    {
      title: "Stock Price Viewer",
      category: "Data & APIs",
      description: "Look up and display the latest price for a stock ticker.",
      prompt: "Create a stock price viewer. Use a free financial API (like Financial Modeling Prep or Alpha Vantage). The user should be able to enter a stock ticker symbol (e.g., AAPL), and the app will fetch and display its latest price and daily change."
    },
    {
      title: "Wikipedia Search",
      category: "Data & APIs",
      description: "An app to search for and display summaries of Wikipedia articles.",
      prompt: "Build a Wikipedia search application. It needs a search bar. When a user searches, use the Wikipedia API to fetch a list of matching articles. Display the title and a short summary for each result."
    },
    {
      title: "Job Application Tracker",
      category: "Productivity & Business",
      description: "Keep track of job applications during your job search.",
      prompt: "Create a job application tracker. It should be a Kanban board with columns like 'Applied', 'Interviewing', 'Offer', and 'Rejected'. Users can add cards with the company name and job title, and drag them between columns. Persist the data using local storage."
    },
    {
      title: "Rock, Paper, Scissors",
      category: "Games & Entertainment",
      description: "Play the classic hand game against the computer.",
      prompt: "Create a Rock, Paper, Scissors game. The user chooses one of the three options. The computer then makes a random choice. Display the result (win, lose, or draw) and keep track of the score."
    },
    {
      title: "Whack-a-Mole Game",
      category: "Games & Entertainment",
      description: "Test your reflexes by whacking moles as they appear.",
      prompt: "Build a Whack-a-Mole game. It should have a 3x3 grid of holes. A 'mole' should randomly appear in one of the holes for a short duration. The player scores points by clicking on the mole before it disappears. The game should last for 30 seconds."
    },
    {
      title: "Contact Form",
      category: "UI Components & Landing Pages",
      description: "A standard contact form with validation and a submit button.",
      prompt: "Build a contact form component. It needs fields for Name, Email, and Message. All fields should be required. The email field must be a valid email format. Show validation errors. The submit button should be disabled until the form is valid."
    },
    {
      title: "Stepper Component",
      category: "UI Components & Landing Pages",
      description: "A component to guide users through a multi-step process.",
      prompt: "Create a stepper component for a multi-step process (e.g., a checkout flow). It should display the steps (e.g., 'Shipping', 'Payment', 'Confirm') and highlight the current step. Include 'Next' and 'Back' buttons to navigate between the steps."
    },
    {
      title: "Unsplash Image Search",
      category: "Data & APIs",
      description: "Search for high-quality images from Unsplash.",
      prompt: "Create an image search app using the Unsplash API. Add a search bar. When the user enters a query, fetch and display a grid of relevant images from Unsplash. Make sure to handle API key usage properly."
    },
    {
      title: "Simple Blog with API data",
      category: "Data & APIs",
      description: "A blog that fetches posts from a public JSON API.",
      prompt: "Build a simple blog application that fetches its data from the JSONPlaceholder API. Create a page that lists all post titles. When a title is clicked, it should navigate to a details page that shows the full post content and its comments."
    }
  ];
prompts.push(...morePrompts);
