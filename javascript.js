$(document).ready(function() {
  // variable for the array of games and user input
  var games = [
    "Final Fantasy XIV",
    "World of Warcraft",
    "Diablo III",
    "Horizon: Zero Dawn",
    "Fallout 4",
    "Overwatch",
    "God of War",
    "League of Legends",
    "The Witcher 3",
    "Destiny 2"
  ];

  var searchinfo = "";

  // variables for pulling info from API
  var apikey = "tvw4dJZXleyecwz1WsXqH65PK61XKnHD";
  var apilimit = 10;
  var apioffset = 0;
  var apirating = "PG";
  var apilang = "en";

  // function to draw gif button list
  function renderButtons() {
    $(".gifarray").empty();
    for (var i = 0; i < games.length; i++) {
      var button = $("<button>");
      button.attr("data-name", games[i]);
      button.text(games[i]);
      button.on("click", function() {
        searchinfo = $(this).attr("data-name");
        display();
      });
      $(".gifarray").append(button);
      $(".gifarray").attr("data-name", games[i]);
    }
  }

  // function to display images in the image gallery
  function display() {
    event.preventDefault();
    $(".gifimg").empty();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + searchinfo + "&limit=" + apilimit + "&offset=" + apioffset + "&lang=" + apilang;

    $.when(
      $.ajax({
        url: queryURL,
        method: "GET"
      })
    ).then(function(response) {
      // detecting no return searches
      if (response.pagination.total_count == 0) {
        var itemIndex = games.indexOf(searchinfo);

        if (itemIndex > -1) {
          games.splice(itemIndex, 1);
          renderButtons();
        }
      }
      // save response from API call to a variable
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var newGames = $("<div class='game-name'>");
        var gifRating = $("<body>").text(
          "Rating: " + results[i].rating.toUpperCase()
        );
        var gifTitle = $("<body>").text(
          "Title:  " + results[i].title.toUpperCase()
        );
        var gifURL = results[i].images.fixed_height_still.url;
        var gif = $("<img>");
        gif.attr("src", gifURL);
        gif.attr("data-still", results[i].images.fixed_height_still.url);
        gif.attr("data-animate", results[i].images.fixed_height.url);
        gif.attr("data-state", "still");
        gif.addClass("animate-gif");
        
        newGames.prepend(gif);
        newGames.append(gifRating);
        newGames.append(gifTitle);

        $(".gifimg").prepend(newGames);
      }
    });
  }
  // function for animating gif
  function gifPlay() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  // function to add games to the games array
  function addgames(name) {
    if (!games.includes(name)) {
      games.push(name);
      renderButtons();
    }
  }
 
    // on click event handlers
    $("#gifsearch").on("click", function(event) {
      event.preventDefault();

      var input = $("#inputText")
        .val()
        .trim();
      addgames(input);
    });

    $(document).on("click", ".animate-gif", gifPlay);

    renderButtons();
  });
