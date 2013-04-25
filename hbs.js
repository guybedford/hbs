define(['amd-loader', './handlebars'], function(amdLoader, Handlebars) {
  var includeHelpers = /{{@([a-zA-Z-0-9\.\/\~]+)/g;
  return amdLoader('hbs', 'hbs', function(name, source, req, callback, errback, config) {
    // replace internal requires with helper form
    var sanitize = function(name) {
      return name.replace('/', '-').replace('.', '').replace('~', '_');
    }
    var helpers = [];
    source = source.replace(includeHelpers, function(match, dep) {
      helpers.push(dep);
      return '{{' + sanitize(dep);
    });
    // require the helpers
    helpers.unshift('hbs/handlebars.runtime');

    // return the compiled template
    if (config.isBuild) {
      var output = "define(" + JSON.stringify(helpers) + ", function(Handlebars) {\n"
        + (helpers[1] ? "  Handlebars.registerHelper('" + sanitize(helpers[1]) + "', arguments[1]);\n" : "")
        + "  var t = Handlebars.template(" + Handlebars.precompile(source) + "); \n"
        + "  return function(o) { return t(o); };\n"
        + "});"
      callback(output);
    }
    else {
      // require the helpers
      req(helpers, function() {
        for (var i = 0; i < arguments.length; i++)
          Handlebars.registerHelper(sanitize(helpers[i]), arguments[i]);

        // return the compiled template
        var compiled = Handlebars.compile(source);
        callback(function(o) {
          return compiled(o);
        });
      });
    }
  });
});
