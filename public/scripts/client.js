/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const createTweetElement = function (obj) {
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
    //Emptying the container in index.html file.
    $("#tweets-text").empty();
    // loops through tweets
    for (let element of tweets) {
      // calls createTweetElement for each tweet
      $("#tweets-container").prepend(createTweetElement(element));
    }
    // takes return value and appends it to the tweets container
  };

  /*The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON. */
  function loadTweets() {
    return $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((response) => {
      renderTweets(response);
    });
  }

  const isTweetValid = function (data) {
    const $tweetText = data;
    const size = $tweetText.length;
    if (size <= 0) {
      return { status: false, message: "Your tweet is empty!" };
    } else if (size > 140) {
      console.log(size);
      return { status: false, message: "Your tweet is too long!" };
    } else {
      return { status: true };
    }
  };

  $("form").on("submit", function (event) {
    //Prevent the default form submission using the event.preventDefault() method.
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    console.log("testing testing 123");
    const tweetFailedMessage = isTweetValid(tweetText).message;
    if (tweetFailedMessage) {
      return alert(tweetFailedMessage);
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
      })
        .then(() => {
          $("#tweet-text").val("");
          return loadTweets();
        })
        .catch((error) => {
          alert("Somthing went wrong!!");
          console.error(error);
        });
    }
  });

  loadTweets();
});
