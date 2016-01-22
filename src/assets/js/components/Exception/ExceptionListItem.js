var React = require('react');
var CommonActions = require('../../actions/CommonActions');

var ExceptionListItem = React.createClass({ 
	_component:[],
	setCurrentException:function(data){
     var data1 = {
        "event_name": "",
        "event_data": {}
    };
    data1["event_name"] = "exception";
    data1["event_data"]["event"] = data["event"];
    CommonActions.postDataToInterface(data1);
		CommonActions.setActiveException(data.text);
	},
    render: function() {
        if(this.props.action!=undefined && this.props.action == true)
        return (
            <div className={this.props.data.selected==true?"exception-list-item selected":"exception-list-item"} onClick={this.setCurrentException.bind(this,this.props.data)}>
               {this.props.data.text}
      		</div>
        );
      else
        return (
            <div className={this.props.data.selected==true?"exception-list-item selected":"exception-list-item"} >
               {this.props.data.text}
            </div>
        );
    },
});

module.exports = ExceptionListItem;