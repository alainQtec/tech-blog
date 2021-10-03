---
  layout: none
---

  $(document).ready(function () {
    'use strict';
    var search_field = $('.search-form__field'),
      search_results = $('.search-results'),
      toggle_search = $('.toggle-search-button'),
      close_search = $('.close-search-button');
    toggle_search.click(function (event) {
      event.preventDefault();
      $('.search-form-container').addClass('is-active');

      setTimeout(function () {
        search_field.focus();
      }, 500);
    });

    $('.search-form-container').on('keyup', function (event) {
      if (event.keyCode == 27) {
        $('.search-form-container').removeClass('is-active');
      }
    });

    close_search.click(function () {
      $('.search-form-container').removeClass('is-active');
    });

    var search_data = [
      {% for post in site.posts %}
        {
      "title": "{{ post.title | escape }}",
      "category": "{{ post.category }}",
      "tags": "{{ post.tags | join: ', ' }}",
      "url": "{{ site.url }}{{ site.baseurl }}{{ post.url }}",
      "date": "{{ post.date }}",
      "thumbnail": "{{ site.url }}{{ site.baseurl }}{{ post.thumbnail }}",
      "discription": {{ post.summary | strip_html | strip_newlines | escape | jsonify }}
        } {% unless forloop.last %}, {% endunless %}
    {% endfor %}
]

    $('#search-input').keyup(function () {
      var searchField = $(this).val();
      if (searchField === '') {
        $('#filter-records').html('');
        return;
      }
      var regex = new RegExp(searchField, "i");
      var output = '<div class="card search-results">';
      var count = 1;
      $.each(search_data, function (key, val) {
        if ((val.url.search(regex) != -1) || (val.title.search(regex) != -1)) {
          output += '<div class="card">';
          output += '<div class="card"><img class="img-responsive" src="' + val.thumbnail + '" alt="' + val.title + '" /></div>';
          output += '<div class="card">';
          output += '<h5>' + val.title + '</h5>';
          output += '<p>' + val.url + '</p>'
          output += '</div>';
          output += '</div>';
          if (count % 2 == 0) {
            output += '</div><div class="card">'
          }
          count++;
        }
      });
      output += '</div>';
      $('#filter-records').html(output);
    });
    // search_results.fadeIn();

  });