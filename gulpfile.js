var fs = require('fs');
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tslintCustom = require('tslint');
var mocha = require('gulp-mocha');
var exec = require('child_process').exec;
var { promisify } = require('util');
var fancyLog = require('fancy-log');
require('dotbin');

var trim = (s) => {
    return s ? s.trim() : undefined;
}

var clean = (obj, prod) => {
    let files = obj.debug || [];
    if (prod) {
        files = obj.prod || [];
    }
    files = (obj.default || []).concat(files || []);
    let promises = [];
    for (const r of files) {
        promises.push(del(dirResult + '/' + r));
    }
    return Promise.all(promises);
}

var copy = (obj, prod, done) => {
    let files = obj.debug || [];
    if (prod) {
        files = obj.prod || [];
    }
    files = (obj.default || []).concat(files || []);
    let d;
    for (const c of files) {
        d = gulp.src(c.files).pipe(gulp.dest(dirResult + '/' + c.out));
    }
    return d ? d : done();
}

const options = {
    outBaseDir: {
        debug: '.',
        prod: './dist',
        prodZip: './distZip'
    },
    tsConfig: {
        debug: 'tsconfig.json',
        prod: 'tsconfig-prod.json'
    },
    swagger: {
        copy: {
            default: [
                {
                    files: ['./schema/Models/Basic/*.json', './schema/RestfulModels/**/*.json'],
                    out: 'schemas'
                }
            ]
        },
        remove: {
            default: [
                'lib/handlers/_swagger.json'
            ],
            after: {
                default: [
                    'schemas'
                ]
            }
        }
    },
    copy: {
        prod: [
            {
                files: ['package.json', '.yarnrc', './prod_config/**/*'], // ['package.json', 'logger-config.js', './prod_config/**/*']
                out: '.'
            }
        ]
    },
    remove: {
        debug: [
            'schemas',
            'lib',
            'test',
            'index.js',
            'index.js.map',
            'index.d.ts'
        ],
        prod: [
            '.'
        ],
        after: {
            prod: [
                'test',
                '**/*.d.ts',
                '**/*.js.map',
                '.yarnrc'
            ]
        }
    }
};

const mode = (process.argv.length === 3 && process.argv[2] === 'production' ? 'PROD' : 'DEBUG');
const dirResult = (mode === 'PROD') ? options.outBaseDir.prod : options.outBaseDir.debug;
const tsConfig = (mode === 'PROD') ? options.tsConfig.prod : options.tsConfig.debug;

var tsFilesGlob = ((c) => { return c.filesGlob || c.files || 'src/**/*.ts'; })(require('./' + options.tsConfig.debug));

/*********************************************
 * ******* GENERATION DES ENTITES ***********
 * *******************************************/

gulp.task('codegen.entity', (cb) => {
    exec('npm run entity', (err, stdout, stderr) => {
        console.log("Using bo-code-gen Entity");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('codegen.view', (cb) => {
    exec('npm run view', (err, stdout, stderr) => {
        console.log("Using bo-code-gen View");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('codegen.spo', (cb) => {
    exec('npm run sql-spo', (err, stdout, stderr) => {
        console.log("Using sql-schema-gen Schemas");
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/*********************************************
 * **************** SWAGGER ******************
 * *******************************************/

gulp.task('swagger-clean', (done) => {
    if (mode === 'DEBUG') {
        return clean(options.swagger.remove, false);
    }
    return done();
});

gulp.task('swagger-copy', (done) => {
    return copy(options.swagger.copy, mode === 'PROD', done);
});

gulp.task('swagger-process', async () => {
    let buildTools = require('./buildTools');
    await buildTools.BuildTools.genSwagger({ baseDir: __dirname + '/' + dirResult }, dirResult + "/");
});

gulp.task('swagger-clean-after', () => {
    return clean(options.swagger.remove.after, mode === 'PROD');
});

gulp.task('swagger', gulp.series('swagger-clean', 'swagger-copy', 'swagger-process', 'swagger-clean-after'));

/*********************************************
 * ************** COMPILATION ****************
 * *******************************************/

// Lints all TypeScript source files
gulp.task('lint', () => {
    return gulp.src(tsFilesGlob)
        .pipe(tslint({
            tslint: tslintCustom,
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

// Compiles all TypeScript source files
gulp.task('run-compile', (cb) => {
    exec('tsc --version', (err, stdout, stderr) => {
        stdout = trim(stdout);
        if (stdout) {
            fancyLog.info('Compiling using TypeScript', stdout);
        }
        if (err) {
            err.showStack = false;
            fancyLog.error(err);
            cb(err);
        } else {
            exec('tsc --project ' + tsConfig, function (err, stdout, stderr) {
                stdout = trim(stdout);
                if (err) {
                    fancyLog.error(stdout);
                    err.showStack = false;
                } else {
                    if (stdout) {
                        fancyLog.info(stdout);
                    }
                }
                cb(err);
            });
        }
    });

    // var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    // var tsResult = gulp.src(path.resolve('./src/**/*.ts'))
    //     .pipe(sourcemaps.init())
    //     .pipe(tsProject());
    // return merge([
    //     tsResult.dts.pipe(gulp.dest(dirResult)),
    //     tsResult.js
    //         .pipe(sourcemaps.write('.'))
    //         .pipe(gulp.dest(path.resolve(dirResult)))
    // ]);
});
gulp.task('compile', gulp.series('lint', 'run-compile'));

/*********************************************
 * ***************** CLEAN *******************
 * *******************************************/

// Clean directory
gulp.task('clean', () => {
    return clean(options.remove, mode === 'PROD');
});

// Clean directory
gulp.task('clean-after', () => {
    return clean(options.remove.after, mode === 'PROD');
});

/*********************************************
 * ***************** DEBUG *******************
 * *******************************************/
gulp.task('build', gulp.series('clean', 'compile', 'swagger', 'clean-after'));

/*********************************************
 * ************** PRODUCTION *****************
 * *******************************************/

gulp.task('prod-increment-build', async () => {
    let buildTools = require('./buildTools');
    await buildTools.BuildTools.genNumBuild(dirResult + '/');
});

gulp.task('prod-copy', (done) => {
    return copy(options.copy, true, done);
});

gulp.task('prod-install', (cb) => {
    // --frozen-lockfile
    exec('yarn install --production=true --silent',
        {
            cwd: dirResult,
        },
        (error, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
            if (error) {
                cb(error);
            } else {
                cb();
            }
        });
});

gulp.task('prod-zip', (cb) => {
    const zipDirectory = require('./lib/tools/zip').zipDirectory;
    const directory = path.join(__dirname, options.outBaseDir.prod);
    const outputDir = path.join(__dirname, options.outBaseDir.prodZip);
    const moment = require('moment');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    const outputFile = path.join(outputDir, 'SPO_AccessionRV_' + moment().format('YYYY-MM-DD') + '.zip');
    zipDirectory(directory, outputFile)
        .then(() => cb())
        .catch((err) => cb(err));
});

// Create a dist production directory
gulp.task('production', gulp.series('clean', 'compile', 'swagger', 'prod-increment-build', 'prod-copy', 'prod-install', 'clean-after', 'prod-zip'));

/*********************************************
 * ************** GULP DEFAUT ***************
 * *******************************************/
gulp.task('default', gulp.series('build'));

/*********************************************
 * **************** AUTRES *****************
 * *******************************************/

// Runs the Jasmine test specs
gulp.task('run-test', () => {
    return gulp.src(options.outBaseDir.debug + '/test/**/*.js')
        .pipe(mocha({
            colors: false,
        }));
});

gulp.task('test', gulp.series('build', 'run-test'));

gulp.task('run-testx', gulp.series('build', () => {
    return gulp.src(options.outBaseDir.debug + '/test/GP.test.js')
        .pipe(mocha({
            colors: false,
        }));
}));
gulp.task('testx', gulp.series('build', 'run-testx'));

// Watches ts source files and runs build on change
gulp.task('watch', () => {
    gulp.watch(tsFilesGlob, gulp.series('build', 'test'));
});

gulp.task('scripts', () => {
    const tsResult = ts.src()
        .pipe(ts());
    return tsResult.js.pipe(gulp.dest('dist'));
});

// change latest in package.json
gulp.task('change-latest', async () => {
    let p = require('./package.json');
    console.log(`Change latest in ${p.name}`);
    const spackages = [
        {
            po: p.dependencies || [],
            flag: ''
        }, {
            po: p.devDependencies || [],
            flag: ' -D'
        },
    ];
    const packages = spackages.map((o) => {
        return Object.getOwnPropertyNames(o.po)
            .map((pName) => {
                return {
                    name: pName, value: o.po[pName], flag: o.flag
                };
            })
            .filter((o) => o.value === 'latest')
            .map((o) => {
                return {
                    name: o.name,
                    flag: o.flag,
                };
            })
    }).reduce((x, v) => {
        return x.concat(v);
    }, []);
    console.log(`Packages to change: ${packages.map((o) => o.name + ' ' + o.flag)}`);
    if (packages.length === 0) {
        return;
    }
    const execPromise = promisify(exec);
    for (const o of packages) {
        for (const cmd of [
            `yarn remove ${o.name}`,
            `yarn add ${o.name}${o.flag}`,
        ]) {
            const execResult = await execPromise(cmd);
            if (execResult.error) {
                throw execResult.error;
            }
            console.log(execResult.stdout);
            console.error(execResult.stderr);
        }
    }
});