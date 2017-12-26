'use strict';
/* global $ */



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
