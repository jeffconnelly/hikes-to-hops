'use strict';
/* global $ */






//Api Call functions
const url = 'https://www.hikingproject.com/data/get-trails';
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

fetch('https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200199905-b7938b4b6909a70a6393d4285aca8a47')
  .then(res => {
    return res.json();
  }).then(res => {
    console.log(res);
    trailsData = res;
    console.log(trailsData);
    return trailsData;
  }).then(trailsData => {
    console.log(trailsData);
    displayTrailsData(trailsData);

  });



//Display function for render
function displayTrailsData(data) {
  console.log(data);
  const results = data.trails.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

//Render function
function renderResult(data) {
  console.log(data);
  return ` 
  <img class="trails-thumbnail js-thumbnail" src="${data.imgSmall}">

  `;
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
