var React = require('react');

var MessageNavigation = React.createClass({
    render: function() {
       var colorClass, description, headerClass;
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
        headerClass = "col-md-6 col-sm-10 msg";
      }
      else if(this.props.screenId == "pick_front_item_scan"){
        description = "PICK ITEM FROM SHELF";
        headerClass = "col-md-8 col-sm-10 msg";
      }else if(this.props.screenId == "pick_front_pptl_press"){
        description = "PLACE ITEM IN LIGHTED BIN";
        headerClass = "col-md-9 col-sm-10 msg";
      };
console.log(description);
        return (
            	<div className={"row messageNavigation " + colorClass}>
           		   <div className="">
           				   <div className={headerClass}>
                        {description}
                     </div>
           		   </div>
           	</div>
        );
    },
});

module.exports = MessageNavigation;