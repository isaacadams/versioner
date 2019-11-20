let r = require,
    gulp = r('gulp'),
    babel = r("gulp-babel"),
    merge = r('merge-stream'),
    rimraf = require('gulp-rimraf');

let projects = [ CreateProject('src/**/*.js', 'dist/') ];

gulp.task('build.clean', function() {
    return gulp.src('dist/', { read: false }) // much faster
            //.pipe(ignore('node_modules/**'))
            .pipe(rimraf());
});

gulp.task('build.generate', function() {
    return transpileAllProjects();
});

gulp.task('build', gulp.series([
    'build.clean', 
    'build.generate'
]));

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