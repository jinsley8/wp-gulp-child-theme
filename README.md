# WP Gulp WordPress Child Theme

This is a child theme boilerplate that uses a gulp workflow to watch, concatenate, minify, and optimize files for production.

## Requirements

This child theme requires [Node.js](https://nodejs.org/en/) 12+ to run Gulp.

### Linux and macOS

To install [Node.js](https://nodejs.org/en/) you can use [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm install node
```

You can also install Node.js using a package manager like for example [Homebrew](https://brew.sh/):

```sh
brew install node
```

Alternatively, you can also download pre-built packages from the [Node.js](https://nodejs.org/en/) website for your particular Operating System.


## Install the Dependencies

Install child theme into the WordPress theme directory at /wp-content/themes/.

Next, we need to install dependencies for **wp-gulp-child-theme**. Change into this directory and install with **npm** or **yarn**.

With **npm**:

```bash
cd wp-gulp-child-theme
npm install
```

With **yarn**:

```bash
cd wp-gulp-child-theme
yarn
```

## Run Gulp to watch for file changes

This child theme uses an automated workflow using **gulp** to watch and process files. Run it with the script provided in its **package.json** file.

```bash
cd wp-gulp-child-theme
yarn dev
```

## WordPress Plugin Dependencies

Some styles and functions are dependent on Elementor and Formidable Forms but can be removed.
