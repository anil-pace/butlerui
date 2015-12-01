var React = require('react');
var AddItem = require('./LoginForm');
var List = require('./List');
var store = require('../stores/store');
var todoActions = require('../actions/Actions');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: store.getList()
    }
  },
  componentDidMount: function(){
    store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    store.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    todoActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: store.getList()
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;