/**
 * Created by gaurav.m on 8/8/17.
 */
var React = require('react');
var allSvgConstants = require('./../../constants/svgConstants');

var Pallet = React.createClass({

    render: function(){

        return (<div className="palletWrapper">
            <img  src={allSvgConstants.pallet}/>
        </div>)



    }
});
module.exports = Pallet;