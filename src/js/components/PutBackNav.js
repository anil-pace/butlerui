
var React = require('react');
var store = require('../stores/store');
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
         this.state.classVariable_stage01 = 'col-lg-11 col-md-11 jumbotron-bg1 nav-box-shadow no-padding';
         this.state.classVariable_stage02 = 'col-lg-1 col-md-1 jumbotron-bg2 nav-box-shadow text-align-center no-padding';
         this.state.message_01 = appConstants.SCAN_ITEMS;
         this.state.message_02 = appConstants.PLACE_ITEMS;
         this.state.level = 1;
       }
    store.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    store.removeChangeListener(this.onChange);
  },
  onChange: function(){
  },
  condtionalChecks : function(){
  },
  render: function(data){ 
      return (
        <div >
            <div className={this.state.classVariable_stage01}>
              <div className='col-md-2 col-sm-2 level-representation'>
                <div className='circle_current level-margin_01 orange'>
                  {this.state.level}
                </div>
                <div className='current-icon'>
                    <img src={allSvgConstants.putBackScan}  className='icon-postion'/>
                </div>    
              </div> 
              <div className='col-md-10 col-sm-10 nav-messages'>
                  <h1>{this.state.message_01} </h1>
              </div>    
            </div>
            <div className={this.state.classVariable_stage02}>
             
                <div className='circle_next dark-blue level-margin_02'>
                    {this.state.level + 1}
               
               </div> 
              
                  <img src={allSvgConstants.putBackPlace}  className='icon-postion next-icon'/>
            
              
                  <h3>{this.state.message_02} </h3>
             
            </div>
        </div>  
      )
  }
});

module.exports = PutBackNav;