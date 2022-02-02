/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1643571093563
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const createTweetElement = (tweetData) => {
  const layout = `
  <section class="tweet-container">
    <header class="tweet-header">
      <div>
        <img src="${tweetData.user.avatars}">
            <h3>${tweetData.user.name}</h3>
      </div>
      <h4>${tweetData.user.handle}</h4>
    </header>
    <article class="tweet">
      <p>${tweetData.content.text}</p>
    </article>
    <footer>
      <h6>${timeago.format(tweetData.created_at)}</h6>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </section>`;
      
return layout;
      
};

const renderTweets = function(tweetArr) {
  for (let tweet of tweetArr) {
    console.log(tweet)
    const indivTweet = createTweetElement(tweet)
    $('.container').append(indivTweet)
  }
}

//Doc on ready
$(() => {

  //on form submit of new tweet
  $('.new-tweet-form').on('submit', function(event){
    event.preventDefault();
    const tweetText = $(this).serialize();
    console.log(tweetText)
    $.post('/tweets/', tweetText).then(() => {
  
    })
  })
});