module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        lambda_package: {
            default: {
                options: {
                    // Task-specific options go here.
                }
            },
            solutionbuilder: {
                options: {

                }
            }
        },
        lambda_invoke: {
            search: {
                options: {
                    handler: 'handler',
                    file_name: 'index.js',
                    event: '../eventTests/search/search-test.json'
                }
            }
        },
        lambda_deploy: {
            default: {
                options: {
                    profile: 'default',
                    timeout: 60,
                    memory: 256
                }
            },
            solutionbuilder: {
                options: {
                    profile: 'solutions-builder-dev',
                    timeout: 60,
                    memory: 256
                }
            }
        },
        clean: {
            all_zip: ['dist/*.zip']
        }
    });

    grunt.registerTask('set_arn', function(arg1, arg2) {
        grunt.config.set('lambda_deploy.default.arn', 'arn:aws:lambda:' + region + ':' + accid +
            ':function:data-lake-helper');
        grunt.config.set('lambda_deploy.solutionbuilder.arn', 'arn:aws:lambda:' + region + ':' + accid +
            ':function:data-lake-helper');
        console.log(grunt.config.get('lambda_deploy.default.arn'));
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-aws-lambda');

    var accid = grunt.option('accid') || '';
    var region = grunt.option('region') || '';

    grunt.registerTask('package', ['clean', 'lambda_package:default']);
    grunt.registerTask('deploy', ['clean', 'lambda_package:default', 'set_arn:' + accid + ":" + region,
        "lambda_deploy:default"
    ]);
    grunt.registerTask('sandbox-deploy', ['clean', 'lambda_package:solutionbuilder', 'set_arn:' + accid + ":" + region,
        "lambda_deploy:solutionbuilder"
    ]);

};
