let r = require,
    gulp = r('gulp'),
    babel = r("gulp-babel"),
    merge = r('merge-stream');

let projects = [ CreateProject('src/**/*.js', 'dist/') ];

gulp.task('build', function() {
    return transpileAllProjects();
});

function CreateProject(sourceGLOB, destination) {
    return {
        source: sourceGLOB,
        destination: destination
    };
}

function transpileAllProjects() {
    
    let streams = [];
    
    for(let i in projects){
        let p = projects[i];
        let { source, destination } = p;
        console.log('Transpiling ' + source);
        let t = transpile(source, destination);        
        streams.push(t);
    }

    return merge(streams);
}

function transpile(source, output) {

    return gulp.src(source)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest(output))
}

let glob = require('glob'),
    path = require('path');

function cliGenerator(cb) {

    glob('src/**/*/cli.js', function (err, files) {
        if (err) done(err);
        
        let clis = files.map(exe => {
            let dirs = path.dirname(exe).split('/');
            let name = dirs[dirs.length - 1];

            console.log(`creating cli for ${name}`);
            let template = `#!/usr/bin/env node
            let program = require('commander');
            let { main } = require('../dist/init/cli');
            
            program
                .action(main)
                .parse(process.argv);`;
                

            return transpile(exe, `bin/versioner-${name}.js`);
/* 
            // get the entry file name            
            let ext = path.extname(entry);
            let filename = path.basename(entry, ext);
            
            console.log(`Bundling ${filename}`);

            let bundleDest = `./wwwroot/js/modules/${filename}.js`;
            ensureDirectoriesExist(bundleDest);
            return bundle(entry, bundleDest);//, dependencies); */
        });
                
        //eventstream.merge(bundles).on('end', done);
    });


    return cb;
}

//gulp.task('cli', cliGenerator);