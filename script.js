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

getInfos()

const movieIds = ['tt6166392', 'tt15398776', 'tt6718170', 'tt6587046', 'tt17009710', 'tt4633694', 'tt5537002', 'tt16606592', 'tt1517268', 'tt0088939'];


function getInfos(id, posterElementId, titleElementId, linkElementId) {
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
      let link = document.getElementById(linkElementId);
      poster.src = data.Poster;
      title.textContent = data.Title;
      link.href = `movie.html?Id=${id}`;
  })
  .catch(error => {
      console.error(`Invalid`);
  });
}

for (let i = 0; i < 10; i++) {
const posterElementId = `poster${i + 1}`;
const titleElementId = `title${i + 1}`;
const linkElementId = `link${i + 1}`;
getInfos(movieIds[i], posterElementId, titleElementId, linkElementId);
}


document.addEventListener("DOMContentLoaded", function() {
  var checkbox = document.getElementById("button");
  var section2 = document.getElementById("section2");

  checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
          section2.style.display = "none";
      
        } else {
          section2.style.display = "block";
          scrollToBottom();
      }
  });
});


function scrollToBottom() {
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  
  window.scrollTo({
    top: height,
    behavior: 'smooth'
  });
}


let searchButton = document.getElementById('search_button');

searchButton.addEventListener('click', function() {
  let input = document.getElementById('search_input').value;
  window.location.href = input!=""?`search.html?search=${input}`:`search.html`;
})