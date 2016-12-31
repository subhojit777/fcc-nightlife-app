'use strict';

(function($, window, document, undefined) {
  function visitingClickHandler() {
    $('.visiting').click(function() {
      registerVisit($(this), $(this).attr('data-yelp-id'));
    });
  }

  function registerVisit($elem, yelpId) {
    $.post('is-going', {'yelpId': yelpId}, function(data) {
      if (data.state == 'going') {
        $elem.addClass('positive');
      }
      else {
        $elem.removeClass('positive');
      }
    })
    .fail(function() {
      alert('failed');
    });
  }

  visitingClickHandler();
})(jQuery, window, document);
