const child_process = require('child_process');
child_process.execSync("npm install gettext-parser --save-dev");
const fs = require('fs');
const path = require('path');
const getTextParser = require('/home/jenkins/workspace/workspace/zanata-butlerui/node_modules/gettext-parser');
const translationUtils = require('/home/jenkins/workspace/workspace/zanata-butlerui/translationUtils/parseJSON.js');
const languageMap = require('/home/jenkins/workspace/workspace/zanata-butlerui/translationUtils/languageMap.js');
const fileLoc = "src/assets/js/utils/vendor/i18n/";
fs.readdirSync(fileLoc).forEach(file => {

    if (file.split(".")[1] === "po" && !fs.lstatSync(fileLoc + file).isDirectory()) {
        let contents = fs.readFileSync(fileLoc + file);
        let jsonData = getTextParser.po.parse(contents)
        if (languageMap[file.split(".")[0]]) {
            let stream = fs.createWriteStream("src/assets/js/serverMessages/" + languageMap[file.split(".")[0]] + ".js");
            stream.once('open', function(fd) {
                let parsedJSON = translationUtils.parseJSON(jsonData.translations[""]);
                let jsObject = "var obj=" + JSON.stringify(parsedJSON) + ";module.exports=obj"
                stream.write(jsObject);
                stream.end();
            });
        } else {
            console.log(file.split(".")[0] + " not present in language map. Kindly check... ")
        }

    }
})