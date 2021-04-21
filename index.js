const fs = require("fs");

let readDirectoryFiles = (dir)=>{
    let files = fs.readdirSync(dir);
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

    let css = "";
    for(let i = 0; i < files.length; i++){
        let file = `${dir}${files[i]}`;
        if(file.substring(file.length - 4, file.length) === ".css"){
            css += fs.readFileSync(`${file}`);
        }else if(fs.lstatSync(file).isDirectory() === true){
            css += readDirectoryFiles(`${file}/`);
        }
    }

    return css;
}

let minimize = (css)=>{
    css = css.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, "");
    let lines = css.split("\n");

    for(let i = 0; i < lines.length; i++){
        lines[i] = lines[i].trim();
    }

    css = lines.join("");

    return css;
}

let merge = (files, output, options = {})=>{
    opts = {
        recursive: (options.recursive === false) ? false : true,
        minimize: (options.minimize === true) ? true : false
    };


    let css = "";
    for(let i = 0; i < files.length; i++){
        if(files[i].substring(files[i].length - 4, files[i].length) === ".css"){
            css += fs.readFileSync(files[i]);
        }else if(opts.recursive === true && fs.lstatSync(files[i]).isDirectory() === true){
            if(files[i][files[i].length-1] !== "/") files[i] += "/";
            css += readDirectoryFiles(files[i]);
        }
    }
    
    if(options.minimize === true) css = minimize(css);

    fs.writeFileSync(output, css);
}

module.exports = merge;