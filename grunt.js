module.exports = function(grunt) {
  grunt.initConfig({
    info: '<json:package.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: 'lib/aug.js'
    },
    concat: {
      dist: {
        src: ['<banner>', 'lib/aug.js'],
        dest: 'dist/aug.js'
      },
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/aug.js'],
        dest: 'dist/aug.min.js'
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'bdd',
          reporter: 'list',
          growl: true
        }
      }
    },
    watch: {
      js: {
        files: 'lib/aug.js',
        tasks: 'concat min simplemocha' 
      }
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.registerTask('default', 'lint concat min simplemocha');
  grunt.registerTask('dev', 'server watch');
}
