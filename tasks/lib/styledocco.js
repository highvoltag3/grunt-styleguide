/*
 * styleguide
 * https://github.com/indieisaconcept/grunt-styleguide/tasks/lib/styledocco
 *
 * Copyright (c) 2012 Jonathan Barnett @indieisaconcept
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {

    init: function (grunt) {

        var styledocco = require('styledocco/cli'),
            utils = grunt.util || grunt.utils,

            // proecessor specific arguemnts
            processors = {
                'sass': 'sass --compass'
            };

        return function (styleguide, callback) {

            var files = styleguide.files,
                options = styleguide.options,
                preprocessor = !options.preprocessor ? styleguide.preprocessor && processors[styleguide.preprocessor] : options.preprocessor;

            options.in = files.src;
            options.out = files.dest;
            options.basePath = files.base;

            // specify processor if needed
            if (preprocessor) {
                options.preprocessor = preprocessor;
            }

            styledocco(options);

            // [JB] HACKY
            // styledocco doesn't support callbacks but always generates
            // and index.html file upon completion so we can at least monitor for the
            // creation of this.

            (function isComplete() {

                if (!grunt.file.exists(files.dest + '/index.html')) {
                  setTimeout(isComplete, 0);
                } else {
                  callback();
                }

            }());

        };

    }

};