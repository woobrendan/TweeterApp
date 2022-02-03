/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const checkForError = (() => {
  let tweet = document.forms['new-tweet-form']['text'].value;
  if (!tweet || tweet.length > 140) {
    return true;
  } else return false;
});

const errorType = (() => {
  let errorTweet = document.forms['new-tweet-form']['text'].value;
  if (!errorTweet) {
    $('#error').html('⛔⛔ Tweets cannot be empty! ⛔⛔');
  } else {
    $('#error').html('⛔⛔ Tweets cannot be over 140 characters! ⛔⛔');
  }

});


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const layout = `
  <article class="tweet-container">
    <header class="tweet-header">
      <div>
        <img src="${tweetData.user.avatars}">
            <h3>${tweetData.user.name}</h3>
      </div>
      <h4>${tweetData.user.handle}</h4>
    </header>
    <div class="tweet">
      <p>${escape(tweetData.content.text)}</p>
    </div>
    <footer>
      <h6>${timeago.format(tweetData.created_at)}</h6>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
      
  return layout;
};

const renderTweets = function(tweetArr) {
  for (let tweet of tweetArr) {
    const indivTweet = createTweetElement(tweet);
    $('.tweets-container').prepend(indivTweet);
  }
};

//Doc on ready
$(() => {
  
  const loadTweets = function() {
    $('.tweets-container').empty();
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'JSON'
    }).then((arrOfTweets) => {
      renderTweets(arrOfTweets);
    });
  };
  loadTweets();
  
  //on form submit of new tweet
  $('.new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    // checkForError();
    const tweetText = $(this).serialize();

    if (!checkForError()) {
      $('#error').slideUp();
      $.post('/tweets/', tweetText).then(() => {
        loadTweets();
      });
    } else {
      errorType();
    }
  });
});
