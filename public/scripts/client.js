/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Identify the date and time of the tweet
const tweetDate = new Date();
//Convert the tweet's timestamp to a human-readable format.
//This method takes two arguments: the date and time of the tweet, and the current time.
//const timeAgo = timeago.format(tweetDate, new Date());

const createTweetElement = function (obj) {
  console.log(obj);
  const str = `<article class="tweet">
            <div class="tweet-body">
              <div class="upper-left">
                <img
                  class="image"
                  src="${obj.user.avatars}"
                  alt="Avatar"
                />
                <p class="name">${obj.user.name}</p>
              </div>
              <p class="handle">${obj.user.handle}</p>
            </div>
            <p class="tweet-content">${obj.content.text}</p>
            <footer class="tweet-footer">
              <div>${timeago.format(obj.created_at)}</div>

              <div>
                <i id="flag" class="fa-solid fa-flag"></i>
                <i id="retweet" class="fa-solid fa-retweet"></i>
                <i id="like" class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`;
  return str;
};

const renderTweets = function (tweets) {
  // loops through tweets
  for (const element of tweets) {
    // calls createTweetElement for each tweet
    $("#tweets-container").append(createTweetElement(element));
  }
  // takes return value and appends it to the tweets container
};

//Emptying the container in index.htl file.
let container = document.getElementsByClassName("container");
container.innerHTML = "";

/*
Adding an event listener to all 'form' elements using jQuery's on() method.
When the form is submitted, the event handler function is called, and we're preventing the default behaviour of the form submission using event.preventDefault(). 
I can then add my own code inside the handler function to perform any desired actions instead of the default form submission behaviour.
*/
$(document).ready(function () {
  $("form").on("submit", function (event) {
    //Prevent the default form submission using the event.preventDefault() method.
    event.preventDefault();
    //Serialize the form data using the $(this).serialize() method, which converts the form data into a query string.
    let finalformData = $(this).serialize();
    console.log(finalformData);

    // The $.ajax() method to send the form data to the server as a POST request.
    // Form data send to server as a query string.
    //https://api.jquery.com/jQuery.post/
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: finalformData,
    });
  });
  /*----------------------------------------------------- */
  /*The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON. */
  function loadTweets() {
    $.ajax({
      url: "http://localhost:8080/tweets", //Make a GET request to http://localhost:8080/tweets.
      method: "GET",
      dataType: "json", //The response should be treated as JSON data.
      success: function (tweets) {
        //Do something with the array of tweets if the request succeeds.
        renderTweets(tweets); /* **I am not sure if this is correct.** */
      },
      error: function (xhr, status, error) {
        console.error("Error loading tweets:", error);
      },
    });
  }

  loadTweets();
});
