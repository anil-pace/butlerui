Include Icu.js and translate.js library
Install Po edit software
Create a new catalog
Change source code file text as mentioned in localeplanet lib

Run the command: 
 
 xgettext --from-code=UTF-8 components/sripts/*.js -L JavaScript -j --package-name=butler_interface_kerry --package-version=1.1 -o static/js/i18n/chinese.po

Open Po edit and open the chinese.po file and you can see the text extracted from the files

After edit PO file make it json with the command

python build/developmnt/po2json/po2json.py build/development/js/i18n/chinese*.po