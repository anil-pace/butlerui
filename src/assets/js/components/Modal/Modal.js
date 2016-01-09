var React = require('react');
var mainstore = require('../../stores/mainstore');
var ModalHeader = require('./ModalHeader');
var ModalFooter = require('./ModalFooter');
var Button1 = require("../Button/Button");
var appConstants = require('../../constants/appConstants');
var allSvgConstants = require('../../constants/svgConstants');
var bootstrap = require('bootstrap');

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
    case "scan_bin_barcode":
      component = [];
      footer = [];
      component.push((<div>
        <div className="modalContent removeBorder">
            <div className="image1">
                <img src={allSvgConstants.iconBar} />
            </div>
            <div className="content1">Scan Bin Barcode</div>
            <div className="clearfix"></div>
        </div>    
            <div className="modal-footer removeBorder">
             <div className="buttonContainer center-block">
                <Button1 disabled = {false} text = {"Cancel"} module ={appConstants.PICK_BACK} action={appConstants.CANCEL_SCAN} barcode={modalData.tote_barcode} color={"black"}/></div>
             </div>
       </div>
       ));      
      
      title = "Associate tote with bin";
      break;
    case "pick_checklist":
      component = [];
      footer = [];
      rowData =[];
      title = "Input Extra Details";
  
        var rowData = modalData.checklist_data.map(function(data,index){
            if(modalData.checklist_index === (index+1)){
              return (
                  data.map(function(data1,index1){
                    var keyvalue = Object.keys(data1);
                    console.log("data = " +modalData.checklist_index);
                      return (<div>
                                  <div className="row dataCapture removeBorder">
                                      {keyvalue}
                                  </div>
                                  <div className="row dataCaptureInput removeBorder">
                                      <input type="text" value={keyvalue.value} />
                                  </div>
                              </div>
                        );
                  })
                );
                  
            }
            else if(modalData.checklist_index === null || modalData.checklist_index === undefined){
               return (
                  data.map(function(data1,index1){
                    var keyvalue = Object.keys(data1);
                      return (<div>
                                  <div className="row dataCaptureHead">
                                      {keyvalue}
                                  </div>
                                  <div className="row dataCaptureInput">
                                      <input type="text" value={keyvalue.value} />
                                  </div>
                                 
                              </div>
                        );
                  })
                );
            }
          });
      return (
              component.push((
                <div>
                  {rowData}
                      <div className="modal-footer removeBorder">
                          <div className="buttonContainer center-block">
                                <div className="row removeBorder">
                                    <div className="col-md-6"><input className="btn btn-default checklistButtonClear" type="button" value="Clear All" /></div>
                                    <div className="col-md-6"><input className="btn btn-default checklistButtonSubmit" type="button" value="Submit" /></div>
                                </div>
                          </div>
                     </div>
                </div>
               ))   
               );  
     
      
      break;    
    default:
      component = null;
      title = null;
      return true;
  }
}

var Modal = React.createClass({
  componentDidMount:function(){
    /*$(".modal").click(function(e){
      e.stopPropagation();
        return false;
    });*/
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