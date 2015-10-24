var page = require('webpage').create();
page.open('http://iconosquare.com', function(status) {
  console.log("Sited: " + status);
  if(status === "Loaded") {
    page.render('example.png');
  }
  phantom.exit();
});

page.evaluate( function() {
    // find element to send click to
    var element = document.querySelector( 'span.control.critical.closer' );

    // create a mouse click event
    var event = document.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );

    // send click to element
    element.dispatchEvent( event );
});
