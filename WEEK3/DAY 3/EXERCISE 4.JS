document.getElementById('MyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const radiusValue = document.getElementById('radius').value;
    const radius = parseFloat(radiusValue);
    
    // Check if input is a valid number
    if (!isNaN(radius)) {
        // Calculation: (4/3) * PI * r^3
        const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
        
        // Display result in the volume input, fixed to 2 decimal places
        document.getElementById('volume').value = volume.toFixed(2);
    } else {
        alert("Please enter a valid number for the radius.");
    }
});