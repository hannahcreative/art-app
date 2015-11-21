// 1. Create nampspace for app
var artApp = {};

// 2. Store API key and endpoint in variables
artApp.key = 'GMv5Je5N';
artApp.endpoint = 'https://www.rijksmuseum.nl/api/en/collection/';

// 2. Make function to fetch the art results
artApp.getArt = function(searchTerm) {
  $.ajax({
    url : artApp.endpoint,
    dataType : 'jsonp', // tell jQuery to expect jsonp
    type : 'GET',
    
    // (the data property specifies the parameters that come along for the ride)
    data : {
      key : artApp.key,
      format : 'jsonp', //ask the API for JSONP
      q : searchTerm,
      imgonly : true // this works sometimes, but there's a prob with the API - see failsafe below
    },
    success : function(response) { //pass the 'success function' a parameter, then use to call below 
      console.log("Got the data, going to send it to displayArt");
      artApp.displayArt(response.artObjects);
    } 
  });
}

// 3. Make a function to display the results 
artApp.displayArt = function(pieces) {
  console.log("Hurray, we've made it to the display art function!");
  console.log(pieces);
  
  // Clear results each time a new search is performed
  $('#artwork').html('');
  
  // Loop over pieces, and create HTML for each one of them
  pieces.forEach(function(piece) {
    
    // Failsafe for image check
    if(!piece.webImage) {
      return;
      } 

    // Create the HTML for the piece (using the ES6 method of 'template strings')
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


// 4. Create a search box (form with input and submit button) that will allow users to search for whatever they want

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

// *** implement TWO additional options from the docs (such as: a dropdown for 'material', or the 'maker', or filter for hexcode with HTML5 colour picker, slider to limit number of shown, checkbox for only showing top pieces.)