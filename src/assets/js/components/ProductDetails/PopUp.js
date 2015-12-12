var React = require('react');
var mainstore = require('../stores/mainstore');
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');

var PopUp = React.createClass({
  getInitialState: function(){
    return {
       
    }
    
  }, 
  
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
  },


  render: function(data){ 
      
      var productInfo1 =  this.props.popupData;
      var x = [];
      
        for (var key in productInfo1) {
        if (productInfo1.hasOwnProperty(key)) {
            //alert(key + " -> " + productInfo1[key]);
           x.push((<tr><td>{key} </td>  <td>{productInfo1[key]}</td></tr>));
            
        }
      }
      
      

      console.log(this.props.popupData)
      return (
      
           
  <div className={"container1 " + (this.props.popupVisible ? 'active' : '')}>
        
  
  

  
  <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      
      <div className="modal-body">
        <table>
          <tbody>
          {x}
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</div>
</div>
  

      
  
  
      

        

        
      )
  }
});

module.exports = PopUp;