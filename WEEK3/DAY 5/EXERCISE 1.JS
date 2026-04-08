const grid = document.getElementById('grid-container');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');
const clearBtn = document.getElementById('clear-btn');

let currentColor = '#ff4757';
let isDrawing = false;

// 1. Initialize Grid (400 squares)
function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < 400; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        
        div.addEventListener('mousedown', () => {
            isDrawing = true;
            div.style.backgroundColor = currentColor;
        });
        
        div.addEventListener('mouseover', () => {
            if (isDrawing) div.style.backgroundColor = currentColor;
        });
        
        grid.appendChild(div);
    }
}

// 2. Color Selection
document.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => currentColor = s.dataset.color);
});

// 3. Mouse Up Global
window.addEventListener('mouseup', () => isDrawing = false);

// 4. SAVE LOGIC
saveBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    const colorData = Array.from(squares).map(s => s.style.backgroundColor || 'white');
    localStorage.setItem('myArt', JSON.stringify(colorData));
    alert("Art saved to browser memory!");
});

// 5. LOAD LOGIC
loadBtn.addEventListener('click', () => {
    const savedData = JSON.parse(localStorage.getItem('myArt'));
    if (savedData) {
        const squares = document.querySelectorAll('.square');
        squares.forEach((s, index) => {
            s.style.backgroundColor = savedData[index];
        });
    }
});

// 6. CLEAR LOGIC
clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.square').forEach(s => s.style.backgroundColor = 'white');
});

createGrid();