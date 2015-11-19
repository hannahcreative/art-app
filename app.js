// 1. We need a namespace for our app
var artApp = {};

// 1.5 Store our API key in a variable - also store end point in a variable
artApp.key = 'GMv5Je5N';
artApp.endpoint = 'https://www.rijksmuseum.nl/api/en/collection/';

// 2. We need a function to fetch the art results
artApp.getArt = function(searchTerm) {
  $.ajax({
    url : artApp.endpoint,
    dataType : 'jsonp', // we tell jQuery to expect jsonp
    type : 'GET',
    // The data property specifies the parameters that come along for the ride
    data : {
      key : artApp.key,
      format : 'jsonp', //we ask the API for jsonp
      q : searchTerm,
      imgonly : true // this works most of the time
    },
    success : function(response) {
      console.log("Got the data, going to send it to displayArt");
      artApp.displayArt(response.artObjects);
    } 
  });
}

// 3. We need a function to display the results 
artApp.displayArt = function(pieces) {
  console.log("We made it to the display art function! :)");
  console.log(pieces);
  // Clear out anything that was there from a previous search
  $('#artwork').html('');
  // We need to loop over pieces, and create the HTML for each one of them
  pieces.forEach(function(piece) {
    
    //check if it doesn't have an image
    if(!piece.webImage) {
      return; //skip JUST this one piece
    }

    // Create the HTML for the piece (using the fancy ES6 method of 'template strings')
    var pieceHTML = `
    <div class="piece">
      <img src="${piece.webImage.url}" alt="${piece.title}">
      <h2>${piece.longTitle}</h2>
      <p class="artist">${piece.principalOrFirstMaker}</p>
    </div>
    `;
    $('#artwork').append(pieceHTML);
  }); //end forEach() 

  $('form').on('submit', function(e){
      e.preventDefault();
      var artSearch = $('input').val();
      artApp.getArt(artSearch);
  });

} //end displayArt()

// For you
// 1. Create a search box (form with input and submit button) that will allow users to search for whatever they want - simiar to to-do app and grocery getter

artApp.init = function(){
  $('form').on('submit', function(e){
        e.preventDefault();
        var artSearch = $('input').val();
        artApp.getArt(artSearch);
    });
};

$(document).ready(function(){
  artApp.init();
});

// 2. When done that - implement TWO additional options from the docs (such as: a dropdown for 'material', or the 'maker', or filter for hexcode with HTML5 colour picker, slider to limit number of shown, checkbox for only showing top pieces.)