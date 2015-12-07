
var React = require('react');
var mainstore = require('../stores/mainstore');
var todoActions = require('../actions/Actions');
var appConstants = require('../constants/appConstants');
var allSvgConstants = require('../constants/svgConstants');

var PutBackNav = React.createClass({
  getInitialState: function(){
    return {
      screen_id : "put_back_stage",
      classVariable_stage01 : null,
      level : 1,
      message_01 : null,
      message_02 : null,
    }
  },
  componentWillMount: function(){
      if(this.state.screen_id === "put_back_stage"){
         this.state.classVariable_stage01 = "active-navigation";
         this.state.classVariable_stage02 = "passive-navigation";
         this.state.message_01 = appConstants.SCAN_ITEMS;
         this.state.message_02 = appConstants.PLACE_ITEMS;
         this.state.level = 1;
       }
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){
  },
  condtionalChecks : function(){
  },
  render: function(data){ 
      return (
        <div className="navigation">
              <div className={this.state.classVariable_stage01}>
                <div className = "nav-detail">
                  <div className="index"><span>1</span></div>
                  <img src={allSvgConstants.putBackPlace} />
                </div>
                <div className = "action">
                 {this.state.message_01}
                </div>
              </div>
              <div className={this.state.classVariable_stage02}>
                    <div className = "nav-detail">
                        <div className="index"><span>2</span></div>
                        <img src={allSvgConstants.putBackScan} />
                        <div className = "info">Pick</div>
                    </div>
              </div>
          </div>
      )
  }
});

module.exports = PutBackNav;