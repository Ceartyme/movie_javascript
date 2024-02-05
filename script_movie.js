const id=window.location.search.split("=")[1]
display(id)

function display(id){
    fetch(`http://www.omdbapi.com/?apikey=260740d0&i=${id}&plot=short`) /* clé 1 : 260740d0, clé 2 : 1ca1da21 */
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("title").textContent=data.Title
        document.getElementById("poster_img").src=data.Poster
        document.getElementById("poster_img").alt="Poster de "+data.Title
        document.getElementById("release").getElementsByClassName("to_change")[0].textContent=data.Released
        document.getElementById("type").getElementsByClassName("to_change")[0].textContent=data.Type
        document.getElementById("genre").getElementsByClassName("to_change")[0].textContent=data.Genre
        document.getElementById("runtime").getElementsByClassName("to_change")[0].textContent=data.Runtime
        
        let liste= document.createElement("ul")
        let liste_director= data.Director.split(",")
        for (let i = 0; i < liste_director.length; i++) {
            let elem = document.createElement("li")
            elem.textContent=liste_director[i]
            liste.appendChild(elem)
        }
        
        document.getElementById("director").appendChild(liste)

        liste= document.createElement("ul")
        let liste_actors= data.Actors.split(",")
        for (let i = 0; i < liste_actors.length; i++) {
            let elem = document.createElement("li")
            elem.textContent=liste_actors[i]
            liste.appendChild(elem)
        }
        document.getElementById("actors").appendChild(liste)
        liste= document.createElement("ul")
        liste_awards= data.Awards.split("&")
        let rajout = liste_awards[1]
        liste_awards= liste_awards[0].split(".")
        liste_awards[2]=rajout

        for (let i = 0; i < liste_awards.length; i++) {
            if (liste_awards[i]){
            let elem = document.createElement("li");
            elem.textContent=liste_awards[i];
            liste.appendChild(elem);
            }
        }
        document.getElementById("awards").appendChild(liste)
        liste = document.createElement("ul")
        for (let i = 0; i < data.Ratings.length; i++) {
            let li = document.createElement("li")
            let p = document.createElement("p")
            p.classList.add("underline")
            p.textContent=data.Ratings[i].Source
            let q = document.createElement("p")
            q.textContent = data.Ratings[i].Value
            li.appendChild(p)
            li.appendChild(q)
            liste.appendChild(li)
        }
        document.getElementById("ratings").appendChild(liste)
        let plot = document.getElementById("plot")
        let changeplot = plot.getElementsByClassName("to_change")[0]
        changeplot.textContent=data.Plot
    })
}

let button = document.getElementById("button_plot")
button.addEventListener("click", function(){
    
    let changeplot = plot.getElementsByClassName("to_change")[0]
    fetch(`http://www.omdbapi.com/?apikey=260740d0&i=${id}&plot=full`) /* clé 1 : 260740d0, clé 2 : 1ca1da21 */
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid');
        }
        return response.json();
    })
    .then(data => {
        changeplot.textContent=data.Plot
    })

    button.style.display = "none";
})


let searchButton = document.getElementById('search_button');

searchButton.addEventListener('click', function() {
  let input = document.getElementById('search_input').value;
  window.location.href = input!=""?`search.html?search=${input}`:`search.html`;
})