# Frontend Typescript Gulp Example
A project template for getting started with typescript (JSX support) and SASS, with auto recompilation!

# Features
- Typescript (JS/JSX) compilation
- SASS/SCSS compilation
- Single Javascript output using browserify
- Source maps for both Typescript and SCSS
- Auto recompilation and browser refresh when you change your files!
- Uglify Javascript / minify CSS when you run in production mode (`gulp --env production`)

# Install steps
Make sure you have `gulp`, `tsd` installed globally. e.g. `npm install -g gulp tsd`
1. `npm install` will install the dependencies of the project
2. `tsd install` will add the Typescript definition files

# Running

For debug mode, run `gulp` in the command line. After compilation is complete, you can visit localhost:3000 to see the static html page with your compiled style and result.

You can run `gulp [task]` to run a specific task. Where `[task]` is the name of the task (Use `gulp --tasks` to see the available tasks)

With our use `browser-sync`, your browser should refresh when the file has changed.

For production releases, run `gulp --env production`
