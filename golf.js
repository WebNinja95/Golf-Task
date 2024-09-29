const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PlayersBoard = [['Face Down','Face Down','Face Down','Face Down'],['Face Down','Face Down','Face Down','Face Down']];
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
            deck.push(card); 
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
            console.log(`${players[0].name} created `);
            console.log(`${players[1].name} created`);
            Discard_Pile.push(deck.pop());
            StartGame(deck, Discard_Pile, players, PlayersBoard, 0);
        });
    });
}

function CheckFaceDown(PlayersBoard){
    let ct1 = 0;
    let ct2 = 0;
    for(let i = 0; i < 4; i++){
        if(PlayersBoard[0][i] !== 'Face Down'){
            ct1++;
        }
        if(PlayersBoard[1][i] !== 'Face Down'){
            ct2++;
        }
    }
    return (ct1 === 4 || ct2 === 4);
}

function FinalScore(players){
    let Player1Score = 0;
    let Player2Score = 0;
    
    console.log(`${players[0].name} final score: ${Player1Score}`);
    console.log(`${players[1].name} final score: ${Player2Score}`);
    return true;
}

function StartGame(deck, Discard_Pile, players, PlayersBoard, PlayTurn){
    const Check = CheckFaceDown(PlayersBoard);
    if(Check){
        return FinalScore(players);
    }
    if(PlayTurn > 1){
        PlayTurn = 0;
    }
    console.log(`${players[0].name} Hands: ${PlayersBoard[0]}`);
    console.log(`${players[1].name} Hands: ${PlayersBoard[1]}`);
    console.log(`Discard Pile: ${Discard_Pile[Discard_Pile.length-1]}`);
    GamePlay(deck, Discard_Pile, players, PlayersBoard, PlayTurn);
}

function GamePlay(deck, Discard_Pile, players, PlayersBoard, PlayerTurn){
    console.log(`It's ${players[PlayerTurn].name}'s turn!`);
    rl.question("Draw from deck (D) or take from discard pile (P)? ", (action) => {
        if (action.toLowerCase() === 'd') {
            const drawnCard = deck.pop();
            console.log(`You drew: ${drawnCard}`);

            rl.question("Do you want to (R) Replace a card or (D) Discard the drawn card? ", (nextAction) => {
                if (nextAction.toLowerCase() === 'r') {
                    rl.question("Which card do you want to replace? (1-4): ", (cardPosition) => {
                        const replacedCard = players[PlayerTurn].cards[cardPosition - 1];
                        players[PlayerTurn].cards[cardPosition - 1] = drawnCard;
                        Discard_Pile.push(replacedCard);
                        PlayersBoard[PlayerTurn][cardPosition - 1] = drawnCard;
                        console.log(`${players[PlayerTurn].name} replaced a card!`);
                        StartGame(deck, Discard_Pile, players, PlayersBoard, PlayerTurn + 1);
                    });
                } else {
                    Discard_Pile.push(drawnCard);
                    console.log(`${players[PlayerTurn].name} discarded the drawn card.`);
                    StartGame(deck, Discard_Pile, players, PlayersBoard, PlayerTurn + 1);
                }
            });
        } else if (action.toLowerCase() === 'p') {
            const topDiscardCard = Discard_Pile.pop();
            console.log(`You took: ${topDiscardCard}`);

            rl.question("Which card do you want to replace? (1-4): ", (cardPosition) => {
                const replacedCard = players[PlayerTurn].cards[cardPosition - 1];
                players[PlayerTurn].cards[cardPosition - 1] = topDiscardCard;
                Discard_Pile.push(replacedCard);
                console.log(`${players[PlayerTurn].name} replaced a card with a discard pile card!`);
                PlayersBoard[PlayerTurn][cardPosition - 1] = topDiscardCard;
                StartGame(deck, Discard_Pile, players, PlayersBoard, PlayerTurn + 1);
            });
        } else {
            console.log("Invalid input. Try again.");
            StartGame(deck, Discard_Pile, players, PlayersBoard, PlayerTurn);
        }
    });
}

CreatePlayersAndDeal();
