function handleSearch(query) {
  const currentPath = window.location.pathname;
  let searchPath = 'search.html';

  if (currentPath.endsWith('index.html') || currentPath === 'StreamingApp') {
    searchPath = 'src/' + searchPath;
  }

  window.location.href = `${searchPath}?q=${encodeURIComponent(query)}`;
}


