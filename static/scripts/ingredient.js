/* handle onclick ingredient card event:
  bring user to corresponding page based on ingredient id
*/
$(document).ready(function () {
  $('.searchbutton').on('click', function () {  
    window.location.assign("/search/" + this.id);
    });
})