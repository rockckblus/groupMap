module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /** 检查代码  */
        jshint: {
            //此处是 需要 测试 的文件路径，可自己修改
            build: ['js/hellosea/src/*.js','js/hellosea/src/**/*.js'],
            options: {
                //此处是 验证规则配置文件
                jshintrc: '.jshintrc'
            }
        },

        /**
         * 自动化
         * 16/1/22 */
        watch: {
            build: {
                files: ['Gruntfile.js','js/hellosea/src/*.js','js/hellosea/src/**/*.js'],
                tasks: ['jshint', 'copy', 'transport', 'concat', 'uglify', 'clean'],
                options: {
                    spawn: false
                }
            }
        },

        /** 生成jsSeajs合并  */
        /**
         * step 1:
         * 将入口文件拷贝到 产出目录
         */
        copy: {
            hellosea: {
                files: {
                    "js/hellosea/dist/app.js": ["js/hellosea/src/app.js"]
                }

            }
        },

        /**
         * step 2:
         * 创建 .build/js/common 临时目录
         * 将公用 common 目录下的 文件 转为 具名函数，并保存在 .build/js/common 目录下
         * 创建 .build/js/hellosea 临时目录
         * 将需要合并的js文件转为具名函数，并保持独立地保存在 .build/js/hellosea 临时目录下
         */
        transport: {

            app: {
                options: {
                    relative: true,
                    format: '/Public/resCreate/js/hellosea/{{filename}}' //生成的id的格式
                },
                files: [
                    {
                        'cwd': 'js/hellosea/',
                        'src': ['dist/app.js', 'src/**/*.js'],
                        'dest': '.build/js/hellosea/'
                    }
                ]
            }
        },

        /**
         * step 3:
         * 将.build 目录下的具名函数 入口文件,根据id查找对应的文件，并且 合并为 1个 js 文件
         * 将这个合并的 js 文件 拷贝到 我们的输出目录
         */
        concat: {
            hellosea: {
                options: {
                    // relative: true
                },
                files: {
                    'js/hellosea/dist/app.js': ['.build/js/hellosea/dist/app.js']
                }
            }
        },

        /**
         * step 4:
         * 压缩 这个 合并后的 文件
         */
        uglify: {
            hellosea: {
                files: {
                    'js/hellosea/dist/app.js': ['js/hellosea/dist/app.js']
                }
            }
        },

        /**
         * step 5:
         * 将 .build 临时目录删除
         */
        clean: {
            build: ['.build']
        }

    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', function (name, step) {
        switch (step) {
            case "1":
                grunt.task.run('copy:' + name);
                break;

            case "2":
                grunt.task.run('transport:common');
                grunt.task.run('transport:' + name);
                break;
            case "3":
                grunt.task.run('concat:' + name);
                break;
            case "4":
                grunt.task.run('uglify:' + name);
                break;
            case "5":
                grunt.task.run('clean');
                break;

            default:
                grunt.task.run(['copy:' + name, 'transport:common', 'transport:' + name, 'concat:' + name, 'uglify:' + name, 'clean'])
                break;
        }
    });
};