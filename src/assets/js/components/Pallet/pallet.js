/**
 * Created by gaurav.m on 8/8/17.
 */
var React = require('react');
var allSvgConstants = require('./../../constants/svgConstants');

var Pallet = React.createClass({

    render: function(){

        return (<div className="palletWrapper">
            {/* TODO: Image need to be changed when given by UX Team*/}
            <img  src={allSvgConstants.pallet}/>
            {/*<div className="palletImage"/>*/}
        </div>)



    }
});
module.exports = Pallet;