const teams = [
    { name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
    { name: "Switzerland", flag: "https://flagcdn.com/w40/ch.png" },
    { name: "Hungary", flag: "https://flagcdn.com/w40/hu.png" },
    { name: "Dutch East Indies", flag: "https://flagcdn.com/w40/id.png" },
    { name: "France", flag: "https://flagcdn.com/w40/fr.png" },
    { name: "Belgium", flag: "https://flagcdn.com/w40/be.png" },
    { name: "Brazil", flag: "https://flagcdn.com/w40/br.png" },
    { name: "Poland", flag: "https://flagcdn.com/w40/pl.png" },
    { name: "Italy", flag: "https://flagcdn.com/w40/it.png" },
    { name: "Norway", flag: "https://flagcdn.com/w40/no.png" },
    { name: "Czechoslovakia", flag: "https://flagcdn.com/w40/cz.png" },
    { name: "Netherlands", flag: "https://flagcdn.com/w40/nl.png" },
    { name: "Sweden", flag: "https://flagcdn.com/w40/se.png" },
    { name: "Austria", flag: "https://flagcdn.com/w40/at.png" },
    { name: "Cuba", flag: "https://flagcdn.com/w40/cu.png" },
    { name: "Romania", flag: "https://flagcdn.com/w40/ro.png" }
];

let matches = [];
let round = 16;

function initializeMatches() {
    const container = document.getElementById("container");
    container.innerHTML = "";  // Czyścimy kontener
    matches = [];  // Resetujemy mecze

    // Tworzymy nowe mecze na podstawie drużyn w `teams`
    for (let i = 0; i < teams.length; i += 2) {
        matches.push({ team1: teams[i], team2: teams[i + 1], score1: null, score2: null });
    }

    // Wyświetlamy mecze
    matches.forEach((match, index) => {
        container.innerHTML += `
            <div class="match">
                <div class="team">
                    <img class="flag" src="${match.team1.flag}" alt="${match.team1.name} flag">
                    <span>${match.team1.name}</span>
                </div>
                <div class="score-container">
                    <input type="number" min="0" id="match${index}_team1">
                    <span>:</span>
                    <input type="number" min="0" id="match${index}_team2">
                </div>
                <div class="team">
                    <span>${match.team2.name}</span>
                    <img class="flag" src="${match.team2.flag}" alt="${match.team2.name} flag">
                </div>
            </div><hr>
        `;
    });
}

function nextStage() {
    const winners = [];

    // Przechodzimy przez wszystkie mecze
    for (let index = 0; index < matches.length; index++) {
        const score1 = parseInt(document.getElementById(`match${index}_team1`).value);
        const score2 = parseInt(document.getElementById(`match${index}_team2`).value);

        // Sprawdzamy, czy wynik jest poprawny (nie pusty)
        if (isNaN(score1) || isNaN(score2) || score1 === "" || score2 === "") {
            alert("Please enter valid scores for all matches!");
            return;  // Jeśli jakiekolwiek pole jest puste lub niepoprawne, nie przechodzimy dalej
        }

        if (score1 === score2) {
            alert("Draws are not allowed in knockout stages! Please enter a winner.");
            return;  // Jeśli wynik to remis, nie przechodzimy dalej
        }

        // Dodajemy zwycięzcę do listy zwycięzców
        if (score1 > score2) {
            winners.push(matches[index].team1);
        } else {
            winners.push(matches[index].team2);
        }
    }

    // Upewniamy się, że mamy wszystkich zwycięzców
    if (winners.length === matches.length) {
        // Resetujemy drużyny do kolejnej rundy
        teams.length = 0;
        winners.forEach(winner => teams.push(winner));

        // Jeśli mamy już jednego zwycięzcę, kończymy turniej
        if (teams.length === 1) {
            alert(`The winner of the tournament is ${teams[0].name}!`);
        } else {
            // Zmniejszamy liczbę drużyn w każdej rundzie
            round /= 2;
            // Uaktualniamy nagłówek
            document.getElementById("header").textContent = `World Cup - Round of ${round}`;
            // Inicjalizujemy nowe mecze
            initializeMatches();
        }
    }
}

// Inicjalizacja meczów po załadowaniu strony
document.addEventListener("DOMContentLoaded", initializeMatches);
