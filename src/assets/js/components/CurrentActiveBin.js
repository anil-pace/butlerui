var React = require('react');
var Header = require('./Header');
var allresourceConstants = require('../constants/resourceConstants');

var CurrentActiveBin = React.createClass({
  render: function() {
    return (
      <div className='current-bin-wrapper'>
        <div
          className={
            'p-put-details current-bin ' +
            (this.props.selected ? 'selected' : '')
          }
        >
          <div
            style={{
              background: '#0390FF',
              fontSize: '4rem'
            }}
            className='p-put-head'
          >
            {' '}
            {this.props.details.currBin || '--'}{' '}
          </div>
        </div>
        <div
          style={{ color: '#000000', fontSize: '2.2rem' }}
          className='bin-text'
        >
          {' '}
          {_(allresourceConstants.CURR_BIN)}{' '}
        </div>
      </div>
    );
  }
});

module.exports = CurrentActiveBin;
