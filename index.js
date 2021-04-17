const fs = require("fs");

module.exports = (files, output)=>{
    let css = "";
    for(let i = 0; i < files.length; i++){
        css += fs.readFileSync(files[i]);
    }

    // css = css.replace(/\s+/g, "");

    fs.writeFileSync(output, css);
}