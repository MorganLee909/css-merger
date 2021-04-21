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

let merge = (files, output, options)=>{
    let css = "";
    for(let i = 0; i < files.length; i++){
        if(files[i].substring(files[i].length - 4, files[i].length) === ".css"){
            css += fs.readFileSync(files[i]);
        }else if(options.recursive === true && fs.lstatSync(files[i]).isDirectory() === true){
            if(files[i][files[i].length-1] !== "/") files[i] += "/";
            css += readDirectoryFiles(files[i]);
        }
    }

    // css = css.replace(/\s+/g, "");

    fs.writeFileSync(output, css);
}

module.exports = merge;