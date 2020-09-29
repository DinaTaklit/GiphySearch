/******** Live Search *******/

const ENTER = 13;

// Search with each keyup => after each written letter
document.querySelector('.search-giphy').addEventListener('keyup', function(){
    const searchTerm = this.value.toLowerCase();
    searchGiphy(searchTerm);
});

// Search once the user hit enter
$('input[class=live-search-box]').keydown(function(e){
  if(e.keyCode == ENTER){
    e.preventDefault();
    e.stopPropagation();
    const searchTerm = this.value.toLowerCase();
    searchGiphy(searchTerm);
  }
});

// Search if the user click on the search button
document.querySelector(".search-button").addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-giphy').value.toLowerCase();
    searchGiphy(searchTerm);
});


/***************************/



/************ API Call*********/
// Card prototype to create Card object
function Card(src){
    this.src = src;
}

// The function that call Gipy API 
function searchGiphy(searchQuery) {
    const url =  "https://api.giphy.com/v1/gifs/search?api_key=FUgycQAFWpzERYNPNoZ93sVHEli7b11Y&q=" + searchQuery;
    
    // Creat new XMLHTTPRequest
    let GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET',url);
    GiphyAJAXCall.send();

    // Add event listner on load
    GiphyAJAXCall.addEventListener('load', function(data){
        let actualData = data.target.response; // Get the response from the data
        fillGiphyWrapper(actualData); // Call the function that will fill Giphy result
    });
}

// This functions create new cards and add it to the images-wrapper
function fillGiphyWrapper(response){
    // Turn the response into javascript object
    response = JSON.parse(response);
    // drill down to the data array
    var images = response.data;

    // select the wrapper that will hold this images from the DOM
    var images_wrapper = document.querySelector('.images-wrapper .row') 
    images_wrapper.innerHTML = ""; // init the wrapper after each seach
    images.forEach(image => {
        // choose one of the provided images
        let src = image.images.fixed_height.url;

        // Add the new image
        let card = new Card(src);
        pushCardToDOM(images_wrapper,card);
    });
}

// This function role is to create a new card element and add the 
// image with it is src from the card object then append it to the images-wrapper
function pushCardToDOM(cards_wrapper,card){
    // create the card using innerHTML. Check here for more details
    // http://garystorey.com/2017/02/27/three-ways-to-create-dom-elements-without-jquery/

    // Create a temporary div that will be used to create a card then later we will append only card div 
    var cardElement= document.createElement('div'); 
    var cardString=
    '<div class="card">'+
        '<img class="img-fluid rounded" src='+card.src+'>'+   
    '</div>'
    cardElement.innerHTML=cardString;
    cards_wrapper.appendChild(cardElement.firstChild);
    }


// searchGiphy('cat');




