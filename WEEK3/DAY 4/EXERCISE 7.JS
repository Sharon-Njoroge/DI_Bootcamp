(function(userName) {
    const navbar = document.querySelector('.navbar'); // Ensure you have <nav class="navbar"></nav> in HTML
    const welcomeDiv = document.createElement('div');
    
    welcomeDiv.innerHTML = `
        <span>Welcome, ${userName}</span>
        <img src="https://via.placeholder.com/50" alt="profile" style="border-radius: 50%">
    `;
    
    navbar.appendChild(welcomeDiv);
})("John");