var React = require("react");

var Orderline = require("./Orderline");

var ToolLineContainer = React.createClass({
  getInitialState: function() {
    return {
      lineDict: { 0: null },
      current_line_id: 0,
      lineDictRefs: {},
      id_max: 0
    };
  },
  getLineMarkup(lineName, lineId, isVisible) {
    switch (lineName) {
      case "orderline":
        return (
          <div key={lineId} className={isVisible ? "" : "hidden"}>
            <Orderline
              key={lineId}
              lineId={lineId}
              ref={t =>
                (this.state.lineDictRefs[lineId] = t)
              }
            />
          </div>
        );
    }
  },
  getLineAggregate() {
    return Object.keys(this.state.lineDict).map(lineId =>
      this.state.lineDictRefs[lineId].getLineDetails()
    );
  },
  addLine() {
    var newLineId = this.state.id_max + 1;
    this.setState({
      id_max: newLineId,
      current_line_id: newLineId,
      lineDict: {
        ...this.state.lineDict,
        [newLineId]: null
      }
    });
    console.log(this.state);
  },
  lineSelect(event) {
    this.setState({current_line_id: parseInt(event.target.value)});
  },
  render() {
    return (
      <div>
        <select className="devmode-select" onChange={this.lineSelect} required value={this.state.current_line_id}>
          <option value="" disabled hidden>
            Select a line
          </option>
          {Object.keys(this.state.lineDict).map(lineId => (
            <option key={lineId} value={lineId}>
              {this.props.lineName} {lineId}
            </option>
          ))}
        </select>
        {Object.keys(this.state.lineDict).map(lineId => (
            this.getLineMarkup(this.props.lineName, lineId, (lineId == this.state.current_line_id) ? true : false)   
          ))}
        <br />
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Add Line"
          onClick={this.addLine}
        />
        &emsp;
        <input
          type="button"
          className="devtoolBtn"
          defaultValue="Delete Line"
          onClick={this.deleteLine}
        />
      </div>
    );
  }
});
module.exports = ToolLineContainer;
