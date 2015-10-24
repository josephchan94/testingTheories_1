var webdriverio = require('webdriverio'),
		By = webdriverio.by,
		until = webdriverio.until;

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
var searchQuery = 'jdmzipties';

webdriverio
		// startup functions
    .remote(options)
    .init()
    .url('http://iconosquare.com/')

		// log in
		.click('.login_header_mobile')
		.setValue('#id_username', 'josephcphoto')
		.setValue('#id_password', '')
		.click('input.button-green')

		// search
		.url('http://iconosquare.com/viewer.php?search=' + searchQuery) // search
    .click('.like_picto_unselected') //likes first photo lol

		// shutdown functions
		.pause(2000)
    //.end();
