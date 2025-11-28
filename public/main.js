// Find elements on the page
const button = document.getElementById('btn');
const messageEl = document.getElementById('message');

// Make request to backend
fetch('/api/hello')
    .then(res => res.json())
    .then(data => {
        messageEl.textContent = data.message;
    });

// Button click logic
button.addEventListener('click', () => {
    alert("Button clicked!");
});

