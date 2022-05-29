// Mouse events
const clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click',() => console.log('click') );
clickParagraph.addEventListener('mousedown',() => console.log('down') );
clickParagraph.addEventListener('mouseup',() => console.log('up') );

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);

function highlight(event){
event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);

mouseParagraph.addEventListener('mousemove', () =>  console.log('You Moved!') );

// Keyboard events
addEventListener('keydown',highlight);

addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}`));
// to check only the keys like control alt, etc that normally don't give anything back
addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));
// // to check every time you click on keyboard
// addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));

//will check to see if the user pressed the C key while holding down the Ctrl key
addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
        console.log('Action canceled!');
    }
    });
// checks to see if the Shift key was held down when the mouse was clicked
addEventListener('click', (event) => {
    if (event.shiftKey) {
        console.log('A Shifty Click!');
    }
    });


// Touch events

addEventListener('touchend', () => console.log('Touch stopped'));

// Removing event listeners
const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
console.log('Enjoy this while it lasts!');
onceParagraph.style.backgroundColor = 'pink';
onceParagraph.removeEventListener('click',remove);
}

// Stopping default behavior
const brokenLink = document.getElementById('broken');

brokenLink.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

//Event Propagation

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
// Bubbling
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul') );

liElement.addEventListener('click', (event) =>
console.log('Clicked on li') );

// Capturing 
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),true);

liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);

// Stopping the bubbling phase
liElement.addEventListener('click', (event) => {
    console.log('clicked on li');
    event.stopPropagation(); }, false);

// Event delegation
ulElement.addEventListener('click',highlight);    

// // Coordinates of an event
// function doSomething(event){
//     console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`)
//     }
// // Event Target
// function doSomething(event){
//     console.log(event.target);
//     }
// // Event object
// function doSomething(event){
//     console.log(event.type);
//     }

// // To start
// function doSomething(){
//     console.log('Something Happened!');
//     }
    
    // addEventListener('click', doSomething);