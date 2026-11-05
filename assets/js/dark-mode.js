(function () {
  'use strict';

  var storageKey = 'exd-theme';
  var root = document.documentElement;

  function isDark() {
    return root.classList.contains('dark-mode');
  }

  function updateButton() {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }

    var icon = button.querySelector('i');
    var label = button.querySelector('span');
    var dark = isDark();

    button.setAttribute('aria-pressed', dark ? 'true' : 'false');
    icon.className = dark ? 'fa fa-sun-o' : 'fa fa-moon-o';
    label.textContent = 'Dark mode';
  }

  try {
    if (window.localStorage.getItem(storageKey) === 'dark') {
      root.classList.add('dark-mode');
    }
  } catch (error) {
    // Continue with the light theme when localStorage is unavailable.
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }

    updateButton();
    button.addEventListener('click', function () {
      var dark = !isDark();
      root.classList.toggle('dark-mode', dark);
      try {
        window.localStorage.setItem(storageKey, dark ? 'dark' : 'light');
      } catch (error) {
        // The theme still applies for the current page.
      }
      updateButton();
    });
  });
}());
