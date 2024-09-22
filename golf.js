const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const cards = {
    hearts: {
        "As hearts": 1,
        "2 hearts": 2,
        "3 hearts": 3,
        "4 hearts": 4,
        "5 hearts": 5,
        "6 hearts": 6,
        "7 hearts": 0,
        "8 hearts": 8,
        "9 hearts": 9,
        "10 hearts": 10,
        "Jack hearts": 11,
        "Queen hearts": 12,
        "King hearts": 13
    },
    diamonds: {
        "As diamonds": 1,
        "2 diamonds": 2,
        "3 diamonds": 3,
        "4 diamonds": 4,
        "5 diamonds": 5,
        "6 diamonds": 6,
        "7 diamonds": 0,
        "8 diamonds": 8,
        "9 diamonds": 9,
        "10 diamonds": 10,
        "Jack diamonds": 11,
        "Queen diamonds": 12,
        "King diamonds": 13
    },
    clubs: {
        "As clubs": 1,
        "2 clubs": 2,
        "3 clubs": 3,
        "4 clubs": 4,
        "5 clubs": 5,
        "6 clubs": 6,
        "7 clubs": 0,
        "8 clubs": 8,
        "9 clubs": 9,
        "10 clubs": 10,
        "Jack clubs": 11,
        "Queen clubs": 12,
        "King clubs": 13
    },
    spades: {
        "As spades": 1,
        "2 spades": 2,
        "3 spades": 3,
        "4 spades": 4,
        "5 spades": 5,
        "6 spades": 6,
        "7 spades": 0,
        "8 spades": 8,
        "9 spades": 9,
        "10 spades": 10,
        "Jack spades": 11,
        "Queen spades": 12,
        "King spades": 13
    },
    jokers: {
        "Joker1": 0,
        "Joker2": 0
    }
};

function CardsForPlayer(cards){
    const NewCards = [];
    for(let i = 0;i<5;i++){
        const randomNumber = Math.floor(Math.random() * 5);
        const randomNumberJoker = Math.floor(Math.random() * 1);
        const randomNumberCard = Math.floor(Math.random() * 13);
        if(randomNumber === 0){
            const hearts = cards.hearts;
            const keys = Object.keys(hearts);
            const card = keys[randomNumberCard];  
            NewCards.push(card);
        
        }
        if(randomNumber === 1){
            const diamonds = cards.diamonds;
            const keys = Object.keys(diamonds);
            const card = keys[randomNumberCard];  
            NewCards.push(card);
      

        }
        if(randomNumber === 2){
            const clubs = cards.clubs;
            const keys = Object.keys(clubs);
            const card = keys[randomNumberCard];  
            NewCards.push(card);
       

        }
        if(randomNumber === 3){
            const spades = cards.spades;
            const keys = Object.keys(spades);
            const card = keys[randomNumberCard];  
            NewCards.push(card);
       

        }
        if(randomNumber === 4){
            const jokers = cards.jokers;
            const keys = Object.keys(jokers);
            const card = keys[randomNumberJoker];  
            NewCards.push(card);

        }
    }
    return NewCards;
    
}



function Player(name,cards) {
    this.name = name;
    this.cards = cards;
}

function createPlayers(cards1,cards2) {
    const players = [];

    rl.question("Enter name for Player 1: ", (player1Name) => {
        players.push(new Player(player1Name,cards1));

        rl.question("Enter name for Player 2: ", (player2Name) => {
            players.push(new Player(player2Name,cards2));

            console.log(`Players created: ${players[0].name} and ${players[1].name}`);
            rl.close();
        });
    });
    return players;
}

function Game(){
    this.Start = function(){
        console.log("Let's gooo!");
        rl.question("Are you ready to play? (y/n): ", function(answer) {
            if (answer.toLowerCase() === 'y') {
                console.log('Lets create 2 players!!'); 
                return createPlayers(CardsForPlayer(cards),CardsForPlayer(cards));
            } else {
                exitGame(); 
            }
            rl.close(); 
        });
    }
    this.exitGame = function(){
        console.log('Ok,maybe next time..');
        process.exit(0);
    }
}

function Deck(){
    
}

const game = new Game();
game.Start();





