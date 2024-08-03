window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    };
  
    replaceText('node-version', window.versions.node());
    replaceText('chrome-version', window.versions.chrome());
    replaceText('electron-version', window.versions.electron());
  });