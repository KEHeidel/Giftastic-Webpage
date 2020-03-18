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
      

  });