var React = require('react');
var CommonActions = require('../../actions/CommonActions');

var ExceptionListItem = React.createClass({ 
	_component:[],
	setCurrentException:function(data){
		CommonActions.setActiveException(data);
	},
    render: function() {
        return (
            <div className={this.props.data.selected==true?"exception-list-item selected":"exception-list-item"} onClick={this.setCurrentException.bind(this,this.props.data.text)}>
               {this.props.data.text}
      		</div>
        );
    },
});

module.exports = ExceptionListItem;