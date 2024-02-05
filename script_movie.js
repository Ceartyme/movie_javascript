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
        if (data.Title=="N/A"){
            document.getElementById("title").textContent="No title available"
        }
        else{
        document.getElementById("title").textContent=data.Title
        }
        document.getElementById("poster_img").src=data.Poster
        document.getElementById("poster_img").alt="Poster de "+data.Title
        if (data.Released=="N/A"){
            document.getElementById("release").getElementsByClassName("to_change")[0].textContent="No date available"
        }
        else{
            let date = data.Released.split(" ")
            let texte_date=date[0]+"/"
            switch (date[1]) {
                case "Jan":
                    texte_date+="01/"
                    break;
                case "Feb":
                    texte_date+="02/"
                    break;
                case "Mar":
                    texte_date+="03/"
                    break;
                case "Apr":
                    texte_date+="04/"
                    break;
                case "May":
                    texte_date+="05/"
                    break;
                case "Jun":
                    texte_date+="06/"
                    break;
                case "Jul":
                    texte_date+="07/"
                    break;
                case "Aug":
                    texte_date+="08/"
                    break;
                case "Sep":
                    texte_date+="09/"
                    break;
                case "Oct":
                    texte_date+="10/"
                    break;
                case "Nov":
                    texte_date+="11/"
                    break;
                case "Dec":
                    texte_date+="12/"
                    break;
                default:
                    break;
            }
            texte_date+=date[2]
    
            document.getElementById("release").getElementsByClassName("to_change")[0].textContent=texte_date
        }
        if (data.Type=="N/A"){
            document.getElementById("type").getElementsByClassName("to_change")[0].textContent="No type available"
        }
        else{
            document.getElementById("type").getElementsByClassName("to_change")[0].textContent=data.Type
        }
        if (data.Genre=="N/A"){
            document.getElementById("genre").getElementsByClassName("to_change")[0].textContent="No genre available"
        }
        else{
            document.getElementById("genre").getElementsByClassName("to_change")[0].textContent=data.Genre
        }
        if (data.Runtime=="N/A"){
            document.getElementById("runtime").getElementsByClassName("to_change")[0].textContent="No runtime available"
        }
        else{
        document.getElementById("runtime").getElementsByClassName("to_change")[0].textContent=data.Runtime
        }
        if (data.Director=="N/A"){
            document.getElementById("director").textContent="No director available"
        }
        else{
            let liste= document.createElement("ul")
            let liste_director= data.Director.split(",")
            for (let i = 0; i < liste_director.length; i++) {
                let elem = document.createElement("li")
                elem.textContent=liste_director[i]
                liste.appendChild(elem)
            }
            
            document.getElementById("director").appendChild(liste)
        }

        if (data.Actors=="N/A"){
            document.getElementById("actors").textContent="No actors available"
        }
        else{
            liste= document.createElement("ul")
            let liste_actors= data.Actors.split(",")
            for (let i = 0; i < liste_actors.length; i++) {
                let elem = document.createElement("li")
                elem.textContent=liste_actors[i]
                liste.appendChild(elem)
            }
            document.getElementById("actors").appendChild(liste)
        }

        if (data.Awards=="N/A"){
            document.getElementById("awards").textContent="No awards available"
        }
        else{
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
        }

        if (data.Ratings=="N/A"){
            document.getElementById("ratings").textContent="No ratings available"
        }
        else{
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
        }

        if (data.Plot=="N/A"){
            document.getElementById("plot").getElementsByClassName("to_change")[0].textContent="No plot available"
        }
        else{
            let plot = document.getElementById("plot")
            let changeplot = plot.getElementsByClassName("to_change")[0]
            changeplot.textContent=data.Plot
        }

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

searchButton.addEventListener('click', search);
document.addEventListener('keyup', function(event) {
  if (event.key === "Enter") {
    search();
  }
})

function search() {
  let input = document.getElementById('search_input').value;
  window.location.href = input!=""?`search.html?search=${input}`:`search.html`;
}