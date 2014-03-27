"use strict";

require.config({
	paths: {
		jquery: 'jquery-1.11.0.min',

		handlebars: 'handlebars-v1.3.0',
		'handlebars-runtime': 'handlebars.runtime-v1.3.0',
		hbs: '../../hbs',

		modules: '../modules',
		helpers: 'helpers'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		'handlebars-runtime': {
			exports: 'Handlebars'
		}
	}
});


require(['jquery', 'hbs!modules/tiny-module/tiny-template'], function($, tinyTmpl) {
	// Use whatever you would to render the template function
	var context = {
		adjective: "favorite",
		randomList: [
			"Here is a demo on how to do everything",
			"This is no big deal",
			"I mean really, everything in front of you",
			"In this example, we have covered",
			"normal template, partials, and helpers"
		]
	};
	$('#tiny-module').html(tinyTmpl(context));
	require(['modules/tiny-module/tiny']); // Also require the js to go with this module template
});