var React = require('react');

var MessageNavigation = React.createClass({
    render: function() {
       var colorClass, description;
      if(this.props.color == "lightBlue"){
        colorClass = "lightBlue";
      }
      else if(this.props.color == "lightGreen"){
        colorClass = "lightGreen";
      }else {
        colorClass = "darkOrange";
      };

      if(this.props.screenId == "pick_front_waiting_for_msu"){
        description = "PLACE ORDER";
      }
      else{
        description = this.props.navData.description;
      }

        return (
            	<div className={"row messageNavigation " + colorClass}>
           		   <div className="">
           				   <div className="col-md-6 col-sm-6 msg">
                        {description}
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = MessageNavigation;