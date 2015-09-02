# typescript-jsx-scss-gulp
A project template for getting started with typescript + jsx (with sass compilation too) using Gulp.

This template uses browserify to package all your javascript outupts into one file

# What's included

- Typescript (js / jsx) compilation
- SASS/SCSS compilation
- Watch your files and only recompile what's needed when you change a file
- Emits a single javascript output using browserify
- Generate source maps for both Typescript and SCSS
- Uglify Javascript / minify CSS when you run in production mode `gulp --env production`

# Install steps

Make sure you have `gulp`, `tsd` installed globally. e.g. `npm install -g gulp`

1. `npm install` will install the dependencies of the project
2. `tsd install` will add the Typescript definition files

# Running

Run `gulp` in the command line.

You can run `gulp [task]` to run a specific task. Where `[task]` is the name of the task (Use `gulp --tasks` to see the available tasks)

The default actions will setup watchers for both Typescript files and Sass files. When these files change, `gulp` will recompile them and produce a new output.

With our `browser-sync` too, your browser should refresh when the file has changed.

For production releases, run `gulp --env production`
