# WP Gulp WordPress Child Theme

This is a child theme boilerplate that uses a gulp workflow to watch, concatenate, minify, and optimize files for production.

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
