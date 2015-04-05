/*global describe, beforeEach, it*/
'use strict';

var path  = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var createAppGenerator = require('../../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../../helpers/create-generator').createSubGenerator;

describe('React module sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator([], {path: '../../../../app'});

      done();
    }.bind(this));
  });

  describe('Create react files when using React', function() {
    it('Handles defaults', function(done) {
      // Filename
      var module = 'mymodule';
      var filesToTest = [
        'client/app/' + module + '/__tests__/' + module + '.spec.js',
        'client/app/' + module + '/' + module + '.js'
      ];
      var fileContentToTest = [
        ['client/app/' + module + '/' + module + '.js', /React\.createElement/i]
      ];
      var fileContentNotThere = [
        ['client/app/' + module + '/__tests__/' + module + '.spec.js', /\jsx/i]
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react',
        useJsx: false
      });
      this.app.run([], function() {
        createSubGenerator('module', module, {path: '../../../../'}, {
          // mock prompt data
          moduleFile: 'client/app'
        }, function() {
          assert.file(filesToTest);
          assert.fileContent(fileContentToTest);
          assert.noFileContent(fileContentNotThere);
          done();
        });
      });
    });
    it('Handles defaults with JSX', function(done) {
      // Filename
      var module = 'mymodule';
      var filesToTest = [
        'client/app/' + module + '/__tests__/' + module + '.spec.js',
        'client/app/' + module + '/' + module + '.jsx'
      ];
      var fileContentToTest = [
        ['client/app/' + module + '/__tests__/' + module + '.spec.js', /React\.createFactory/i]
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react'
      });
      this.app.run([], function() {
        createSubGenerator('module', module, {path: '../../../../'}, {
          // mock prompt data
          moduleFile: 'client/app'
        }, function() {
          assert.file(filesToTest);
          assert.fileContent(fileContentToTest);
          done();
        });
      });
    });
    it('Handles defaults without testing', function(done) {
      // Filename
      var module = 'mymodule';
      var filesToTest = [
        'client/app/' + module + '/' + module + '.jsx'
      ];
      var filesNotCreated = [
        'client/app/' + module + '/__tests__/' + module + '.spec.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'react',
        useTesting: false
      });
      this.app.run([], function() {
        createSubGenerator('module', module, {path: '../../../../'}, {
          // mock prompt data
          moduleFile: 'client/app'
        }, function() {
          assert.file(filesToTest);
          assert.noFile(filesNotCreated);
          done();
        });
      });
    });
  });
});