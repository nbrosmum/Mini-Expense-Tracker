# Mini Expense Tracker

A responsive web-based expense tracker application that allows users to manage their daily expenses with real-time filtering, visualization, and local storage persistence.

## Features

-  **Add, Edit, Delete Expenses** — Manage your expenses with full CRUD operations
-  **Year-based Filtering** — Filter and view expenses by year
-  **Monthly Chart Visualization** — Interactive bar chart showing monthly spending totals
-  **Form Validation** — Real-time validation with disabled submit button until form is complete
-  **Local Storage Persistence** — All data is saved in browser's localStorage
-  **Responsive Design** — Fully mobile-responsive using Bootstrap 5
-  **Clear All Data** — One-click option to clear all expenses and free up localStorage


## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** Bootstrap 5.3.2
- **Charts:** Chart.js
- **Storage:** Browser LocalStorage API

## Setup & Installation

### Prerequisites
- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
  - If you don't have Node.js installed, visit https://nodejs.org/ and download the LTS version
  - npm (Node Package Manager) comes bundled with Node.js

### Installation Options

#### Option 1: Clone from GitHub (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nbrosmum/Mini-Expense-Tracker.git
   cd Mini-Expense-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000` (or the port shown in terminal)
   - The application will load and you can start adding expenses

#### Option 2: Direct Source Code (If Provided)

If you have received the source code files directly (without cloning):

1. **Navigate to the project folder:**
   ```bash
   cd Mini-Expense-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000` (or the port shown in terminal)
   - The application will load and you can start adding expenses

### Verify Node.js Installation

Before starting, verify Node.js is installed:
```bash
node --version
npm --version
```

You should see version numbers displayed (e.g., v14.17.0)


**Storage Limits:**
- Most browsers: ~5-10MB localStorage limit
- Clear data using the "Clear All Data" button when storage is full

## Project Structure

```
Mini-Expense-Tracker/
├── public/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Custom CSS with responsive design
│   ├── assets              # the media file use in the project (image,audio,.....etc)
│   └── js/
│       └── script.js       # Main application logic
├── package.json            # Project dependencies
└── README.md              # This file
```


## Future Improvements

### Planned Features
- **Category Support** — Organize expenses by categories (Food, Transport, Entertainment, etc.)
- **Pie Chart** — Visualize spending by category with interactive pie charts
- **Budget Alerts** — Set monthly budget limits per category and receive alerts when approaching limits
- **Expense Notes** — Add detailed notes/descriptions to expenses
- **Advanced Analytics** — Monthly/yearly comparison charts
- **Search Functionality** — Search expenses by title or date range
- **Data Export** — Export data to CSV/JSON format


## Contributing

This is a personal project for online assessment. Contributions and suggestions are welcome!

## Author

**Mum Choon Jie**

## License

This project is open source and available under the MIT License.
