# Capital Framework

Master repository for building the complete Capital Framework.

## Getting Started

You can use Capital Framework in two ways:

1. Download the compiled base framework with all included packages and just start coding.
2. Get the source of the framework and build your own custom implementation of it.
   * _Requires some comfortability with the command line (Terminal). Some experience with Grunt a plus._

### "I just want to get the stuff and make something quickly"

1. Download the zip file of the [latest release](#), which contains the contents of the `dist/` folder.
2. Unzip it.
3. Get going!

### "I want to build my own"

#### Requirements

- [Grunt](http://gruntjs.com/) (and its dependencies)
- That's it! Grunt will help you install everything else you need.

#### Workflow

1. Clone the repo and `cd` into its root
2. `npm install` – Initializes Grunt in this folder and installs dependencies.
3. `grunt vendor` – Pulls in Bower components.
4. `grunt compile` (or just `grunt`) – Compiles LESS files, concatenates and minifies JS files, and rewrites image
   and font asset paths.
5. Develop your project in the `src` folder. Add your project's LESS in `src/static/css` and JS in `src/static/js`.
6. Repeat step 4 to recompile LESS. (Or optionally setup the watch task to recompile on the fly.)

#### Adding/removing/updating Bower components

1. Edit the list of dependencies in `bower.json`.
2. Re-run `grunt vendor`.
3. Make any needed Gruntfile/template adjustments for consuming the new component (see below).
4. Re-run `grunt compile`.

##### Extra steps for components that contain production assets like fonts and images:

1. Update `exportsOverride` in `package.json` to move the componenets asset types to the predefined asset
   directories, like `/static/fonts/`.
2. If this new package has CSS linking to fonts or images, the paths to them will automatically be rewritten as a
   root relative link like `/static/fonts/`. If you have other asset types you will need to update the
   `string-replace` task in Gruntfile.js.

## Documentation

More thorough documentation coming soon.

## Contributing

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

## Release History

 * 2013-12-16   [v0.3.1](../../tree/v0.3.1)   Update README; small fixes.
 * 2013-12-16   [v0.3.0](../../tree/v0.3.0)   Enable fj- components with JS files in them / more complex `src` structures.
 * 2013-12-16   [v0.2.2](../../tree/v0.2.2)   Add grunt-contrib-compress and grunt-release scripts. Create initial compress task. Add typography demo.
 * 2013-12-13   [v0.2.1](../../tree/v0.2.1)   Add expandables component to `bower.json` dependencies.
 * 2013-12-06   [v0.2.0](../../tree/v0.2.0)   More intelligent directing of assets to `src` and `dist`. Add test page in both `src` and `dist`. Can view with uniminified CSS/JS in `src`. Automatic copying of Bower component assets and replacement of paths in the compiled CSS. Set up JavaScript tasks for both end of `body` and in the `head`.
 * 2013-11-08   [v0.1.3](../../tree/v0.1.3)   Add new fonts that went into `/dist`.
 * 2013-11-08   [v0.1.2](../../tree/v0.1.2)   Improvements to Bower asset management.
 * 2013-11-08   [v0.1.1](../../tree/v0.1.1)   Add new meta files.
 * 2013-11-08   [v0.1.0](../../tree/v0.1.0)   First commit with grunt-cfpb-internal.

## License

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/

---

*This file was generated on Mon Jan 06 2014 10:57:20.*
