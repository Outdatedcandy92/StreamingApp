document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('search-input');

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = inputField.value;
      window.electron.sendSearchQuery(query);
    }
  });
});