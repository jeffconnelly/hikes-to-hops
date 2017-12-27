'use strict';
/* global $ */






//Api Call functions
const url = 'http://localhost:8080/?';

// fetch('http://localhost:8080/?')
//   .then(res => {
//     console.log(res);
//     return res;
//   });

fetch('http://localhost:8080/?').then(function(response) {
  console.log(response);
});

// fetch(url)
//   .then(res => {
//     return res.json();
//   }).then(res => {
//     console.log(res.title);
//   });



//Event listeners
function watchSubmit () {
  $('.location').submit(event => {
    event.preventDefault();
    let searchTarget = $(event.currentTarget).find('.location-input');
    let searchTerm = searchTarget.val();
    console.log(searchTerm);
    searchTarget.val('');
  });
}



$(watchSubmit);

// search(query, success) {
//   const url = this._buildUrl(this.path, query);
//   return $.ajax({
//     type: 'GET',
//     url: url,
//     data: query,
//     success: success
//   });
// }
