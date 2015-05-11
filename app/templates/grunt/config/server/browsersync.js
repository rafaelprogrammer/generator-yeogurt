// Configuration for BrowserSync task(s)
// Boots up a server that loads up all static files
// Enables livereload
'use strict';

var taskConfig = function(grunt) {

  // Load config for use with non-grunt logic
  var yeogurt = require('../../../yeogurt.conf');

  // Build object that maps prefixed directories to be non-prefixed
  // Ex. _images -> images
  var routeObj = {};
  for (var dir in yeogurt.directories) {
    if (yeogurt.directories[dir].match(/^_/)) {
      routeObj['/' + yeogurt.directories[dir].replace(/^_/, '')] = yeogurt.directories.source + '/' + yeogurt.directories[dir];
    }
  }

  grunt.config.set('browserSync', {
    options: {
      notify: false,
      background: true,
      host: yeogurt.host,
      port: yeogurt.port
    },
    serve: {
      options: {
        files: [
          '<%%= yeogurt.directories.source %>/*.{ico,png,txt,html}',
          '<%%= yeogurt.directories.temporary %>/**/*.html',
          '<%%= yeogurt.directories.temporary %>/**/*.{css,ttf,otf,woff,svg,eot}',
          '<%%= yeogurt.directories.temporary %>/**/*.js',
          '<%%= yeogurt.directories.source %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        server: {
          baseDir: [yeogurt.directories.temporary, yeogurt.directories.source],
          routes: routeObj
        }
      }
    },
    build: {
      options: {
        background: false,
        server: '<%%= yeogurt.directories.destination %>'
      }
    }
  });

};

module.exports = taskConfig;