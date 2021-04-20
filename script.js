/* const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.status === 200){
        if(xhr.readyState === 4){
            console.log(JSON.parse(xhr.response));
        }
    }else{
        console.log(xhr.responseText);
    }
}

xhr.open('get','http://www.omdbapi.com/?apikey=9cea0bf4&s=avengers');
xhr.send(); */

/* fetch('http://www.omdbapi.com/?apikey=9cea0bf4&s=avengers')
    .then(response => response.json())
    .then(response => console.log(response)); */

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=9cea0bf4&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      console.log(response);
      let cards = "";
      movies.forEach((m) => (cards += showCards(m)));
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      //ketika tombol detail diklik

      const modalDetailButton = document.querySelectorAll(
        ".modal-detail-button"
      );
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbID = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=9cea0bf4&i=" + imdbID)
            .then((response) => response.json())
            .then((m) => {
               const movieDetail = showMovieDetails(m);
                    const modalBody = document.querySelector('.modal-content');
                    modalBody.innerHTML = movieDetail; 

            });
        });
      });
    });
});

function showCards(m) {
  return `<div class="col-md-4 my-5">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <button
          type="button"
          class="btn btn-primary modal-detail-button"
          data-bs-toggle="modal"
          data-bs-target="#movieDetailModal"
          data-imdbid="${m.imdbID}"
        >
          Show Detail
        </button>
      </div>
    </div>
  </div>`;
}

function showMovieDetails(m) {
  return `<div class="modal-header">
  <h5 class="modal-title" id="movieDetailModal">${m.Title}</h5>
  <button
    type="button"
    class="btn-close"
    data-bs-dismiss="modal"
    aria-label="Close"
  ></button>
</div>
<div class="modal-body">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">${m.Year}</li>
          <li class="list-group-item">${m.Genre}</li>
          <li class="list-group-item">${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="modal-footer">
  <button
    type="button"
    class="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Close
  </button>
</div>`;
}
