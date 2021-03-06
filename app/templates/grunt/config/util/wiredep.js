// Configuration for Wiredep task(s)
// Injects Bower packages into your source code.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('wiredep', {
    app: {
      options: {
        ignorePath: /client\/|\.\.\//g,
        // Make sure everything has an absolute path (starts with '/')
        fileTypes: {<% if (singlePageApplication) { %>
          html: {
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }<% } %><% if (htmlOption === 'jade') { %>
          jade: {
            replace: {
              js: 'script(src=\'/{{filePath}}\')',
              css: 'link(rel=\'stylesheet\', href=\'/{{filePath}}\')'
            }
          }<% } else if (htmlOption === 'swig') { %>
          swig: {
            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
              js: /<script.*src=['"]([^'"]+)/gi,
              css: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }<% } %>
        },
        // packages to ignore
        exclude: [
          'bower_components/html5shiv/',
          'bower_components/consolelog/',
          'bower_components/modernizr/',<% if (jsOption === 'requirejs') { %>
          'bower_components/requirejs/'<% } %><% if (jsFramework === 'react') { %>
          'bower_components/es5-shim/'<% } %>
        ],
        overrides: {<% if (jsTemplate === 'handlebars') { %>
          'handlebars': {
            'main': 'handlebars.runtime.js'
          }<% } else if (jsTemplate === 'jade') { %>
          'jade': {
            'main': 'runtime.js'
          }<% } %>
        }
      },
      src: [<% if (singlePageApplication) { %>
        '<%%= yeogurt.client %>/index.html'<% } else if (useServer) { %><% if (htmlOption === 'jade') { %>
        '<%%= yeogurt.server %>/templates/layouts/base.jade'<% } else if (htmlOption === 'swig') { %>
        '<%%= yeogurt.server %>/templates/layouts/base.swig'<% } %><% } else { %><% if (htmlOption === 'jade') { %>
        '<%%= yeogurt.client %>/templates/layouts/base.jade'<% } else if (htmlOption === 'swig') { %>
        '<%%= yeogurt.client %>/templates/layouts/base.swig'<% } %><% } %>
      ]
    }<% if (cssOption !== 'css') { %>,
    styles: {<% if (cssOption === 'sass') { %>
      src: ['<%%= yeogurt.client %>/styles/**/*.{scss,sass}'],<% } %><% if (cssOption === 'less') { %>
      src: ['<%%= yeogurt.client %>/styles/**/*.less'],<% } %><% if (cssOption === 'stylus') { %>
      src: ['<%%= yeogurt.client %>/styles/**/*.styl'],<% } %>
      ignorePath: /client/g,
    }<% } %>
  });

};

module.exports = taskConfig;
