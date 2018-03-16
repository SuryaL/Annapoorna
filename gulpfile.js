const gulp = require('gulp');
const uglify = require('gulp-uglify');

const yargs = require('yargs');
const rename = require('gulp-rename');
const template = require('gulp-template');
const path = require('path');
/*
gulp.task - define task
gulp.src - point to files to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders to changes

*/

const cap = (name) => {
  array = name.toLowerCase().split('_');
  let modified_name = "";
  array.forEach((item) => {
      modified_name += item.charAt(0).toUpperCase() + item.slice(1);
  })
  return modified_name;
};
const camel = (name) => {
  let val = cap(name);
  return val.charAt(0).toLowerCase() + val.slice(1);
};
const tag = (val) => {
  return val.toLowerCase().replace(/_/gi, '-');
};

const blankComponentPath = path.join(__dirname, 'generator', '/component/**/*.**');

gulp.task('message', () => console.log('Gulp running'));

gulp.task('default', () => console.log('Gulp default with no args'));

gulp.task('watch', () => {

})

let srcPath = path.join(__dirname,'frontend','src');
let commonPath = path.join(__dirname,'frontend','src','common');
let appPath = path.join(__dirname,'frontend','src','app');
gulp.task('component', () => {
  let name = yargs.argv.name;
  let parent = yargs.argv.parent;
  let app = yargs.argv.app;
  // let destPath = app == !!app && app=='app' ? path.join(appPath,)
  
  gulp.src(blankComponentPath)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      camelCaseName: camel(name),
      tagName: tag(name)
    }))
    .pipe(rename((p)=>{
      p.basename =p.basename.replace('temp',name);
    }))
    .pipe(gulp.dest())

})