const gulp = require('gulp');
const yargs = require('yargs');
const rename = require('gulp-rename');
const template = require('gulp-template');
const path = require('path');


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

let srcPath = path.join(__dirname,'frontend','src');
let commonPath = path.join(__dirname,'frontend','src','common');
let commonComponentsPath =  path.join(commonPath,'components')
let appPath = path.join(__dirname,'frontend','src','app');


gulp.task('component', () => {
  let name = yargs.argv.name;
  let parent = yargs.argv.parent;
  let parentArray = (parent||'').split('/');
  let app = yargs.argv.app;
  let basePath = app == !!app && app=='app' ? appPath : commonComponentsPath;
  let destPath = path.join(basePath,...parentArray, name);

  return gulp.src(blankComponentPath)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      camelCaseName: camel(name),
      tagName: tag(name)
    }))
    .pipe(rename((p)=>{
      p.basename = p.basename.replace('temp',name);
    }))
    .pipe(gulp.dest(destPath))

})