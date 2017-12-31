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

function createBreweryItem(data) {
  console.log(data);
  let randomItem = data.data[Math.floor(Math.random()*data.data.length)];
  // $('.js-search-results').html(results);
  return randomItem;
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

    <div class="js-result trail-result">
    <h3>${data.name}</h3>
    <p>${data.summary}</p>
    <img class="trails-thumbnail js-thumbnail" src="${data.imgSmallMed}">

    <button type="button" class="js-brewery-btn btn btn-white btn-animated">Pair your brewery!</button>


    <div class="lightbox hide">
        <img class="thumbnail js-thumbnail" src="${data.imgSmallMed}">
        <a href="${data.url}" class="grab-url"></a>
        <div class="modal" class="hide">
          <span class="close js-close"> &times; </span>
          <img class="modal-content-img" src="">
          <img class="modal-content-img-2" src="https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=1050&q=80">
          <p class="modal-description hide">Boom! We've paired your trip to <a href="" target="_blank" class="href-here-2"> <span class="modal-description-highlight">${data.name}</span></a> with <a href="" target="_blank" class="href-here"><span class="random-brewery-description modal-description-highlight-2"></span></a> for your journey's end!</p>
        </div>   
      </div>
    </div>
    `;
  }
}

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

//Needs CORS enabled to work!
function watchBrewerySubmit () {
  $('.js-search-results').on('click', '.js-brewery-btn', event => {
    event.preventDefault();
    console.log('clicked!');
    fetch(`
    http://api.brewerydb.com/v2/search/geo/point/?key=a46cc55cb2a68b32c91f696bc888b5e5&lat=${lat}&lng=${long}&radius=5
    `)
      .then(res => {
        return res.json();
      }).then(brewData => {
        console.log(brewData);
        return createBreweryItem(brewData);
      })
      .then(randomItem => {
        console.log(randomItem);
        console.log(randomItem.brewery.website);
        $('.random-brewery-description').text(randomItem.brewery.name);
        $('.href-here').attr('href', randomItem.brewery.website);
      })
      .catch(function(err){
        console.log('This went wrong:', err);
      });

    let source = $(event.target).closest('.js-result').find('.js-thumbnail').attr('src');
    console.log(source);
    $('.modal-content-img').attr('src', source);

    let source2 = $(event.target).closest('.js-result').find('h3').text();

    let source3 = $(event.target).closest('.js-result').find('.grab-url').attr('href');
    console.log(source3);
    $('.href-here-2').attr('href', source3);
    $('.modal-description-highlight').text(source2);
    $('.lightbox').show();
    $('.modal').show();
    $('.modal-description').show();
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
$(watchBrewerySubmit);
$(lightBoxCloseListener);