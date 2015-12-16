var React = require('react');
var PopUp = React.createClass({ 
  
  componentWillMount: function(){
  },
  componentWillUnmount: function(){
  },
  onChange: function(){ 
  },


  render: function(data){ 
      console.log("jindal");
      console.log(this.props.popupData);
      var productInfo=  this.props.popupData;
      var details = [];
      for (var key in productInfo) {
        if (productInfo.hasOwnProperty(key)) {
           details.push((<tr><td>{key} </td>  <td>{productInfo[key]}</td></tr>));
            
        }
      }
      return (
          <div className={"container1 " + (this.props.popupVisible ? 'active' : '')}>
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
              <div className="modal-dialog" role="document">
                <div className="modal-content"> 
                  <div className="modal-header">        
                    <h4 className="modal-title">Product Details</h4>
                  </div>             
                  <div className="modal-body">
                    <table>
                      <tbody>
                        {details}
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