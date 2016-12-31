'use strict';

(function($, window, document, undefined) {
  function visitingClickHandler() {
    $('.visiting').click(function() {
      registerVisit($(this).attr('data-yelp-id'));
    });
  }

  function registerVisit(yelpId) {
    $.post('is-going', {'yelpId': yelpId}, function(data) {
      // success, show feedback message
      console.log('success');
    })
    .fail(function() {
      // show error feedback
      console.log('failed');
    });
  }

  visitingClickHandler();
})(jQuery, window, document);
