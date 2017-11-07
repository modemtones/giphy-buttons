var topics = ["deal with it", "hotline wii", "bill murray", "thumbs up"];

function displayGifs() {
  var topic = $(this).attr("data-topic");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=UM0qL8HsBeVOGdazjwwvT6s2xnQV630f&limit=10&rating=PG-13";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var topicImage = $("<img>");
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");
      topicImage.addClass("gif");
      topicDiv.append(topicImage);
      topicDiv.append(p);
      $("#gifs-view").prepend(topicDiv);
    }
  });
}

function animateGifs() {
  var state = $(this).attr("data-state");
  console.log(state);

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

function renderButtons() {
  console.log("Rendering Buttons");
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.attr("type", "button");
    a.addClass("topic btn btn-primary");
    a.attr("data-topic", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topic = $("#topic-input")
    .val()
    .trim();
  topics.push(topic);
  renderButtons();
});

$(document).on("click", ".topic", displayGifs);

$(document).on("click", ".gif", animateGifs);

renderButtons();
