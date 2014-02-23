# RequireJS Handlebars Plugin

Simple [handlebars](http://handlebarsjs.com/) template support for [RequireJS](http://requirejs.org/)

## Version:

Handlebars: `1.3.0`
hbs.js: `0.0.3`

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
require(['hbs!App/Template/body-template'], function (bodyTmpl) {
	// Use whatever you would to render the template function
	document.body.innerHTML = bodyTmpl({adjective: "favorite"});
});
```

Path: `App/Template/body-template.hbs`
```
<div class="the better handlebars plugin">
	This is my {{ adjective }} template.
</div>
```

## Partials

To have partials in your templates just use the syntax and provide a path to the partial

Path: `App/Template/body-template.hbs`
```
<div class="the better handlebars plugin">
	This is my {{ adjective }} template.

	Now here is the partial: 

	{{! the path can also be relative to the current template: }}
	{{> ./coolPartial }}
</div>
```

Path: `App/Template/coolPartial.hbs`
```
<div class="cool partial">
	Coolest partial in town
	{{! you can even have more partials in a partial }}
</div>
```

## Helpers:

Helpers can be loaded by RequireJS Module ID.

```
Fullname: {{@some/helper name}}
```