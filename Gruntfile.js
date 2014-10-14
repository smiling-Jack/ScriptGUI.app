/**
 * Created by jack on 10.07.2014.
 */


module.exports = function (grunt) {
    var ops = grunt.file.readJSON("package.json");
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-zip-directories');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('secret.json'),


//----------------------------------------------------------------------------------------------------------------------
        nodewebkit: {
            build: {
                options: {
                    platforms: ['win'],
                    buildDir: './build',
                    winIco: './src/img/cube32.ico',
                    macIcns: './src/img/cube32.png'
                },
                src: './src/**/*'
            }
        },

//----------------------------------------------------------------------------------------------------------------------
        compress: {
            win: {
                options: {
                    archive: 'build/ScriptGUI_win.zip'
                },
                files: [
                    {expand: true, cwd: 'build/ScriptGUI/win/', src: ['**'], dest: 'ScriptGUI/'}
                ]
            },
            osx: {
                options: {
                    mode: "tar",
                    archive: 'build/ScriptGUI_osx.tar'
                },
                files: [
                    {expand: true, cwd: 'build/ScriptGUI/osx/', src: ['**'], dest: 'ScriptGUI/'}
                ]
            },
//            linux32: {
//                options: {
//                    archive: 'build/ScriptGUI_linux32.zip'
//                },
//                files: [
//                    {expand: true, cwd: 'build/ScriptGUI/linux32/', src: ['**'], dest: 'ScriptGUI/'}
//                ]
//            },
//            linux64: {
//                options: {
//                    archive: 'build/ScriptGUI_linux64.zip'
//                },
//                files: [
//                    {expand: true, cwd: 'build/ScriptGUI/linux64/', src: ['**'], dest: 'ScriptGUI/'}
//                ]
//            }
        },

        zip_directories: {
            irep: {
                files: [{
                    filter: 'isDirectory',
                    expand: true,
                    cwd: 'build/osx',
                    src: ['*'],
                    dest: 'build'
                }]
            }
        },
//----------------------------------------------------------------------------------------------------------------------
        sftp: {
            update_json: {
                files: {
                    "./": ["src/update.json"]
                },
                options: {
                    srcBasePath: "src/",
                    path: '/var/www/jdownloads/ScriptGUI',
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    showProgress: true
                }
            },
            data_zips: {
                files: {
                    "./": ["build/*zip"]

                },
                options: {
                    srcBasePath: "build/",
                    path: '/var/www/jdownloads/ScriptGUI',
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    showProgress: true
                }
            }
        }

//----------------------------------------------------------------------------------------------------------------------


    });


    // Actually load this plugin's task(s)1
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
//    grunt.registerTask('Build', ['nodewebkit',c,'make_build_data','upload']);

    grunt.registerTask('make_build_data', function () {

        var manifest = grunt.file.readJSON('src/package.json');
        var d = new Date()
        var build = {
            version: manifest.native.version,
            time: d.toLocaleTimeString(),
            date: d.getDate() + "." + parseInt(d.getMonth() + 1) + "." + d.getFullYear()
        };
        manifest.native.build_time = d.toLocaleTimeString();
        manifest.native.build_date = d.getDate() + "." + parseInt(d.getMonth() + 1) + "." + d.getFullYear();

        grunt.file.write("build/build_data.json", JSON.stringify(build));
        grunt.file.write("src/package.json", JSON.stringify(manifest));
        console.log('finish_make_build_data')
    });

    grunt.registerTask('WIN_Build_ZIP_UP', ['nodewebkit:build','compress:win','sftp:data_zips']);


};