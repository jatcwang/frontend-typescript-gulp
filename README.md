# Frontend TypeScript Gulp Example
A project template for getting started with TypeScript (JSX support) and SASS, with auto recompilation and browser refresh!

Facebook React is also added to show TypeScript interacts with JavaScript libraries (i.e. definition files)

# Features
- TypeScript (JS/JSX) compilation
- SASS/SCSS compilation
- Single JavaScript output using browserify
- Source maps for both TypeScript and SCSS
- Auto recompilation and browser refresh when you change your files!
- Uglify JavaScript / minify CSS when you run in production mode (`gulp --env production`)

# Install steps
Make sure you have `gulp`, `tsd` installed globally. e.g. `npm install -g gulp tsd`
1. `npm install` will install the dependencies of the project
2. `tsd install` will add the TypeScript definition files

# Running

For debug mode, run `gulp` in the command line. After compilation is complete, you should be able to visit `localhost:3000` to see the static html page with the compiled JavaScript and CSS in effect.

The original source code (through the use of source maps) are located under `source` subfolder in Chrome Dev Tools → Source tab. You can set breakpoints there to debug your application.

You can run `gulp [task]` to run a specific task. Where `[task]` is the name of the task (Use `gulp --tasks` to see the available tasks)

With our use `browser-sync`, your browser should refresh when the file has changed.

For production releases, run `gulp --env production`

Happy Hacking!
