var React = require('react');
var Bin = require('./Bin.react');

var Bins = React.createClass({
	 componentDidMount: function() {
	 	var clientHeight = /*window.innerHeight - document.getElementsByClassName('head')[0].clientHeight -*/ document.getElementsByClassName('bins')[0].clientHeight;
	 	var clientWidth = document.getElementsByClassName('bins')[0].clientWidth;
	 	console.log(Math.min((clientHeight/window.innerHeight)*100/8,(clientWidth/window.innerWidth)*100/4));
    	console.log("offset-height  "+ clientHeight);
    	var y = Math.min((clientHeight)/2,(clientWidth)/8);
    	var myElements = document.querySelectorAll(".bin");
    	for (var i = 0; i < myElements.length; i++) {
    		//myElements[i].style.height = y + "%";
    		myElements[i].style.height = y-15 + "px";
    		myElements[i].style.width = y-15 + "px";
		}
  	},
    render: function() {
    	
        return (
            	 <div className="bins">
            	 	{
            	 		(function(){
            	 			var l =[];
            	 			for(var j = 0 ;j<2 ;j++){
            	 			var list = [];
            	 			var i = 0;
            	 			for( i = i ; i<8 ; i++){
            	 				list.push(<Bin />);
            	 			}
            	 			l.push((
            	 				<div className="bin-row">
            	 					{list}
            	 				</div>
            	 				));
            	 		}
            	 		return l;
            	 		})()
            	 	}
            	 </div>
        );
    },
});

module.exports = Bins;