// 1. Retrieve the h1 and console.log it
const h1 = document.querySelector('h1');
console.log(h1);

// 2. Remove the last paragraph
const article = document.querySelector('article');
article.lastElementChild.remove();

// 3. Change h2 background to red on click
const h2 = document.querySelector('h2');
h2.addEventListener('click', () => {
    h2.style.backgroundColor = 'red';
});

// 4. Hide h3 on click
const h3 = document.querySelector('h3');
h3.addEventListener('click', () => {
    h3.style.display = 'none';
});

// 5. Button to make all paragraphs bold
const boldBtn = document.getElementById('boldBtn');
boldBtn.addEventListener('click', () => {
    const allPs = document.querySelectorAll('p');
    allPs.forEach(p => p.style.fontWeight = 'bold');
});

// BONUS 1: Random font size for h1 on hover
h1.addEventListener('mouseover', () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS 2: Fade out 2nd paragraph (Requires CSS transition)
const secondP = document.getElementById('secondPara');
secondP.style.transition = "opacity 1s ease";
secondP.addEventListener('mouseover', () => {
    secondP.style.opacity = '0';
});