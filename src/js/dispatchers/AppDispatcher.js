var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){ 
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
  console.log(action);
};


module.exports = AppDispatcher;