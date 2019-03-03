var fs = require('fs');
const pdf = require('pdf-parse');

 


var ChangePdfToText = (pdf_path, text_path) => {
    return new Promise((resolve, reject) => {

        let dataBuffer = fs.readFileSync(pdf_path);
        pdf(dataBuffer).then(function(data) {
            var modDataBuffer = data.text.replace(/(\r\n|\n|\r)/gm, " ");
            fs.writeFileSync(text_path, modDataBuffer, function(err) {
                if (err) { console.error("[!] "+err); reject({error:err}); return; }
                resolve({error:"ok"});
            });
        });
    }).catch((err) => {
        return err;
    });
}



var main = async() => {
    var args = process.argv.slice(2);
    if(args.length != 2) {
        console.error("[!] Please specify parameter.");
        process.exit(-1);
    }

    await ChangePdfToText(args[0], args[1]);
}




main();
