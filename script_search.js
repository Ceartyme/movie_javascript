let bouton= document.getElementById("search_button");
let lastresearch = "";
let container = document.getElementById("container");

bouton.addEventListener("click", function(){
    let input = document.getElementById("search_input").value;
    if(input != lastresearch){
        research(input)
        lastresearch = input;
    }
})


function research(input) {
    fetch(`http://www.omdbapi.com/?apikey=260740d0&s=${input}`)
    .then(response => {
    if (!response.ok) {
        throw new Error('uze')  
    }
    return response.json();
})
    .then(data => {
        if (data.Response == "False") {
            container.innerHTML=""
            console.log('test')
            let div_error = document.createElement("div");
            div_error.textContent=data.Error;
            container.appendChild(div_error);
            throw new Error(data.error)
        }  
        else {
          return data  
}})
    .then(data => {
        container.innerHTML=""
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
            fetch(`http://www.omdbapi.com/?apikey=260740d0&t=${data.Search[i].Title}`)
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

            second_part_box.appendChild(movie_plot);
            second_part_box.appendChild(see_more_button);

            div.appendChild(second_part_box)

            container.appendChild(div)
            }
            else{
                no_poster_movie_amount+=1
            }
            }
        if (no_poster_movie_amount == data.Search.length){
            let div = document.createElement("div");
            div.textContent="Movie not found!";
            container.appendChild(div);
        }
    }

)
    .catch(error => {
        console.log(error)
    })
}