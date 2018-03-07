function parseJSON(json){
	let parsedJSON={};
	for(let k in json){
		if(k !== ""){
			let msgId = json[k]["msgid"],
			msgStr = json[k]["msgstr"][0];
			parsedJSON[msgId] = msgStr;
		}
	}
	return parsedJSON
}

module.exports={
	parseJSON:parseJSON
}