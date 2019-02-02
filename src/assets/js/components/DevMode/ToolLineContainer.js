var React = require("react");

var Orderline = require("./Orderline");
var PutExpectationLine = require("./PutExpectationLine");
var BarcodeLine = require("./BarcodeLine");

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
              ref={t => (this.state.lineDictRefs[lineId] = t)}
            />
          </div>
        );
      case "putline":
        return (
          <div key={lineId} className={isVisible ? "" : "hidden"}>
            <PutExpectationLine
              key={lineId}
              lineId={lineId}
              ref={t => (this.state.lineDictRefs[lineId] = t)}
            />
          </div>
        );
      case "barcodeline":
        return (
          <div key={lineId} className={isVisible ? "" : "hidden"}>
            <BarcodeLine
              key={lineId}
              lineId={lineId}
              ref={t => (this.state.lineDictRefs[lineId] = t)}
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
  },
  lineSelect(event) {
    this.setState({ current_line_id: parseInt(event.target.value) });
  },
  render() {
    return (
      <div>
        <select
          className="line-select"
          onChange={this.lineSelect}
          required
          value={this.state.current_line_id}
        >
          <option value="" disabled hidden>
            Select a line
          </option>

          {Object.keys(this.state.lineDict).map(lineId => (
            <option key={lineId} value={lineId}>
              {this.props.lineName} {lineId}
            </option>
          ))}
        </select>
        &emsp;
        <input
          type="image"
          src="assets/images/devtools/add-line.png"
          className="addLineBtn"
          onClick={this.addLine}
        />
        &emsp;
        <input
          type="image"
          className="delLineBtn"
          src="assets/images/devtools/minus-line.png"
          onClick={this.deleteLine}
        />
        {Object.keys(this.state.lineDict).map(lineId =>
          this.getLineMarkup(
            this.props.lineName,
            lineId,
            lineId == this.state.current_line_id ? true : false
          )
        )}
      </div>
    );
  }
});
module.exports = ToolLineContainer;
