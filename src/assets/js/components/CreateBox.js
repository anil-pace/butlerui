var React = require('react');
var store = require('../stores/store');
var todoActions = require('../actions/Actions');

var CreateBox = React.createClass({
	render: function(data){
		var bd1,bd2,bd3;
		var selectedOption = this.props.selectedOption;
		var t = this.props.boxData[0].map(
			function(data, index){
				if(index == selectedOption){
					bd1 = data.dimensions[0]
					bd2 = data.dimensions[1];
					bd3 = data.dimensions[2];
				}
		})
		return(<div>
		  <input type='text' ref='dimension1' value={bd1}/>
          <input type='text' ref='dimension2' value={bd2}/>
          <input type='text' ref='dimension3' value={bd3}/>
          </div>
		)
	}
});
module.exports = CreateBox;