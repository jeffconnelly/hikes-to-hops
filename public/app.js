'use strict';
/* global $ */






//Api Call functions
let url = 'https://www.hikingproject.com/data/get-trails';
const key = '200199905-b7938b4b6909a70a6393d4285aca8a47';
let lat = '';
let long = '';
// fetch('http://localhost:8080/?')
//   .then(res => {
//     console.log(res);
//     return res;
//   });

// let fetchInfo = {
//   method: 'GET',
//   key: '200199905-b7938b4b6909a70a6393d4285aca8a47',
//   lat: lat,
//   long: long
// };
let trailsData = [];





//Display function for render
function displayTrailsData(data) {
  console.log(data);
  const results = data.trails.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

//Render function
function renderResult(data) {
  console.log(data);

  if (data.imgSmallMed !== '') {
    return ` 
    <h3>${data.name}</h3>
    <p>${data.summary}</p>
    <img class="trails-thumbnail js-thumbnail" src="${data.imgSmallMed}">
    `;
  }
}

//Event listeners
function watchSubmit () {
  $('.location').submit(event => {
    event.preventDefault();
    let searchTarget = $(event.currentTarget).find('.location-input');
    let searchTerm = searchTarget.val();
    console.log(searchTerm);
    searchTarget.val('');
    handleSubmit(searchTerm);
    console.log(lat);
    // lat = results[0].geometry.location.lat();
    // long = results[0].geometry.location.lng();
    // lat = lat.toString();
    // long = long.toString();
    // url = `
    // https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=200199905-b7938b4b6909a70a6393d4285aca8a47
    // `;
    // function trailsFetch(url) {

    // }

    fetch(`
    https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=200199905-b7938b4b6909a70a6393d4285aca8a47
    `)
      .then(res => {
        return res.json();
      }).then(trailsData => {
        console.log(trailsData);
        console.log('fetching data');
        displayTrailsData(trailsData);
      })
      .catch(function(err){
        console.log('This went wrong:', err);
      });
  });
}

function handleSubmit (searchTerm) {
  console.log(searchTerm);
  let geocoder =  new google.maps.Geocoder();
  geocoder.geocode( { 'address': `${searchTerm}`}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('location : ' + results[0].geometry.location.lat() + ' ' +results[0].geometry.location.lng());
      alert('location : ' + results[0].geometry.location.lat() + ' ' +results[0].geometry.location.lng()); 
      lat = results[0].geometry.location.lat();
      long = results[0].geometry.location.lng();
      lat = lat.toString();
      long = long.toString();
      console.log(lat);
    } else {
      alert('Something got wrong ' + status);
    }
  });
}

// $('#btn').click(function(){
//   let geocoder =  new google.maps.Geocoder();
//   geocoder.geocode( { 'address': 'miami, us'}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       alert('location : ' + results[0].geometry.location.lat() + ' ' +results[0].geometry.location.lng()); 
//     } else {
//       alert('Something got wrong ' + status);
//     }
//   });
// });



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
