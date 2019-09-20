var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var BinSideIndicator = React.createClass({
  processData: function() {
    var data = Object.assign({}, this.props.mapDetails || {});
    var leftCol = [],
      leftColCount,
      rightColCount,
      selectedGroup = this.props.selectedGroup,
      isSelected,
      rightCol = [],
      maxBlockCount = 0,
      maxLeftCount = 0,
      maxRightCount = 0,
      maxBlockHeight = 0,
      style = null,
      maxWidth = null;

    for (var key in data) {
      if (data[key] === allresourceConstants.BIN_GROUP_LEFT) {
        maxLeftCount++;
      } else if (data[key] === allresourceConstants.BIN_GROUP_RIGHT) {
        maxRightCount++;
      }
    }
    maxBlockCount = maxLeftCount > maxRightCount ? maxLeftCount : maxRightCount;
    maxBlockHeight = 40 / maxBlockCount;
    maxWidth = (maxBlockHeight / 100) * 150;
    style = {
      height: maxBlockHeight + '%',
      width: maxWidth <= 38 ? maxWidth : 38
    };

    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        isSelected = selectedGroup === k ? 'sel' : '';
        if (data[k] === allresourceConstants.BIN_GROUP_LEFT) {
          leftCol.push(<li key={k} style={style} className={isSelected}></li>);
        } else if (data[k] === allresourceConstants.BIN_GROUP_RIGHT) {
          rightCol.push(<li key={k} style={style} className={isSelected}></li>);
        }
      }
    }
    switch (leftCol.length) {
      case 1:
        leftColCount = 'one';
        break;
      case 2:
        leftColCount = 'two';
        break;
      case 3:
        leftColCount = 'three';
        break;
      case 4:
        leftColCount = 'four';
        break;
      default:
        leftColCount = 'zero';
    }
    switch (rightCol.length) {
      case 1:
        rightColCount = 'one';
        break;
      case 2:
        rightColCount = 'two';
        break;
      case 3:
        rightColCount = 'three';
        break;
      case 4:
        rightColCount = 'four';
        break;
      default:
        rightColCount = 'zero';
    }

    return {
      leftCol: leftCol,
      rightCol: rightCol,
      leftColCount: leftColCount,
      rightColCount: rightColCount
    };
  },

  highLightActiveSide: function(binsData) {
    var leftSide = [1, 2, 3, 7, 8, 9];
    var rightSide = [4, 5, 6, 10, 11, 12];
    var activeBin;
    for (var i = 0; i < binsData.ppsbin_list.length; i++) {
      if (binsData.ppsbin_list[i].selected_state === true) {
        activeBin = parseInt(binsData.ppsbin_list[i].ppsbin_id, 10);
      }
    }
    if (leftSide.includes(activeBin)) {
      return 'LEFT';
    } else {
      return 'RIGHT';
    }
  },
  render: function() {
    var processBinsData = this.highLightActiveSide(this.props.binsData);
    var leftBackground, rightBackground;
    if (processBinsData === 'LEFT') {
      leftBackground = '#0090ff';
      rightBackground = '#ffffff';
    } else {
      leftBackground = '#ffffff';
      rightBackground = '#0090ff';
    }
    var transformStyle = {
      transform: 'rotate(' + (Number(this.props.orientation || 0) + 'deg)')
    };
    var mapStructure = this.processData();
    return (
      <div
        style={transformStyle}
        className={'binMapWrapper ' + this.props.screenClass}
      >
        <div className='mapCont'>
          <div
            style={{
              border: '1px solid grey',
              height: '50px',
              background: leftBackground
            }}
            className={'col1 ' + mapStructure.leftColCount}
          >
            <ul>{mapStructure.leftCol}</ul>
          </div>
          <div style={{ marginTop: '35%' }} className='col2 spriteIcons'></div>
          <div
            style={{
              border: '1px solid grey',
              height: '50px',
              background: rightBackground
            }}
            className={'col3 ' + mapStructure.rightColCount}
          >
            <ul>{mapStructure.rightCol}</ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BinSideIndicator;
