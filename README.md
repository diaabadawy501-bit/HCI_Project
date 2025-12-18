# TaskFlow - Task Management Dashboard (Mini Trello)

A modern, responsive Task Management Dashboard built with React, inspired by Trello and Asana.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **Dashboard**: View all projects as cards with task counts
- **Project Tasks**: Kanban-style board with three columns (To Do, In Progress, Done)
- **Add Task**: Create new tasks with project and status selection
- **Add Project**: Create new projects with title and description
- **Move Tasks**: Move tasks between columns with button clicks
- **Delete Tasks**: Remove tasks from projects
- **Search**: Filter projects by title or description
- **Dark Mode**: Toggle between light and dark themes
- **LocalStorage**: Data persists across browser sessions

## 🛠️ Technologies

- **React 18** - UI Library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS Variables
- **DummyJSON API** - Initial data source

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/          # Navigation bar with dark mode toggle
│   ├── ProjectCard/     # Project display card
│   └── TaskCard/        # Task display card with actions
├── context/
│   └── AppContext.jsx   # Global state management
├── pages/
│   ├── Dashboard/       # Projects list page
│   ├── ProjectTasks/    # Task columns page
│   ├── AddTask/         # Add task form
│   └── AddProject/      # Add project form
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "HCI project"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **View Projects**: The dashboard displays all projects as cards
2. **Search Projects**: Use the search bar to filter projects
3. **View Tasks**: Click "View Tasks" on a project card to see its tasks
4. **Move Tasks**: Use the arrow buttons on task cards to move between columns
5. **Delete Tasks**: Click the trash icon to remove a task
6. **Add Task**: Navigate to Add Task page and fill the form
7. **Add Project**: Navigate to Add Project page and fill the form
8. **Toggle Dark Mode**: Click the moon/sun icon in the navbar

## 👥 Team Roles

| Role | Responsibility |
|------|----------------|
| **Member 1** | Routing & Layout (Navbar, page structure) |
| **Member 2** | UI Components (ProjectCard, TaskCard, Columns) |
| **Member 3** | API & State Logic (fetching, organizing tasks) |
| **Member 4** | Forms (Add Task, Add Project) |

## 🌐 API

This project uses the [DummyJSON API](https://dummyjson.com/) for initial data:
- **Projects**: `https://dummyjson.com/posts?limit=10`
- **Tasks**: `https://dummyjson.com/todos?limit=50`

All modifications (add, update, delete) are handled locally in React state.

## 📝 License

This project is for educational purposes - HCI Course Final Project.
