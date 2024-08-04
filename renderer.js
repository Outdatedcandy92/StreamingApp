const selectFileButton = document.getElementById('select-file');
const playFileButton = document.getElementById('play-file');
let selectedFilePath;

selectFileButton.addEventListener('click', () => {
  window.electronAPI.selectFile();
});

window.electronAPI.onFileSelected((event, filePath) => {
  selectedFilePath = filePath;
  alert(`Selected file: ${filePath}`);
});

playFileButton.addEventListener('click', () => {
  if (selectedFilePath) {
    window.electronAPI.playFile(selectedFilePath);
  } else {
    alert('No file selected');
  }
});