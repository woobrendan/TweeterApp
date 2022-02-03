$(document).ready(function() {

  $('#tweet-text').on('input', function() {

    // console.log("this.parent is: ", this.parentNode.childNodes[5].childNodes[3].innerHTML)
    
    let messageVal = $(this).val().length;

    //input tweet is over 140 char
    if (Number(messageVal) > 140) {
      $('.counter').css('color', 'red');
      $('.counter').html(140 - messageVal);
    } else {
      $('.counter').css('color', 'inherit');
      $('.counter').html(140 - messageVal);
    }
  });
});

