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
      else if(this.props.screenId == "pick_front_item_scan"){
        description = "PICK ITEM FROM SHELF";
      }else if(this.props.screenId == "pick_front_pptl_press"){
        description = "PLACE ITEM IN LIGHTED BIN";
      };
console.log(description);
        return (
            	<div className={"row messageNavigation " + colorClass}>
           		   <div className="">
           				   <div className="col-md-8 col-sm-10 msg">
                        {description}
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = MessageNavigation;