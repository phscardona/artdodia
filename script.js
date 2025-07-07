let left, right;
let score = 0;

function getRandomArtworks() {
  let a = artworks[Math.floor(Math.random() * artworks.length)];
  let b;
  do {
    b = artworks[Math.floor(Math.random() * artworks.length)];
  } while (a === b);
  return [a, b];
}

function renderCard(cardId, artwork) {
  const card = document.getElementById(cardId);
  card.innerHTML = `
    <img src="${artwork.image}" alt="${artwork.title}">
    <h3>${artwork.title}</h3>
    <p><strong>${artwork.artist}</strong></p>
    <p><em>${artwork.year} • ${artwork.style}</em></p>
  `;
}

function startGame() {
  [left, right] = getRandomArtworks();
  renderCard("left-card", left);
  renderCard("right-card", right);
  document.getElementById("result").innerText = "";
  document.getElementById("restart-btn").style.display = "none";
}

function handleGuess(isLeft) {
  const chosen = isLeft ? left : right;
  const other = isLeft ? right : left;

  if (chosen.score >= other.score) {
    score++;
    document.getElementById("score").innerText = `Pontuação: ${score}`;
    [left, right] = [chosen, artworks[Math.floor(Math.random() * artworks.length)]];
    while (left === right) right = artworks[Math.floor(Math.random() * artworks.length)];
    renderCard("left-card", left);
    renderCard("right-card", right);
  } else {
    document.getElementById("result").innerText = `Errou! ${chosen.title} tem score ${chosen.score}, ${other.title} tem ${other.score}`;
    document.getElementById("restart-btn").style.display = "inline-block";
  }
}

document.getElementById("left-card").addEventListener("click", () => handleGuess(true));
document.getElementById("right-card").addEventListener("click", () => handleGuess(false));
document.getElementById("restart-btn").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").innerText = `Pontuação: 0`;
  startGame();
});

startGame();
