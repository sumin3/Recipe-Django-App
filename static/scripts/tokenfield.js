$(document).ready(function () {
  /* tokenfileld (bootstrap): autocomplete input */
  $('#tokenfield').tokenfield({
    autocomplete: {
      source: ['egg', 'tomato', 'beef steak', 'potato'],
      delay: 100
    },
    showAutocompleteOnFocus: true
  })

  let list_recipe = [];
  /* get default ingredient input value */
  list_recipe[0] = $('INPUT').val();

  /* add new ingredient input value */
  $('INPUT').on('tokenfield:createtoken', function (e) {
    list_recipe.push(e.attrs.value);
    filter(list_recipe);
  })

  /* remove ingredient value */
  $('INPUT').on('tokenfield:removedtoken', function (e) {
    list_recipe.splice(list_recipe.indexOf(e.attrs.value), 1);
    filter(list_recipe);
  })

  /* get match recipes by list of user ingredient input */
  function filter(list_recipe) {
    $('#recipe').empty();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/api/match_recipe/',
      contentType: 'application/json',
      data: JSON.stringify({ 'listIngredient': list_recipe }),
      success: function (res) {
        if (res.length === 0) {
          $('#recipe').append('<h5 style="padding-left: 23px;" class="card-text">No results were found. Try another search </h5>');
        }

        for (let idx = 0; idx < res.length; idx++) {
          $('#recipe').append('<div class="col-md-6">' +
            '<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">' +
            '<div class="col-auto">' +
            '<img class="card-img-top" src=' +
            res[idx].img_url +
            ' alt="recipe">' +
            '</div>' +
            '<div class="col p-4 d-flex flex-column position-static">' +
            '<strong class="d-inline-block mb-2 text-primary">' +
            res[idx].name +
            '</strong>' +
            '<h3 class="mb-0">Ingredients</h3><ul class="Ingredients"></ul><h3 class="mb-0">Directions</h3>' +
            '<ul class="list-group list-group-flush Directions"></ul>' + '</div></div></div></div>');
          for (let ingredient of res[idx].ingredients) {
            $('.Ingredients').append('<li class="mb-1 text-muted">' +
              ingredient + '</li>');
          }
          for (let direction of res[idx].directions) {
            $('.Directions').append('<li class="list-group-item">' +
              direction + '</li>'
            );
          }
        }

      }
    })
  }
});