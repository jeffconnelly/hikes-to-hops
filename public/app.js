'use strict';
/* global $ */


//Api Call functions
let url = 'https://www.hikingproject.com/data/get-trails';
const key = '200199905-b7938b4b6909a70a6393d4285aca8a47';
let lat = '';
let long = '';

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

    <button type="button" class="js-brewify-btn">Brewify!</button>
    `;
  }
}

function renderBrewery(data) {
  return `
  <img class="brew-thumbnail js-thumbnail2" src="${data.imgSmallMed}">
  `
}

//Event listeners
function watchSubmit () {
  $('.location').submit(event => {
    event.preventDefault();
    let searchTarget = $(event.currentTarget).find('.location-input');
    let searchTerm = searchTarget.val();
    searchTarget.val('');
    handleSubmit(searchTerm);
  });
}

function watchBrewifySubmit () {
  $('.js-search-results').on('click', '.js-brewify-btn', event => {
    event.preventDefault();
    console.log('clicked!');
    fetch(`
    http://api.brewerydb.com/v2/search/geo/point/?key=a46cc55cb2a68b32c91f696bc888b5e5&lat=${lat}&lng=${long}&radius=5
    `)
      .then(res => {
        return res.json();
      }).then(brewData => {
        console.log(brewData);

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
    lat = results[0].geometry.location.lat();
    long = results[0].geometry.location.lng();
    lat = lat.toString();
    long = long.toString();
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('location : ' + results[0].geometry.location.lat() + ' ' +results[0].geometry.location.lng());
      console.log(lat);
    } else {
      alert('Something got wrong ' + status);
    }
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
    return lat, long;
  });
}


$(watchSubmit);
$(watchBrewifySubmit);
