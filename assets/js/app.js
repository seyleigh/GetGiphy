$(document).ready(function(){

  console.log('is it workin');

    var shows = ["The Office", "Bobs Burgers", "Friends", "New Girl", "It's Always Sunny in Philadelphia"];

    function startShow () {
        $('#shows-view').empty();
        shows = $(this).attr("src");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shows + "&api_key=LcJytGEKV6AKmIud1ZiLwqA1hiqyAxiz&limit=10&rating=PG";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
              var showDiv = $("<div class='col-sm-8 col-lg-5 m-3'>");
              var rate = $("<p>").text("Rating: " + results[i].rating);

              var showImage = $("<img class='module-border-wrap'>");

              var stills = results[i].images.fixed_height_still.url;
              var animates = results[i].images.fixed_height.url;

              showImage.attr("data-still", stills);
              showImage.attr("data-state", "still");
              showImage.attr("data-animate", animates);
              showImage.attr("src", stills);
              $("#shows-view").prepend(showDiv);
              showDiv.append(showImage);
              showDiv.append(rate);

            }
            $('img').on("click", function() {
              var state = $(this).attr('data-state');

              if (state === "still") {
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
      for (var i = 0; i < shows.length; i++) {
        var btns = $("<button class='btn m-1'>");
        btns.addClass("show-btn");
        btns.attr("src", shows[i]);
        btns.text(shows[i]);
        $("#buttons-view").append(btns);
      }
    }
    // Tried to make input form submit on pressing enter/return but i couldnt get it to work and I'm brain dead now.
    // $('.input').keydown(function(e){
    //   e.preventDefault()
    //   var key = e.which;
    //   if (key === 13) {
    //     var add = $("#show-input").val().trim();
    //     shows = [];
    //     shows.push(add);
    //     givenButtons();
    //     $("#show-input").val('')
    //   }
    //   // if ($("#show-input").val() === ""){
    //   //   return;
    //   // } else { event.preventDefault();
    //   //   var add = $("#show-input").val().trim();
    //   //   shows = [];
    //   //   shows.push(add);
    //   //   givenButtons();
    //   //   $("#show-input").val('');}
    // });

    $("#add-show").on("click", function(event) {
      if ($("#show-input").val() === ""){
        return;
      } else { event.preventDefault();
        var add = $("#show-input").val().trim();
        shows = [];
        shows.push(add);
        givenButtons();
        $("#show-input").val('')
      };
    
    });

    givenButtons();

    $(document).on("click", ".show-btn", startShow);

});

