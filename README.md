# RequireJS Handlebars Plugin

Simple [handlebars](http://handlebarsjs.com/) template support for [RequireJS](http://requirejs.org/)

## Version:

 - Handlebars: `1.3.0`
 - hbs.js: `0.0.4`

## Installation:
```
require.config({
	paths: {
		handlebars: 'handlebars',
		'handlebars-runtime': 'handlebars.runtime',
		hbs: 'hbs'
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
```

## Requirements: 
 - [RequireJS](http://requirejs.org/): *you probably already have this...*
 - [Handlebars](http://handlebarsjs.com/)
 - [AMD Loader](https://github.com/guybedford/amd-loader): A RequireJS plugin helper module


## Usage:
```
require(['hbs!modules/tiny-module/body-template'], function (bodyTmpl) {
	// Use whatever you would to render the template function
	document.body.innerHTML = bodyTmpl({adjective: "favorite"});
});
```

Path: `modules/tiny-module/tiny-template.hbs`
```
<div class="the better handlebars plugin">
	This is my {{ adjective }} template.
</div>
```

## Partials

To have partials in your templates just use the syntax and provide a path to the partial

Path: `modules/tiny-module/body-template.hbs`
```
<div class="the better handlebars plugin">
	This is my {{ adjective }} template.

	Now here is the partial: 

	{{! the path can also be relative to the current template: }}
	{{> ./coolPartial }}
</div>
```

Path: `modules/tiny-module/cool.partial.hbs`
```
<div class="cool partial">
	Coolest partial in town
	{{! you can even have more partials in a partial }}
</div>
```

## Helpers:

Helpers can be loaded by RequireJS Module ID.

```
Slug: {{@helpers/slugify.helper "cool slug that can be used in a url"}}
OR
Slug: {{@helpers/slugify.helper title}}
```

Here is how to create a helper:

Path: `js/helpers/slugify.helper.js`
```
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
```

You can even use block helpers.
```
{{#@helpers/include.helper title="Lobby" url="http://google.com/" }}{{> ./tiny-link.partial }}{{/helpers/include.helper}}
```

Here is how to create a block helper:
Path: `js/helpers/include.helper.js`
```
define(function() {
	// via: http://stackoverflow.com/a/18026063/796832
	return function(options) {
		var context = {};
		var mergeContext = function(obj) {
			for(var k in obj)context[k]=obj[k];
		};
		mergeContext(this);
		mergeContext(options.hash);
		return options.fn(context);
	}
});
```

## Changelog:

`0.0.4`: 
 - Added support for block helpers
 - Updated test with block helpers
`0.0.3`: 
 - Added support for partials
 - Updated test with examples for all features