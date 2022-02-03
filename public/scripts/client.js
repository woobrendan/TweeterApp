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

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p>${escape(tweetData.content.text)}</p>
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
    const indivTweet = createTweetElement(tweet)
    $('.container').append(indivTweet)
  }
}

//Doc on ready
$(() => {
  
  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'JSON'
    }).then((arrOfTweets) => {
      renderTweets(arrOfTweets);
    })
  }
  loadTweets();
  
  
  //on form submit of new tweet
  $('.new-tweet-form').on('submit', function(event){
    event.preventDefault();
    const tweetText = $(this).serialize();

    if (tweetText.length < 6) {
      alert('Tweet cannot be empty')
    } else if (tweetText.length > 145) {
      alert('Tweets must be under 140 characters.')
    } else {

      //post new tweet info to /tweets route, remove then load all tweets including new
      $.post('/tweets/', tweetText).then(() => {
        $('.tweet-container').remove()
        loadTweets();
      })
    }
    
  })
});

//Code to grab the current user info for posted tweet

// const username = $('.profile-header h2').html();
// let imgSource = $('.profile-header img').parent().html().split('\"');
// let tweetString = tweetText.substring(5).replace('%20', ' ');
// let newTweet = [ {
//   "user": {
//       name: username,
//       avatars: imgSource[1],
//       handle: `@${username.split(' ').join('')}`
//   },
//   content: {
//     text: tweetString
//   },
//   created_at: Date.now()
//   }
// ]
// renderTweets(newTweet);