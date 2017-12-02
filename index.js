const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const KEY = "AIzaSyAl6ccLDZMyS0A29z-jG4HwaO8e1OMAXkQ";



function getDataFromApi(searchTerm, callback) {
	//take the search term the user inputted and run a function to parse the data into what is needed:
	//Thumbnail image, Title, Name of uploader, date uploaded, brief description?

	const settings = {
        url: YOUTUBE_SEARCH_URL,
        data: {
            part: 'snippet',
            key: KEY,
            q: searchTerm
    },
    	jsonp: 'callback',
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
     				 console.log("success", data);
     			displayYoutubeSearchData(data);
    },
        error: function () {
            alert("Error loading video");
        }
        

    };
    $.ajax(settings);
}
	/*const settings = {
		url: YOUTUBE_SEARCH_URL,
		data: {
			part: 'snippet',
			key: KEY,
			q: searchTerm,
			per_page: 5
		},
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: callback,
		/*error: errorFunction() {
					alert("Error loading video");
				}		
		*/
/*

	};
	$.ajax(settings);


}
*/

function renderResult(result) {
	//create a new div element using the data from the API call REMEMBER: this is just one item

	return `
		<div class="css-search-result">
			<span class="js-results-thumbnail">
				<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}" alt="${result.snippet.title}">
			</span></a>
			<span class="js-result-title css-result-title"><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a></span>
			<span class="js-result-description css-result-description">${result.snippet.description}</span>
		</div> 
		`;
}

function displayYoutubeSearchData(data) {
	//
	const results = data.items.map((item, index) => renderResult(item));
	$('.js-search-results').html(results);
}


function watchForInput() {
	//This function will watch for users submitting their search terms then return a list of results (with thumbnails!)
	$(".js-search-form").on("submit", event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();

		queryTarget.val("");
		getDataFromApi(query, displayYoutubeSearchData);

	});
}

$(watchForInput);

