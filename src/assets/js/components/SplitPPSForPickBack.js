var React = require('react');
var allresourceConstants = require('../constants/resourceConstants');

var SplitPPS = React.createClass({

    processData: function () {
        var data = Object.assign({}, (this.props.groupInfo || {}));
        var leftCol = [],
            dockedGroup = this.props.docked || [],
            undockAwaited = this.props.undockAwaited || [],
            wrongUndock = this.props.wrongUndock || [],
            selectedBin = this.props.selectedbin || [],
            rightCol = [], centerCol = [], centerTopCol = [], maxBlockCount = 0, maxLeftCount = 0, maxRightCount = 0, maxBlockHeight = 0, maxCenterCount = 0, maxCenterTopCount = 0, style = null, maxWidth = 0;
        dockedGroup = dockedGroup.filter(val => !selectedBin.includes(val));
        for (var key in data) {
            if (data[key] === allresourceConstants.BIN_GROUP_LEFT) {
                maxLeftCount++;
            }
            else if (data[key] === allresourceConstants.BIN_GROUP_RIGHT) {
                maxRightCount++;
            }
            else if (data[key] === allresourceConstants.BIN_GROUP_CENTER) {
                maxCenterCount++;
            }
            else if (data[key] === allresourceConstants.BIN_GROUP_CENTER_TOP) {
                maxCenterTopCount++;
            }
        }

        console.log("===================================>");
        console.log("dockedGroup" + dockedGroup);
        console.log("undockAwaited" + undockAwaited);
        console.log("wrongUndock" + wrongUndock);
        maxBlockCount = maxCenterTopCount > 0 ? maxCenterTopCount : (maxLeftCount > maxRightCount) ? maxLeftCount : maxRightCount;

        maxBlockHeight = maxCenterTopCount > 0 ? 75 / maxBlockCount : 50 / maxBlockCount;
        maxWidth = ((maxBlockHeight / 100) * 360).toFixed(3);

        style = {
            height: (maxBlockHeight >= 50 ? 25 : maxBlockHeight) + "%",
            width: (maxWidth <= 100 ? maxWidth : 100) + 'px'
        }
        if (this.props.displayBinId) {
            fontSize = maxCenterTopCount > 0 ? ((70 / 28) * maxBlockHeight) + 'px' : ((50 / 28) * maxBlockHeight) + 'px';
            padding = "10%";

            /* Start =>special condition for pick_front_slot_scan to limit font size when only one bin is there */
            if (parseInt(fontSize, 10) > parseInt("88px", 10)) { fontSize = 62.5 + 'px', padding = 0 + '%'; }
            /* End */

            style = Object.assign({}, style, {
                color: '#fff',
                'fontSize': fontSize,
                'padding': padding
            })
        }
        var dockedclassName = this.props.ruleset === 'withBorder' ? "dockedCont bottomBorderLeft" : "dockedCont";
        var undockclassName = this.props.ruleset === 'withBorder' ? "undockedCont bottomBorderLeft" : "undockedCont";
        var wrongUndockclassName = this.props.ruleset === 'withBorder' ? "wrongUndockCont bottomBorderLeft" : "wrongUndockCont";
        var selectedbinclassName = this.props.ruleset === 'withBorder' ? "selectedbinCont bottomBorderLeft" : "selectedbin";

        var dockedRightclassName = this.props.ruleset === 'withBorder' ? "dockedCont bottomBorderRight" : "dockedCont";
        var undockRigtclassName = this.props.ruleset === 'withBorder' ? "undockedCont bottomBorderRight" : "undockedCont";
        var wrongUndockRightclassName = this.props.ruleset === 'withBorder' ? "wrongUndockCont bottomBorderRight" : "wrongUndockCont";
        var selectedbinRightclassName = this.props.ruleset === 'withBorder' ? "selectedbinCont bottomBorderRight" : "selectedbin";

        for (var k in data) {
            if (data.hasOwnProperty(k)) {

                if (data[k] === allresourceConstants.BIN_GROUP_LEFT) {

                    if (dockedGroup.indexOf(k) >= 0) {
                        leftCol.push(<li key={k} style={style} className={dockedclassName}>
                            <span className={this.props.ruleset === 'withBorder' ? "" : "docked"}>{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (undockAwaited.indexOf(k) >= 0) {
                        leftCol.push(<li key={k} style={style} className={undockclassName}>
                            <span className="undock left">&nbsp;</span>
                        </li>);
                    }
                    else if (wrongUndock.indexOf(k) >= 0) {
                        leftCol.push(<li key={k} style={style} className={wrongUndockclassName}>
                            <span className="wrongUndock left">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (selectedBin.indexOf(k) >= 0) {
                        leftCol.push(<li key={k} style={style} className={selectedbinclassName}>
                            <span className="selectedbin">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else {
                        leftCol.push(<li key={k} style={style} className={this.props.ruleset === 'withBorder' ? "bottomBorderLeft padding" : "padding"} ><span>{this.props.displayBinId ? k : null}</span></li>);
                    }

                }
                else if (data[k] === allresourceConstants.BIN_GROUP_RIGHT) {
                    if (dockedGroup.indexOf(k) >= 0) {
                        rightCol.push(<li key={k} style={style} className={dockedRightclassName}>
                            <span className={this.props.ruleset === 'withBorder' ? "" : "docked"}>{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (undockAwaited.indexOf(k) >= 0) {
                        rightCol.push(<li key={k} style={style} className={undockRigtclassName}>
                            <span className="undock right">&nbsp;</span>
                        </li>);
                    } else if (wrongUndock.indexOf(k) >= 0) {
                        rightCol.push(<li key={k} style={style} className={wrongUndockRightclassName}>
                            <span className="wrongUndock right">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (selectedBin.indexOf(k) >= 0) {
                        rightCol.push(<li key={k} style={style} className={selectedbinRightclassName}>
                            <span className="selectedbin">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else {
                        rightCol.push(<li key={k} style={style} className={this.props.ruleset === 'withBorder' ? "bottomBorderRight padding" : "padding"} ><span>{this.props.displayBinId ? k : null}</span></li>);
                    }

                }
                else if (data[k] === allresourceConstants.BIN_GROUP_CENTER_TOP) {
                    if (dockedGroup.indexOf(k) >= 0) {
                        centerCol.push(<li key={k} style={style} className="dockedCont">
                            <span className={this.props.ruleset === 'withBorder' ? "" : "docked"}>{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (undockAwaited.indexOf(k) >= 0) {
                        centerCol.push(<li key={k} style={style} className="undockedCont">
                            <span >{this.props.displayBinId ? k : null}</span>
                            <span className="undock below">
                            </span>
                        </li>);
                    }
                    else if (wrongUndock.indexOf(k) >= 0) {
                        centerCol.push(<li key={k} style={style} className={"wrongUndockCont"}>
                            <span className="wrongUndock left">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (selectedBin.indexOf(k) >= 0) {
                        centerCol.push(<li key={k} style={style} className={"selectedbinCont"}>
                            <span className="selectedbin">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else {
                        centerCol.push(<li key={k} style={style}><span>{this.props.displayBinId ? k : null}</span></li>);
                    }

                }
                else if (data[k] === allresourceConstants.BIN_GROUP_CENTER_TOP) {
                    if (dockedGroup.indexOf(k) >= 0) {
                        centerTopCol.push(<li key={k} style={style} className="dockedCont">
                            <span className={this.props.ruleset === 'withBorder' ? "" : "docked"}>{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (undockAwaited.indexOf(k) >= 0) {
                        centerTopCol.push(<li key={k} style={style} className="undockedCont">
                            <span >{this.props.displayBinId ? k : null}</span>
                            <span className="undock below">
                            </span>
                        </li>);
                    }
                    else if (wrongUndock.indexOf(k) >= 0) {
                        centerTopCol.push(<li key={k} style={style} className={"wrongUndockCont"}>
                            <span className="wrongUndock left">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else if (selectedBin.indexOf(k) >= 0) {
                        centerTopCol.push(<li key={k} style={style} className={"selectedbinCont"}>
                            <span className="selectedbin">{this.props.displayBinId ? k : null}</span>
                        </li>);
                    }
                    else {
                        centerTopCol.push(<li key={k} style={style}><span>{this.props.displayBinId ? k : null}</span></li>);
                    }

                }

            }
        }


        return {
            leftCol: leftCol,
            rightCol: rightCol,
            centerCol: centerCol
        }
    },
    render: function () {

        var mapStructure = this.processData();
        var orientation = Number(this.props.orientation || 0);
        var transformStyle = {
            transform: 'rotate(' + ((orientation + 'deg)'))
        }
        var textTransform = {
            transform: 'rotate(' + (((orientation > 90 ? 180 : 0) + 'deg)'))
        }
        var customizeClassSplitPPS = this.props.customizeClassSplitPPS;

        return (
            <div className={customizeClassSplitPPS ? "splitPPSWrapperForPickBack " + customizeClassSplitPPS : "splitPPSWrapperForPickBack"} style={transformStyle}>
                <div className="mapCont">
                    <div className={"col4 three"}>
                        {(mapStructure.centerCol).length >= 1 ?
                            <ul>
                                {mapStructure.centerCol}
                            </ul> : ""
                        }
                    </div>

                    <div className={"col1 three"}>
                        {(mapStructure.leftCol).length >= 1 ?
                            <ul className={this.props.ruleset === 'withBorder' ? 'withBorderLeft' : ''}>
                                {mapStructure.leftCol}
                            </ul> : ""
                        }
                    </div>

                    <div className="col2 spriteIcons">
                    </div>
                    <div className={"col3 three"}>
                        {(mapStructure.rightCol).length >= 1 ?
                            <ul className={this.props.ruleset === 'withBorder' ? 'withBorder' : ''}>
                                {mapStructure.rightCol}
                            </ul> : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SplitPPS;