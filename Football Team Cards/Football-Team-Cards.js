const footballTeam = {
  team: 'Shadow Strikers',
  year: 2025,
  headCoach:  'Marcus "Iron Will" Carter',
  players: [
    {name:'Liam "Flash" Reynolds',
    position: 'forward',
    isCaptain: false},
    {name: 'Dante "The Wall" Martinez',
    position: 'defender',
    isCaptain: false},
    {name: 'Kai "Maestro" Naka',
    position: 'midfielder',
    isCaptain: false},
    {name: 'Ezekiel "Safe Hands" Johnson',
    position: 'goalkeeper',
    isCaptain: true}
  ]
}

const coach = document.getElementById('head-coach');
const team = document.getElementById('team');
const year = document.getElementById('year');


coach.textContent = footballTeam.headCoach;
team.textContent = footballTeam.team;
year.textContent = footballTeam.year;

const playerCards = document.getElementById('player-cards');
playerCards.innerHTML = '<div class="player-card"><h2>Liam "Flash" Reynolds</h2><p>Position: forward</p></div><div class="player-card"><h2>Dante "The Wall" Martinez</h2><p>Position: defender</p></div><div class="player-card"><h2>Kai "Maestro" Naka</h2><p>Position: midfielder</p></div><div class="player-card"><h2>(Captain) Ezekiel "Safe Hands" Johnson</h2><p>Position: goalkeeper</p></div>';

const selectContainer = document.querySelector("select");

function getPlayerCards(playerCategory) {
  const players =
    playerCategory === "all"
      ? footballTeam.players
      : footballTeam.players.filter(
          ({ position }) => position === playerCategory
        );

  return players
    .map(({ name, position, isCaptain }) => {
      return `<div class="player-card">
                <h2>${isCaptain ? "(Captain) " : ""}${name}</h2>
                <p>Position: ${position}</p>
              </div>`;
    })
    .join('');
}

selectContainer.addEventListener("change", () => {
  playerCards.innerHTML = getPlayerCards(selectContainer.value);
});