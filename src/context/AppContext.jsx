import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch projects and tasks from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects (using posts as projects)
        const projectsRes = await fetch('https://dummyjson.com/posts?limit=10');
        const projectsData = await projectsRes.json();

        // Fetch tasks (using todos as tasks)
        const tasksRes = await fetch('https://dummyjson.com/todos?limit=50');
        const tasksData = await tasksRes.json();

        // Check localStorage for saved data
        const savedProjects = localStorage.getItem('projects');
        const savedTasks = localStorage.getItem('tasks');

        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          // Transform posts to projects
          const transformedProjects = projectsData.posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.body.substring(0, 100) + '...'
          }));
          setProjects(transformedProjects);
        }

        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        } else {
          // Transform todos to tasks with random project assignment and status
          const statuses = ['todo', 'in-progress', 'done'];
          const transformedTasks = tasksData.todos.map(todo => ({
            id: todo.id,
            title: todo.todo,
            description: `Task description for: ${todo.todo}`,
            projectId: Math.ceil(Math.random() * 10),
            status: todo.completed ? 'done' : statuses[Math.floor(Math.random() * 2)]
          }));
          setTasks(transformedTasks);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save to localStorage when projects or tasks change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('projects', JSON.stringify(projects));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [projects, tasks, loading]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Add a new project
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now()
    };
    setProjects(prev => [...prev, newProject]);
    return newProject.id;
  };

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Update task status (move between columns)
  const updateTaskStatus = (taskId, newStatus) => {
    const numericId = Number(taskId);
    setTasks(prev =>
      prev.map(task =>
        Number(task.id) === numericId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const numericId = Number(taskId);
    setTasks(prev => prev.filter(task => Number(task.id) !== numericId));
  };

  // Get tasks for a specific project
  const getProjectTasks = (projectId) => {
    return tasks.filter(task => task.projectId === parseInt(projectId));
  };

  // Get task count for a project
  const getProjectTaskCount = (projectId) => {
    return tasks.filter(task => task.projectId === parseInt(projectId)).length;
  };

  // Filter projects by search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value = {
    projects: filteredProjects,
    allProjects: projects,
    tasks,
    loading,
    darkMode,
    searchTerm,
    setSearchTerm,
    toggleDarkMode,
    addProject,
    addTask,
    updateTaskStatus,
    deleteTask,
    getProjectTasks,
    getProjectTaskCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
