document.querySelectorAll('.container').forEach(container => {
  container.addEventListener('click', (e) => {
    const target = e.target.closest('.card');

    if (!target) return;

    container.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('active');
    });

    target.classList.add('active');
  });
});

getPoster()

const movieIds = ['tt6166392', 'tt15398776', 'tt6718170', 'tt6587046', 'tt17009710', 'tt4633694', 'tt5537002', 'tt16606592', 'tt1517268', 'tt0088939'];


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

for (let i = 0; i < 10; i++) {
const posterElementId = `poster${i + 1}`;
const titleElementId = `title${i + 1}`;
getPoster(movieIds[i], posterElementId, titleElementId);
}


document.addEventListener("DOMContentLoaded", function() {
  var checkbox = document.getElementById("button");
  var section2 = document.getElementById("section2");

  checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
          section2.style.display = "none";
      } else {
          section2.style.display = "block";
      }
  });
});