# CSSmerger

## Introduction
CSSmerger is a tool for bundling all of your css files into a single file in order to easily modularize your CSS while still only linking a single file in your HTML.

## Installation
```sh
npm install cssmerger
```

## Usage
Run the CSSmerger function early in your code, in your 'index.js' file or other entry point. It will merge the selected files into the selected output file when your web server is started.



```js
/**
 * @param {Array<String>} files - The files and directories to be merged
 * @param {String} output - The file to be output
 * @param {Object} options - Any options to set
 */
const cssmerger = require("cssmerger");

let options = {
    recursive: true,
    minimize: false
};

let files = [
    "./path/to/file.css",
    "./path/to/entire/directory"
];

cssmerger(files, "./path/to/output.css", options);
```

## Options

| Option | Properties | Description |
| ------ | ---------- | ----------- |
| recursive | default=true | When true, will recursively search all sub-directories for all CSS files. When false, will use only the CSS files that are a direct child of any directories |
| minimize | defaut=false | When true will shrink the file size as much as possible. False will leave the file easier to read and work with.

## Notes

1. You may pass in either CSS files directly or a directory to read all of the files within it.

2. Will only read CSS files. Other files will be ignored.

3. Do not rely on the "cascading" aspect of CSS as the order of the CSS may be unexpected. It is best to rely on specificity.

4. You can call the function as many times as you want to create different CSS files for use with your HTML.