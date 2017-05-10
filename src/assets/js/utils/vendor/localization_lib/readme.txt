Include Icu.js and translate.js library
Install Po edit software
Create a new catalog
Change source code file text as mentioned in localeplanet lib

Run the command: 
 
 xgettext --from-code=UTF-8 src/assets/js/serverMessages/*.js -L JavaScript -j -o src/assets/js/utils/vendor/i18n/english.po

Open Po edit and open the chinese.po file and you can see the text extracted from the files

After edit PO file make it json with the command

python src/assets/js/utils/vendor/localization_lib/po_to_json.py src/assets/js/utils/vendor/i18n/chinese*.po

{
	"resource_type": "inventory",
	"complete_data": [{
		"date": "2016-10-25",
		"opening_stock": 100000,
		"items_put": 4976,
		"items_picked": 11098,
		"cbm_used": 780,
		"total_skus": 1112,
		"warehouse_utilization": 43 # in %,
		"category_data": [{
			"category_type": "apparel",
			"cbm_used": 100,
			"days_on_hand": 4.5,
			"warehouse_utilization": 10 # in %
		},{
"category_type": "others" # default,
"cbm_used": 207,
"days_on_hand": 2,
"warehouse_utilization": 33
}]
	},{
"date": "2016-10-24",
"opening_stock": 47000,
"items_put": 20040,
"items_picked": 400,
"cbm_used": 408,
"total_skus": 780,
"warehouse_utilization": 23,
"category_data": [{
"category_type": "others",
"cbm_used": 77,
"days_on_hand": 1,
"warehouse_utilization": 23
}]
}]
}
