var React = require('react');
var ExceptionListItem = require('./ExceptionListItem');

var ExceptionList = React.createClass({ 
    _exceptionListItems:[],
    getExceptionListItems:function(){
    	var comp =[];
    	this.props.data.map(function(value,index){
    		comp.push((<ExceptionListItem data={value} />));
    	})
    	this._exceptionListItems = comp;
    },
    render: function() {
    	this.getExceptionListItems();
        return (
            <div className="exception-list">
              { this._exceptionListItems}
            </div>
        );
    },
});

module.exports = ExceptionList;