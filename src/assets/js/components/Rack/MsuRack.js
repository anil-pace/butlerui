var React = require('react');
var RackRow = require('./RackRow');
var DrawerRow = require('./DrawerRow');

var drawRackStyle = {
    flexGrow:"1",
    flexBasis:"0",
    width:"50%"};

var lastSlot = {
    flexBasis:"4vh"};

var MsuRack = React.createClass({

     totalRackHeight: function(){
            var rackDetails = this.props.rackData.rack_type_rec;
            var totalHeight = 0;
            var eachRowHeight=[];
            var eachRowHeight = rackDetails.map(function(row,index){
                return row[1][0][2];
            });
            for(var i in eachRowHeight) { 
                totalHeight += eachRowHeight[i]; 
            }
               return totalHeight;
        },

        eachRowHeight: function(){
            var rackDetails = this.props.rackData.rack_type_rec;
            var eachRowHeight=[];
            var eachRowHeight = rackDetails.map(function(row,index){
                return row[1][0][2];
            });
            return eachRowHeight;
        },
    componentWillUnmount:function(){
        var lines = document.getElementsByClassName("drawerLine");
        var directionLine = document.getElementsByClassName("LineDirection");
        if(lines.length){
            lines[0].remove();
        }
        if(directionLine.length){
            directionLine[0].remove();
        }

    },
    /*
        Since performing DOM manipulations hence 
        placing the code to draw line in componentDidUpdate
     */
    
    componentDidUpdate:function(){
        /*
            Calling the line function only if the drawerLineDrawn is false 
            and the slot type is drawer.
            drawerLineDrawn is set true once the line is created
         */
        if(!this.drawerLineDrawn && this.props.isDrawer){
        var strEl = (document.querySelectorAll("#rack .activeSlot")[0]);
        strEl = strEl ? strEl.parentNode : null;
        var endEl  = document.querySelectorAll("#drSlot .activeSlot")[0];
        if(strEl && endEl){
        this.connect(strEl, endEl, "#6d6d6d", 3,"drawerLine");
      }
    
  }
  if(this.props.putDirection && this.props.putDirection.length>0 && document.getElementsByClassName("LineDirection").length===0){
    var start = (document.querySelectorAll("#rack .activeSlot")[0]);
    start = start ? start.parentNode : null;
    var end  = (document.querySelectorAll(".specialContainer")[0]);
    this.connect(start, end, "#6d6d6d", 3,"LineDirection");
}
    },
    /*
        function to create line between 2 points
        Args- startEl(HTML node), endEl (HTML node),
        color (Hexadecimal color), thickness(Integer)
     */
    
    connect:function(startEl, endEl, color, thickness,className) {
    var off1 = this.getOffset(startEl);
    var off2 = this.getOffset(endEl);
    // bottom right
    var x1 = off1.left + off1.width;
    var y1 = off1.top + off1.height/2;
    // top right
    var x2 = off2.left ;
    var y2 = off2.top+ off2.height/2;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr

 var htmlLine = "<div class="+className+" style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    document.getElementById('app').innerHTML += htmlLine; 
    this.drawerLineDrawn = true;
},
getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
},
	render: function(){
        var orientationClass,stackText,count,stackCount,fragileClass,stackClass,nestable_count,nestable_direction,stackicon;
        var putDirection = this.props.putDirection;
        var type = this.props.type;
        var isDrawer = this.props.isDrawer;
        var rackDetails = this.props.rackData.rack_type_rec;
        var compartment_details = this.props.rackData.slot_barcodes;
        var slotStart,slotEnd,i;
        var slotIndexList = [];
        var eachRow =[];
        var compartmentArr;
        var selectedDrawerSlot;
        var drawerCompartment=null;
        var drawerRows;
        var drawerCompartmentArr;
        var slotType = this.props.slotType;
        if(compartment_details.length === 1){
            //slotStart = (compartment_details[0].split(".")[3])%10;
            //slotEnd = (compartment_details[0].split(".")[3])%10;
            compartmentArr = compartment_details[0].split(".");
            slotStart = parseInt((compartmentArr[3]).replace(/^0+/, ''));
            slotEnd = parseInt((compartmentArr[3]).replace(/^0+/, ''));
            selectedRackRow =compartmentArr[2]; 
            selectedDrawerSlot = compartmentArr[4];
        }
        else if(compartment_details.length === 2){
            //slotStart = (compartment_details[0].split(".")[3])%10;
            //slotEnd = (compartment_details[compartment_details.length - 1].split(".")[3])%10;
            compartmentArr = compartment_details[0].split(".");
            slotStart = parseInt((compartmentArr[3]).replace(/^0+/, ''));
            slotEnd = parseInt((compartment_details[compartment_details.length - 1].split(".")[3]).replace(/^0+/, ''));
            selectedRackRow =compartmentArr[2]; 
            selectedDrawerSlot = compartmentArr[4];
        }
        
        
        for (i = slotStart; i <= slotEnd; i++) {
            slotIndexList.push(i);
        };
       
        var rackRange = selectedRackRow;
        var totalRackHeight = this.totalRackHeight(); 
        var totalDrawerHeight;
        var drawerSlotData,filteredDrawerSlotData;
        var eachRowHeight = this.eachRowHeight();
        var wrapStyle={
                position: "relative",
                display: "flex",
                "flex-flow": "row",
                "justify-content": "center",
                "flex-grow": 1,
                "flex-wrap": "nowrap",
                "box-sizing": "border-box",               
                overflow: "hidden"

            }

        eachRow = rackDetails.map(function(row,index){
            if(row[0] == selectedRackRow){
                drawerSlotData = row[1];
                
                return (
                        <RackRow slots={row[1]} key={index} slotIndexArray={slotIndexList} rackRange={rackRange} noOfRows={rackDetails.length} totalRackHeight={totalRackHeight} eachRowHeight={eachRowHeight} type={type!=undefined?type:""} slotType={slotType} />
                    );
            }

            else{
                return (
        				<RackRow slots={row[1]} key={index} rackRange={rackRange} noOfRows={rackDetails.length} totalRackHeight={totalRackHeight} eachRowHeight={eachRowHeight} type={type!=undefined?type:""} slotType={slotType} />
        			);
            }
        	});
        /**
         * Logic to draw drawer slots when slot_type is drawer
         */
        if(isDrawer){
           for(var i = 0,len =drawerSlotData.length ; i < len ; i++){
                if(drawerSlotData[i][0].indexOf(selectedDrawerSlot) > -1){
                    filteredDrawerSlotData = drawerSlotData[i];
                    break;
                }
           }
        
            totalDrawerHeight = filteredDrawerSlotData[3];
            drawerCompartmentArr = filteredDrawerSlotData[4];
            /**
             * Needed this self invoking function to bypass JSX 
             * requirement to wrap elements
             */
            drawerCompartment = (function(){
                return(
                        <DrawerRow totalDrawerHeight={totalDrawerHeight} drawerSlotData={drawerCompartmentArr} selectedSlot={selectedDrawerSlot} />
                )
            }())
        }
       if(putDirection){
        nestable_count=putDirection.nestable_count;
        nestable_direction=putDirection.nestable_direction;
        stackCount=putDirection.stacking_count? putDirection.stacking_count[putDirection.stacking_count.length-1]:0;
         if(putDirection.orientation_preference && nestable_count>1){
        orientation="orientation";
        orientationClass = './assets/images/'+ putDirection.nestable_direction+'Nesting.gif?q='+Math.random();
        }
        else if(putDirection.orientation_preference && stackCount>=1){
        orientation="orientation";  
        orientationClass=stackCount>1?'./assets/images/'+ putDirection.stacking+'Stackable.gif?q='+Math.random():'./assets/images/' + putDirection.stacking+'nonStackable.svg';
        }
        else
        {
           orientation="containerHide";
        }             
        stackText=nestable_count>1? _("NEST MAX") : stackCount>1?_("STACK MAX") : _("DO NOT STACK");
        stackicon=nestable_count>1? "stackicons nestingicon" : stackCount>1?"stackicons stackingicon" : "stackicons nonstackingicon";
        fragileClass=putDirection.fragile?"fragile":"containerHide";
        stackClass=nestable_count>1? "stackSize" :stackCount>=1?"stackSize":"containerHide";
        count=nestable_count>1?nestable_count:stackCount>1?stackCount:""

    }
		return (
				<div className="drawWrap" style={wrapStyle}>
                <div className="drawRack" id="rack" style={this.props.type=="small" ? drawRackStyle:{} }>
					{eachRow.reverse()}
                    <div className="lastRow" style={this.props.type=="small" ?  lastSlot:{}} ></div>
               
				</div>
                {putDirection?(
                <div className="specialContainer">
                <img className={orientation} src={orientationClass}></img>   
                <div className={stackClass}>
                        <span className={stackicon}></span>
                        <span className="stackText">{stackText}</span>
                        <span className="stackCount">{count}</span>
                </div> 
                 <div className={fragileClass}>
                        <span className="fragileicons"></span>
                        <span className="fragileText">{_("FRAGILE")}</span>  
                 </div> 
                 </div>
):""}
                {drawerCompartment}
                </div>
			);
	}
});

module.exports = MsuRack;