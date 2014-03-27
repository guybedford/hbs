define(function() {
	return function(text) {
		return new Handlebars.SafeString(
			text
				.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'')
		);
	}
});
	
