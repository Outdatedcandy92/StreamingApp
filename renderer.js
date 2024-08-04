document.getElementById('select-file').addEventListener('click', async () => {
    const filePath = await window.electron.selectFile();
    if (filePath) {
      await window.electron.playVideo(filePath);
    }
  });