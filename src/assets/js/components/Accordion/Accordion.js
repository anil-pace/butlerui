var React = require('react');
var Panel = require('./Panel');

/**
 * React component to plot a single drawer row
 */

var Accordion = React.createClass({
	
getInitialState: function(){
    return { openPanelIndex: this.props.options.openPanelIndex }
  },
  buildSections: function(panelList){
    var sections = panelList.map(this.buildSection)
    return sections;
  },
  buildSection: function(panel, index){
      var openStatus = (index === this.state.openPanelIndex);
      /* Remember to add a 'key'. React wants you to add an identifier when you instantiate a component multiple times */
      return <Panel key={index} idx = {index} data={panel} toggleOne={this.toggleOne} open={openStatus} />
  },
  toggleOne: function(id){
    if(this.state.openSectionIndex === id){
      this.setState({openPanelIndex: -1});
    } else {
      this.setState({openPanelIndex: id});
    }
  },
	render: function(){
	var panels = this.buildSections(this.props.options.data);
	return (<div className="accordion" >
			{panels}
		</div>)
				
				
		
	}
});
Accordion.propTypes = {
  
};
module.exports = Accordion;