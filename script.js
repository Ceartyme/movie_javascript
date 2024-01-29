const cardsContainer = document.querySelector(".container");

cardsContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".card");

  if (!target) return;

  cardsContainer.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("active");
  });

  target.classList.add("active");
});

getPoster()

const movieIds = ['tt6166392', 'tt15398776', 'tt6718170', `tt6587046`, `tt17009710`];


function getPoster(id, posterElementId, titleElementId) {
  fetch(`http://www.omdbapi.com/?apikey=260740d0&i=${id}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Invalid');
      }
      return response.json();
  })
  .then(data => {
      let poster = document.getElementById(posterElementId);
      let title = document.getElementById(titleElementId);
      poster.src = data.Poster;
      title.textContent = data.Title;
  })
  .catch(error => {
      console.error(`Invalid`);
  });
}

for (let i = 0; i < movieIds.length; i++) {
const posterElementId = `poster${i + 1}`;
const titleElementId = `title${i + 1}`;
getPoster(movieIds[i], posterElementId, titleElementId);
}