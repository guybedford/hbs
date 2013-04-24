define(['amd-loader', 'handlebars'], function(amdLoader, Handlebars) {
  var includeHelpers = /{{@([a-zA-Z-0-9\.\/]+)/g;
  return amdLoader('hbs', 'hbs', function(name, source, req, callback, errback, config) {
    // replace internal requires with helper form
    var sanitize = function(helperModule) {
      return helperModule.replace('/', '-').replace('.', '');
    }
    var helpers = [];
    source = source.replace(includeHelpers, function (match, dep) {
      helpers.push(dep);
      return '{{' + sanitize(dep);
    });
    // require the helpers
    req(helpers, function() {
      for (var i = 0; i < arguments.length; i++)
        Handlebars.registerHelper(sanitize(helpers[i]), arguments[i]);

      // return the compiled template
      callback(Handlebars.compile(source));
    });
  });
});
