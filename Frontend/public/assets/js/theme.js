document.addEventListener('DOMContentLoaded', (event) => {
    // Function to switch the theme
    function switchTheme() {
        // Get the current theme from localStorage
        let currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            // Switch to light theme
            localStorage.setItem('theme', 'light');
            document.getElementById('themeStylesheet').setAttribute('href', 'assets/css/main2.css');
            // Change SVG to moon
            document.getElementById('sun').style.display = 'none';
            document.getElementById('moon').style.display = 'inline';
        } else {
            // Switch to dark theme
            localStorage.setItem('theme', 'dark');
            document.getElementById('themeStylesheet').setAttribute('href', 'assets/css/main.css');
            // Change SVG to sun
            document.getElementById('moon').style.display = 'none';
            document.getElementById('sun').style.display = 'inline';
        }
    }

    // Get the current theme from localStorage
    let currentTheme = localStorage.getItem('theme');

    // Set the theme on page load
    if (currentTheme === 'dark') {
        document.getElementById('themeStylesheet').setAttribute('href', 'assets/css/main.css');
        // Display the sun SVG
        document.getElementById('moon').style.display = 'none';
        document.getElementById('sun').style.display = 'inline';
    } else {
        document.getElementById('themeStylesheet').setAttribute('href', 'assets/css/main2.css');
        // Display the moon SVG
        document.getElementById('sun').style.display = 'none';
        document.getElementById('moon').style.display = 'inline';
    }

    // Add event listener to the button
    document.getElementById('toggleButton').addEventListener('click', switchTheme);
});


