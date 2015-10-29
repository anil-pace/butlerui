
var React = require('react');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');
var CreateBox = require('./CreateBox');
var BoxDiv = React.createClass({
  getInitialState: function(){
    return {
      index : null,
      stageLevel : 1,
      itemData : null,
      boxData : null,
      boxIdIndex : 0,
      search_receive_key : false,
      searchKeyInput : null
    }
  },
  showRKlinetable : function(index){
  	this.setState({
  	   index : index
  	});
  },
  openForm: function(){
  	this.setState({
  		stageLevel: 3
  	})
  },
  generalFunctions : function(arg, e){
      if(arg === 'scan_barcode'){
        var receivekeySelected = this.props.receivedData[0].receive_keys[this.state.index].receive_key;
         todoActions.scanBarcode(this.refs.barcode.getDOMNode().value, receivekeySelected);
      }else if(arg === 'search_receive_key'){ console.log(e);
        if(e.keyCode == 13){
         /* this.setState({
            search_receive_key :true,
            searchKeyInput :this.refs.searchKey.getDOMNode().value
          });*/
        }
      } 

  },
  searchReceiveKey : function(event){
    console.log(event);
  },
  componentWillMount: function(){
    todoStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this.onChange);
  },
  onChange: function(){ 
    this.setState({
      itemData :todoStore.scanBarcode(),
      boxData :todoStore.boxData()
    });
  },
  handleChange : function(){
    this.setState({
      boxData :todoStore.boxData(),
      boxIdIndex : this.refs.box_type_id.getDOMNode().value
    });

  },	
  render: function(data){ 
    var rkLines, chooseProduct, stageLevel,productSku,chooseBox, dimensions, bd1,bd2,bd3;
    if(this.state.itemData != null){
      chooseProduct = this.state.itemData.map(function(prod_id, index){
          return(
            <option key={index} >{prod_id.item_uid}</option>
          )
      })
      boxIdIndex = this.state.boxIdIndex;
      productSku = this.state.itemData[0].pdfa_values.product_sku;
      chooseBox = this.state.boxData[0].map(function(data, index){
        return(
          <option selected={index == boxIdIndex ? true : false}  key={index} value={index}>{data.box_type_id}</option>
        )

      })
      dimensions = <CreateBox boxData={this.state.boxData} selectedOption={this.state.boxIdIndex}/>
    }
 
       
  	
  	stageLevel = this.state.stageLevel === 3 ? 'block':'none'
  	if(this.state.index !== null ){
  		rkLines = this.props.receivedData[0].receive_keys[this.state.index].rk_lines.map(function(item, index){
		    return (
		       <li key={index} className="list-group-item">
		          <span >
			          {item.sku}
			        </span>
		       </li>
		     )
		   })
  	}
    var searchkeyFlag = this.state.search_receive_key;
    var searchKeyInput = this.state.searchKeyInput;
  	var receiveKeys = this.props.receivedData[0].receive_keys.map(function(item, index){
      if(searchkeyFlag == true){console.log(searchKeyInput);
        if (item.receive_key.toUpperCase().search(searchKeyInput.toUpperCase()) != -1) {
           return (
             <li key={index} className="list-group-item">
                  <span  onClick={this.showRKlinetable.bind(this, index)}>
                  {item.receive_key}
                </span>
             </li>
           )
        }
      }else{
       return (
         <li key={index} className="list-group-item">
              <span  onClick={this.showRKlinetable.bind(this, index)}>
  	          {item.receive_key}
  	        </span>
         </li>
       )
     }
   }.bind(this));
    return (
    	<div className="panel panel-default">
	        <div className='list-group'>
		       <input type="text" ref="searchKey" id='searchKey' className="form-control"  placeholder="TESTING FIELD" onKeyPress={this.searchReceiveKey} />
		        	QC Receive Keys
		        <ul className='receiveKey'>
		        	{receiveKeys}
		        </ul>
	        </div>
	        <div className='panel-heading'>
	        	{rkLines}
	        	<button onClick={this.openForm}> QC New Box </button>
	        </div>
	        <div className='panel-heading'  style={{display:stageLevel}}>
	        	<form onSubmit={this.scanBarcode}>
	        		Barcode : <input type='text' ref='barcode' id='barcode' placeholder='Scan Barcode' onKeyPress={this.generalFunctions.bind(this, 'scan_barcode')} />
              Choose Product: <select>
                {chooseProduct}
                <option>Create New</option>
              </select>
              Sku <input type='text' value={productSku} />
	        	</form>
            Box Details <select ref='box_type_id' onChange={this.handleChange}>
                {chooseBox}
                <option value='create_new_box'>Create new box</option>
            </select>
            {dimensions}
	        </div>
          <div className='panel-heading'  style={{display:stageLevel}}>
            
          </div>
        </div>
    )
  }
});

module.exports = BoxDiv;