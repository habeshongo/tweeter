$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    // console.log($(this).val());
    let charCount = $(this).val().length;
    let remainingCharCount = 140 - charCount;
    let counterElement = $(this).closest("form").find(".counter");
    if (remainingCharCount > 0 && remainingCharCount < 140) {
      $(".counter").css("color", "black");
    } else {
      $(".counter").css("color", "red");
    }
    counterElement.text(remainingCharCount);
  });
});
