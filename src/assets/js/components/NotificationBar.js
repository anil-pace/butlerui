var React = require('react');

var NotificationBar = React.createClass({
    render: function() {
      var colorClass,description;
      if(this.props.color == "lightGray"){
        colorClass = "lightGray";
      }
      else {
        colorClass = "";
      };

      if(this.props.screenId == "pick_front_waiting_for_msu"){
        description = "SELECT ITEM TO ORDER";
      }
      else{
        description = this.props.notificationData.description;
      };
        return (
            	<div className="row">
           		   <div className="notificationBar">
           				   <div className={"col-md-6 col-sm-6 col-xs-12 notifier " + colorClass} >
                          <div className="">
                              {description}
                          </div>
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = NotificationBar;