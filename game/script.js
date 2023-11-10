document.getElementById('rock').addEventListener('click', function() { playGame('камень'); });
document.getElementById('scissors').addEventListener('click', function() { playGame('ножницы'); });
document.getElementById('paper').addEventListener('click', function() { playGame('бумага'); });

function playGame(playerChoice) {
    const choices = ['камень', 'ножницы', 'бумага'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (playerChoice === computerChoice) {
        setResult('Ничья');
    } else if (
        (playerChoice === 'камень' && computerChoice === 'ножницы') ||
        (playerChoice === 'ножницы' && computerChoice === 'бумага') ||
        (playerChoice === 'бумага' && computerChoice === 'камень')
    ) {
        setResult('Победа');
    } else {
        setResult('Поражение');
    }
}

function setResult(message) {
    document.getElementById('result').textContent = message;
}
