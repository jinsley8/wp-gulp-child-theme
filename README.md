# WP Gulp WordPress Child Theme

This child theme boilerplate streamlines development using a Gulp workflow to watch, concatenate, minify, and optimize files for production.

## Requirements

**Node.js**: This child theme requires [Node.js](https://nodejs.org/en/) 18 or later to run Gulp.

### Installation of Node.js

To install [Node.js](https://nodejs.org/en/), follow one of these methods:

1. Using [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm install node
```

2. Using [Homebrew](https://brew.sh/):

```sh
brew install node
```

Download pre-built packages from the [Node.js](https://nodejs.org/en/) website for your particular Operating System.

## Optional: Install Bun

[Bun](https://bun.sh/docs/installation#installing) can be used as the package manager in replacement of npm to install packages up to 30x faster. [Bun](https://bun.sh/docs/installation#installing) can be installed via curl, npm, or homebrew:

## Getting Started

### Installation

1. Install the child theme into the WordPress theme directory at /wp-content/themes/.

2. Navigate to the **wp-gulp-child-theme** directory:

3. Choose a package manager to install dependencies:

With **bun**:

```bash
bun install
```

With **npm**:

```bash
npm install
```

### Running Gulp

This child theme uses an automated tasks using **gulp** to watch and process files. Execute the script defined in its **package.json**:

```bash
npm run dev
```
