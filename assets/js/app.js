$(document).ready(function(){

  console.log('is it workin');

    var shows = ["The Office", "Bobs Burgers", "Friends", "New Girl", "It's Always Sunny in Philadelphia"];

    function startShow () {
        shows = $(this).attr("src");
        // var queryURL = "https:api.giphy.com/v1/gifs/search?api_key=LcJytGEKV6AKmIud1ZiLwqA1hiqyAxiz&q=" + shows + "&limit=10&rating=PG";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shows + "&api_key=LcJytGEKV6AKmIud1ZiLwqA1hiqyAxiz&limit=10&rating=PG";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var showDiv = $("<div class='col-6'>");
              var rate = $("<p>").text("Rating: " + results[i].rating);
              // console.log(gifrate);

              var showImage = $("<img>");

              var stills = results[i].images.fixed_height_still.url;
              var animates = results[i].images.fixed_height.url;

              showImage.attr("data-still", stills);
              showImage.attr("data-state", "still");
              showImage.attr("data-animate", animates);
              showImage.attr("src", stills);
              $("#shows-view").prepend(showDiv);
              showDiv.append(rate);
              showDiv.append(showImage);

            }
            $(document).on("click", 'img', function() {
              var status = $(this).attr('data-state');

              if (status === "still") {
                var toggle = $(this).attr("data-animate");
                $(this).attr('src', toggle);
                $(this).attr("data-state", "animated")
              } else {
                var toggle = $(this).attr("data-still");
                $(this).attr("src", toggle);
                $(this).attr("data-state", "still");
              }
            })

  
          });

    };

    function givenButtons() {
      $("#buttons-view").empty();
      for (var i = 0; i < shows.length; i++) {
        var btns = $("<button class='btn btn-outline-secondary m-1'>");
        btns.addClass("show-btn");
        btns.attr("src", shows[i]);
        btns.text(shows[i]);
        $("#buttons-view").append(btns);
      }
    }


    $("#add-show").on("click", function(event) {
      event.preventDefault();
      var add = $("#show-input").val().trim();
      shows.push(add);
      givenButtons();
      $("#show-input").val('');
    });

    givenButtons();

    $(document).on("click", ".show-btn", startShow);
});

