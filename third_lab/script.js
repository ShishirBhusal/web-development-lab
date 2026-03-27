// Loop from 1 to 10 and print to the DOM
const container = document.getElementById('output');

for (let i = 1; i <= 10; i++) {
    const paragraph = document.createElement('p');
    paragraph.textContent = `Item ${i}`;
    container.appendChild(paragraph);
}


numbers = [10, 20, 30, 40, 50];

data= numbers.filter(i => i > 25);

data.forEach(i => {console.log(i);});

