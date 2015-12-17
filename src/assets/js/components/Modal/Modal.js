var React = require('react');
var mainstore = require('../../stores/mainstore');
var ModalHeader = require('./ModalHeader');
var ModalFooter = require('./ModalFooter');

var component,title;

function getStateData(){
  var modalType = mainstore.getModalType();
  var modalData = mainstore.getModalContent();
  loadComponent(modalType,modalData)
  return {
      data:modalData,
      type:modalType
    };
}

function loadComponent(modalType,modalData){
  switch(modalType){
    case "product-detail":
      component = [];
      for (var key in modalData) {
        if (modalData.hasOwnProperty(key)) {
           component.push((<div className="row"><div className="col-md-6 key">{key} </div>  <div className="col-md-6 value">{modalData[key]}</div></div>));
        }
      }
      title = "Product Information";
      break;
    case "bin-info":
      component = [];
      for (var key in modalData[0]) {
        if (modalData[0].hasOwnProperty(key)) {
           component.push((<div className="col-md-4 heading">{key} </div>));
        }
      }
      modalData.map(function(value,index){
       for (var key in value) {
        if (value.hasOwnProperty(key)) {
           component.push((<div className="col-md-4 value">{value[key]} </div>));
        }
      }
      })
      title = "Bin Info";
      break;
    default:
      component = null;
      title = null;
      return true;
  }
}

var Modal = React.createClass({
  componentDidMount:function(){
    console.log("ashish");
  },
  componentWillMount: function(){
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState(getStateData());
  },
  render: function () {
    return (<div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader title={title}/>
             <div className="modal-body">
              {component}
            </div>
          </div>
        </div>
      </div>)
  }
});

module.exports = Modal;