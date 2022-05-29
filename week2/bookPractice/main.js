// // Chapter 1
// alert('Welcome to Quiz Ninja!');

// Chapter 5: Objects to replace the nested loops used on last chapter
const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    ];

// View Object to work with the new index.html file
const view = {
    start: document.getElementById('start'), // added for chapter 7 (events)
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    // added for chapter 7 (events)
    show(element){
        element.style.display = 'block';
        },
    hide(element){
    element.style.display = 'none';
    }
};    

// Also Ch 5 replace the game function. With methods we are managing the questions, the sorting 
// of correct or wrong answers, the scores as well as the way how we call that function
// From Ch 6 we are updating methods
const game = {
    start(quiz){
        view.hide(view.start); // for chapter 7
        this.questions = [...quiz];
        this.score = 0;
        // main game loop
        for(const question of this.questions){
        this.question = question;
        this.ask();
        }
        // end of main game loop
        this.gameOver();
    },
    ask(){
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
        const response =  prompt(question);
        this.check(response);
    },
    // ask(){
    //     const question = `What is ${this.question.name}'s real name?`;
    //     const response =  prompt(question);
    //     this.check(response);
    // },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
        view.render(view.result,'Correct!',{'class':'correct'});
        alert('Correct!');
        this.score++;
        view.render(view.score,this.score);
        } else {
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        alert(`Wrong! The correct answer was ${answer}`);
        }
    },
    // check(response){
    //     const answer = this.question.realName;
    //     if(response === answer){
    //     alert('Correct!');
    //     this.score++;
    //     } else {
    //     alert(`Wrong! The correct answer was ${answer}`);
    //     }
    // },
    gameOver(){
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.show(view.start); //  added for ch 7
    }
    // gameOver(){
    //     alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    // }
}

game.start(quiz);
view.start.addEventListener('click', () => game.start(quiz), false); //chapter 7 to make the button do something

// //Chapter 4 Indicates we must substitute the code, we can see I had most of it, I did it to keep historic code
// const quiz = [
//     ["What is Superman's real name?","Clark Kent"],
//     ["What is Wonder Woman's real name?","Diana Prince"],
//     ["What is Batman's real name?","Bruce Wayne"]
// ];

// function start(quiz){
// let score = 0;

// // main game loop
// for(const [question,answer] of quiz){
//     const response = ask(question);
//     check(response,answer);
// }
// // end of main game loop

// gameOver();

// // function declarations
// function ask(question){
//     return prompt(question);
// }

// function check(response,answer){
//     if(response === answer){
//     alert('Correct!');
//     score++;
//     } else {
//     alert(`Wrong! The correct answer was ${answer}`);
//     }
// }

// function gameOver(){
//     alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
// }
// }
// start(quiz);

// //Chapter 3
// const quiz = [
//     ["What is Superman's real name?","Clark Kent"],
//     ["What is Wonder Woman's real name?","Diana Prince"],
//     ["What is Batman's real name?","Bruce Wayne"]
// ];

// let score = 0 // initialize score

// // Chapter 3
// for(const [question,answer] of quiz){
//     const response = prompt(question);
//     if(response === answer){
//         alert('Correct!');
//         score++;
//     } else {
//         alert(`Wrong! The correct answer was ${answer}`);
//     }
// }

// //Chapter 2 addition
// // const question = "What is Superman's real name?"
// // const answer = prompt(question);
// // alert(`You answered ${answer}`);

// //Chapter 3
// // At the end of the game, report the player's score
// alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);