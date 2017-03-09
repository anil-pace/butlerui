var React = require('react');

/**
 * React component to plot a single drawer row
 */
var Panel = React.createClass({
	
	_toggleContent:function(){
		this.props.toggleOne(this.props.idx);
	},
	render: function(){
	return (<div className={"panel panel" + this.props.idx}>
        <h2 className="panelTitle" onClick={this._toggleContent} >{this.props.data.title}</h2>
        <p className={this.props.open ? "panelContent expand" : "panelContent collapse"}>{this.props.data.content}</p>
      </div>)	
		
	}
});
Panel.propTypes = {
  
};
module.exports = Panel;