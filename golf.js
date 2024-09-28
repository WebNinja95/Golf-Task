const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const cards_board = ['Face Down','Face Down','Face Down','Face Down'];
const Discard_Pile = []
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

function shuffleDeck(cards) {
    const deck = [];
    for (let suit in cards) {
        for (let card in cards[suit]) {
            deck.push({ name: card, value: cards[suit][card] });
        }
    }

    
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;  
}

function Player(name){
    this.name = name;
    this.cards = [];
}

function dealCardsToPlayers(deck, players) {
    const cardsToDeal = 4;  
    players.forEach(player => {
        for (let i = 0; i < cardsToDeal; i++) {
            const dealtCard = deck.pop(); 
            player.cards.push(dealtCard);
        }
    });

    console.log(`Deck after dealing: ${deck.length} cards left!`);
    return deck;
}

function CreatePlayersAndDeal() {
    const players = [];
    rl.question("Enter name for Player 1: ", (player1Name) => {
        players.push(new Player(player1Name));
        rl.question("Enter name for Player 2: ", (player2Name) => {
            players.push(new Player(player2Name));
            console.log(`Brilliant! Players created: ${players[0].name} and ${players[1].name}`);
            let deck = shuffleDeck(cards);
            deck = dealCardsToPlayers(deck, players);
            console.log(`${players[0].name} has the following cards:`, players[0].cards);
            console.log(`${players[1].name} has the following cards:`, players[1].cards);

            rl.close(); 
        });
    });
}


CreatePlayersAndDeal();