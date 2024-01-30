let bouton= document.getElementById("search_button");
let lastresearch = "";
let container = document.getElementById("container");
let body = document.getElementById("body");
let nbpage=1
let bouton_here= false


bouton.addEventListener("click", function(){
    let input = document.getElementById("search_input").value;
    if(input != lastresearch && input != ""){
        if (lastresearch != ""){
            bouton_here=true
        }
        lastresearch = input;
        nbpage=1
        research(input,1)

    }
})


function research(input, nbpage) {
    fetch(`http://www.omdbapi.com/?apikey=1ca1da21&s=${input}&page=${nbpage}`) /* clé 1 : 260740d0, clé 2 : 1ca1da21 */
    .then(response => {
    if (!response.ok) {
        throw new Error('uze')  
    }
    return response.json();
})
    .then(data => {
        if (bouton_here == true){
            let div_button = document.getElementById("div_button")
            body.removeChild(div_button)
        }
        if (data.Response == "False") {
            container.innerHTML="";
            let div_error = document.createElement("div");
            div_error.textContent=data.Error;
            container.appendChild(div_error);
            throw new Error(data.error)
        }  
        else {
          return data  
}})
    .then(data => {
        if (nbpage == 1){
            container.innerHTML=""
        }
        let no_poster_movie_amount = 0
        for (let i = 0; i < data.Search.length; i++) {
            if (data.Search[i].Poster != "N/A"){
            let div = document.createElement("div");
            div.classList.add("movie_box");


            let first_part_box = document.createElement("div");
            first_part_box.classList.add("first_part_box");
            first_part_box.classList.add("box_part");
            
            let movie_poster = document.createElement("img");
            movie_poster.classList.add("movie_poster");
            movie_poster.src = data.Search[i].Poster;

            let movie_title = document.createElement("div");
            movie_title.classList.add("movie_title");
            movie_title.textContent = data.Search[i].Title;

            first_part_box.appendChild(movie_poster);
            first_part_box.appendChild(movie_title);
            div.appendChild(first_part_box);

            
            let second_part_box = document.createElement("div");
            second_part_box.classList.add("second_part_box")
            second_part_box.classList.add("box_part");

            let movie_plot = document.createElement("div");
            movie_plot.classList.add("movie_plot");

            let plot_title = document.createElement("div");
            plot_title.textContent = "Plot :";

            let plot = document.createElement("div");
            fetch(`http://www.omdbapi.com/?apikey=1ca1da21&t=${data.Search[i].Title}`)  /* clé 1 : 260740d0, clé 2 : 1ca1da21 */
            .then(response => {
                if (!response.ok) {
                    throw new Error('uze')  
                }
                return response.json();
            })
            .then(data => {
                plot.textContent = data.Plot;
                if (data.Plot == "N/A"){
                    plot.textContent = "No plot available"
                }
            })
            .catch(error => {
                console.log(error)
            })
            movie_plot.appendChild(plot_title);
            movie_plot.appendChild(plot);

            let see_more_button = document.createElement("button");
            see_more_button.classList.add("see_more_button");
            see_more_button.textContent = "See more";

            let link = document.createElement("a");
            link.href = `movie.html?Id=${data.Search[i].imdbID}`;

            link.appendChild(see_more_button);

            second_part_box.appendChild(movie_plot);
            second_part_box.appendChild(link);

            div.appendChild(second_part_box)

            container.appendChild(div)
        }

            else{
                no_poster_movie_amount+=1
            }

    }
    if (data.totalResults/10 > nbpage){
        let div_button = document.createElement("div");
        div_button.id="div_button";
        let bouton_next = document.createElement("button");
        bouton_next.classList.add("bouton_next");
        let bouton_next_div = document.createElement("div")
        bouton_next_div.textContent="NEXT";
        bouton_next.appendChild(bouton_next_div);
        div_button.appendChild(bouton_next);
        body.appendChild(div_button);
        bouton_next.onclick = function(){
            nbpage+=1
            bouton_here=true
            research(input, nbpage)
            
        }
    }
    if (no_poster_movie_amount == data.Search.length){
        let div = document.createElement("div");
        if (nbpage == 1){
            div.textContent="No movie found!";
        }
        else{
            div.textContent="No more movie found!";
        }
        container.appendChild(div);
        throw new Error("Movie not found!")
    }
})
    .catch(error => {
        console.log(error)
    })
}

