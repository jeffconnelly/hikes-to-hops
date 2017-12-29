'use strict';
/* global $ */


//Api Call functions
let url = 'https://www.hikingproject.com/data/get-trails';
const key = '200199905-b7938b4b6909a70a6393d4285aca8a47';
let lat = '';
let long = '';

//Display functions for render
function displayTrailsData(data) {
  console.log(data);
  const results = data.trails.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

function displayBreweryData(data) {
  console.log(data);
  let randomItem = data.data[Math.floor(Math.random()*data.data.length)];
  console.log(randomItem);
  // let randomItem = results[Math.floor(Math.random()*results.length)];
  // $('.js-search-results').html(results);
}

//Render functions

function renderResult(data) {
  console.log(data);
  

  if (data.imgSmallMed !== '') {
    // let source = $(data.imgSmallMed).attr('src');
    // console.log(source);
    // source = this.imgSmallMed;
    // console.log(source);
    console.log(data.imgSmallMed);

    return ` 

    <div class="js-result">
    <h3>${data.name}</h3>
    <p>${data.summary}</p>
    <img class="trails-thumbnail js-thumbnail" src="${data.imgSmallMed}">

    <button type="button" class="js-brewify-btn">Brewify!</button>


    <div class="lightbox hide">
        <img class="thumbnail js-thumbnail" src="${data.imgSmallMed}">
        <div class="modal" class="hide">
          <span class="close js-close"> &times; </span>
          <img class="modal-content-img" src="">
          <img class="modal-content-img-2" src="https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=1050&q=80">
          <p class="modal-description">Boom! We've paired your trip to <span class="modal-description-highlight">${data.name}</span> with this brewery for your journey's end!</p>
        </div>   
      </div>
    </div>
    `;
  }
}

function renderBreweryResult(data) {

  // return `
  // <span>${data.brewery.id}</span>
  // `;

  // if (data.brewery.images.medium !== undefined) {

}

// return `
// <div class="js-result">
//   <span>${data.brewery.name}</span>
// </div>
// `
// <img class="brew-thumbnail js-thumbnail2" src="${data.brewery.images.medium}">




//jQuery scroll content
let position = $('.result-content').offset().top;


//Event listeners
function watchSubmit () {
  $('.location').submit(event => {
    event.preventDefault();
    position = $('.result-content').offset().top; $('HTML, BODY').animate({ scrollTop: position }, 1000); 
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
        displayBreweryData(brewData);
      })
      .catch(function(err){
        console.log('This went wrong:', err);
      });

    let source = $(event.target).closest('.js-result').find('.js-thumbnail').attr('src');
    console.log(source);
    $('.modal-content-img').attr('src', source);

    let source2 = $(event.target).closest('.js-result').find('h3').text();

    $('.modal-description-highlight').text(source2);
    $('.lightbox').show();
    $('.modal').show();
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

function lightBoxCloseListener() {
  $('.js-search-results').on('click', '.js-close', function(event) {
    $('.modal').hide();
    $('.lightbox').hide();
  });
}


$(watchSubmit);
$(watchBrewifySubmit);
$(lightBoxCloseListener);