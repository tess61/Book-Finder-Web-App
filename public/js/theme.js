/**
 * Theme Switcher
 * Handles light/dark theme toggling with localStorage persistence
 */

// Get saved theme from localStorage or default to 'dark'
const getTheme = () => localStorage.getItem('theme') || 'dark';

// Save theme to localStorage
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

// Initialize theme on page load
const initTheme = () => {
  const currentTheme = getTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);
};

// Toggle between light and dark themes
const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

// Initialize theme immediately to prevent flash
initTheme();

// Add event listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
