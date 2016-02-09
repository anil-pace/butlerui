var React = require('react');
var CommonActions = require('../actions/CommonActions');

var ImageComponent = React.createClass({

	selectItem:function(title){
		var data = {
                    "event_name": "item_selected",
                    "event_data": title
                };
                console.log("data");
                console.log(data["event_data"]);
		CommonActions.postDataToInterface(data);
	},

    render: function() {
        return (
            <div className="itemImage" onClick={ this.props.imageClickable== true ? this.selectItem.bind(this,this.props.data.title) : ""}>
           		<img className="img-responsive" src={this.props.data.imgURL} alt="PLACEHOLDER" />
           	</div>
        );
    }
});

module.exports = ImageComponent;