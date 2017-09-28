var React = require('react');
var CommonActions = require('../../actions/CommonActions');
var mainstore = require('../../stores/mainstore');
var appConstants = require('../../constants/appConstants');
var resourceConstants = require('../../constants/resourceConstants');
var  _updatedQty = 0, _scanDetails = {};


var ShowCounter = React.createClass({
    

  handleTotalQty : function(){
        this._qtyComponent = (
          <div id='textbox'>
            <span id="keyboard" className="current-quantity" key="text_1">{_updatedQty}</span>
            <span className="separator">/</span>
            <span className="total-quantity">{parseInt(_scanDetails.total_qty)}</span>
          </div>
        );
    

    },
    render: function(data) {
        
            this.handleTotalQty();
            _updatedQty = parseInt(this.props.scanDetails.current_qty);
            _scanDetails = this.props.scanDetails;

        return ( < div className = "showCounter-wrapper" >
            {this._qtyComponent}
            < /div>
        )

    }
});

module.exports = ShowCounter;
