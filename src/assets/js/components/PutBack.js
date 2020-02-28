
var React = require('react');
var PutBackStore = require('../stores/PutBackStore');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var Footer = require('./Footer');
var Navigation = require("./Navigation/Navigation.react");
var Notification = require("./Notification/Notification");
var Bins = require("./Bins/Bins.react");
var BinsFlex = require("./Bins/BinsFlexArrange.react");
var Button1 = require("./Button/Button");
var Wrapper = require('./ProductDetails/Wrapper');
var WrapperSplitRoll = require('./ProductDetails/WrapperSplitRoll');
var appConstants = require('../constants/appConstants');
var Modal = require('./Modal/Modal');
var SystemIdle = require('./SystemIdle');
var TabularData = require('./TabularData');
var Exception = require('./Exception/Exception');
var ExceptionHeader = require('./ExceptionHeader');
var KQ = require('./ProductDetails/KQ');
var Img = require('./PrdtDetails/ProductImage.js');
var Reconcile = require("./Reconcile");
var MtuNavigation = require("./mtuNavigation");
var allSvgConstants = require('../constants/svgConstants');
var CommonActions = require('../actions/CommonActions');
var serverMessages = require('../serverMessages/server_messages');
var utils = require('../utils/utils.js');
var NumericIndicator = require('./ProductDetails/NumericIndicator');
var TextEditor = require('./ProductDetails/textEditor');
var ItemTable = require('./itemTable');
var Spinner = require("./Spinner/LoaderButler");
var STNInput = require("./stnInput");
var ReactModal = require('./Modal/ReactModal');

function getStateData() {
  return mainstore.getScreenData();
}

var PutBack = React.createClass({
  _component: '',
  _notification: '',
  _exception: '',
  _navigation: '',
  _modalContent:'',
  getInitialState: function () {
    return getStateData();
  },
  componentWillMount: function () {
    //PutBackStore.addChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    //PutBackStore.removeChangeListener(this.onChange);
    mainstore.addChangeListener(this.onChange);
  },
  onChange: function () {
    this.setState(getStateData());
  },
  getExceptionComponent: function () {
    var _rightComponent = '';
    this._navigation = '';
    return (
      <div className='grid-container exception'>
        <Modal />
        <Exception data={this.state.PutBackExceptionData} action={true} />
        <div className="exception-right"></div>
        <div className='cancel-scan'>
          <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION} color={"black"} />
        </div>
      </div>
    );
  },
  callAPItoGetData: function (data) {
    CommonActions.getOrphanItemData(data);
  },

  getToteDisplayName: function () {
    var exceptionDetail = null;
    for (var i = 0, len = this.state.PutBackExceptionData.list.length; i < len; i++) {
      var exception = this.state.PutBackExceptionData.list[i];
      if (exception.exception_id === "PtB006") {
        exceptionDetail = exception;
        break;
      }
    }
    return exceptionDetail ? exceptionDetail.details[0] : "Tote";

  },

  getScreenComponent: function (screen_id) {
    switch (screen_id) {
      case appConstants.PUT_BACK_STAGE:
      case appConstants.PUT_BACK_SCAN_TOTE:
        var invoiceStringArgExitBtn = [], invoiceStringArg = [];
        var stageButtonobj = "";
        invoiceStringArgExitBtn[0] = this.state.InvoiceType;
        invoiceStringArg[0] = this.state.InvoiceType;
        if (!this.state.StageButtonHideFlag) {
          stageButtonobj = <div style={{"justifyContent": "space-around"}} className='staging-action' >
            <Button1 disabled={!this.state.StageActive} text={_("Stage")} module={appConstants.PUT_BACK} action={appConstants.STAGE_ONE_BIN} color={"orange"} />
            <Button1 disabled={!this.state.StageAllActive} text={_("Stage All")} module={appConstants.PUT_BACK} action={appConstants.STAGE_ALL} color={"black"} />
          </div>
        }
        if (this.state.PutBackExceptionStatus == false) {
          this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
          var binComponent = "";
          if (this.state.OrigBinUse) {
            binComponent = (<BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />)
          } else {
            binComponent = (<div className='main-container'>
              <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
            </div>)
          }
          if(this.state.PutBackMissingItems.length > 0){
          this._modalContent = (
            <ReactModal title={_("Exit LPN")}>
              <div>
                <div className="row" style={{fontSize: "1.5em", color:"#4D5055"}}>
                  <div className="col-md-12" >
                    <p>{(_("Are you sure you want to exit from {0} LPN and stage all bin(s)?")).replace("{0}",this.state.PutBackInvoiceId)}</p>
                    <p>{(_("The following {0} items were found missing:")).replace("{0}", this.state.PutBackMissingItems.length)}</p>
                    <div className="missing-list">
                      <section className="list-head">
                        <span className="list-head-cell-col-4">
                          {_("Product SKU")}
                        </span>
                        <span className="list-head-cell-col-4">
                          {_("UOM")}
                        </span>
                        <span className="list-head-cell-col-4">
                          {_("Quantity")}
                        </span>
                      </section>
                      <div className="list-content">
                        {this.state.PutBackMissingItems.map(function (tuple, idx) {
                          return (<section key={tuple.product_sku + idx} className="tuple-row">
                            <span className="tuple-row-cell-col-4">{tuple.product_sku ? tuple.product_sku : "--"}</span>
                            <span className="tuple-row-cell-col-4">{tuple.label ? tuple.label : "--"}</span>
                            <span className="tuple-row-cell-col-4">{tuple.quantity ? tuple.quantity : "--"}</span>
                          </section>)
                        })} 
                      </div>
                    </div>

                  </div>
                </div>
                <div className="modal-footer removeBorder">
                  <div className="buttonContainer center-block chklstButtonContainer">
                    <div className="row removeBorder">
                      <div className="col-md-6"><Button1 disabled={false} text={_("Confirm")} color={"orange"} status={true} barcode={this.state.PutBackInvoiceId} module={appConstants.PUT_BACK} action={appConstants.CONFIRM_CLOSE_INVOICE} /></div>
                      <div className="col-md-6"><Button1 disabled={false} text={_("Cancel")} color={"black"} status={false} barcode={this.state.PutBackInvoiceId} module={appConstants.PUT_BACK} action={appConstants.CONFIRM_CLOSE_INVOICE} /></div>
                    </div>
                  </div>
                </div>
              </div>

            </ReactModal>)
          }else{
            this._modalContent = ""
          }
          this._component = (
            <div className='grid-container'>
              {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag) ? (<div className="gor-invoice-put-back">{utils.frntStringTransform("FRNT.PBI.03", invoiceStringArg)} <span className="gor-invoice-put-back-h2">{this.state.InvoiceRequired.invoiceId}</span></div>) : ""}
              <Modal />
              {binComponent}
              {stageButtonobj}
              {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag) && (!(screen_id === appConstants.PUT_BACK_STAGE && this.state.ToteId)) ?
                <div className='cancel-scan'>
                  <Button1 disabled={false} text={utils.frntStringTransform("FRNT.PBI.02", invoiceStringArgExitBtn)} module={appConstants.PUT_BACK} action={appConstants.EXIT_INVOICE} color={"black"} />
                </div> : ""}
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;


      case appConstants.PUT_BACK_WAREHOUSE_FULL_IRT_SCAN:
        this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
        var binComponent = "";
        this._modalContent = "";
        if (this.state.OrigBinUse) {
          binComponent = (<BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />)
        } else {
          binComponent = (<div className='main-container'>
            <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
          </div>)
        }
        this._component = (
          <div className='grid-container'>
            <div className='main-container'>
              <Modal />
              {binComponent}
            </div>
          </div>
        );
        break;

      case appConstants.PUT_BACK_INVOICE:
          this._modalContent = "";
        var invoiceStringArg = [];
        invoiceStringArg[0] = this.state.InvoiceType;
        var componentModalString = utils.frntStringTransform("FRNT.PBI.01", invoiceStringArg);
        this._navigation = '';
        this._component = (
          <div className='grid-container gor-invoice-wrap'>
            <Modal />
            <div className='gor-invoice-input-wrap'>
              <div className='gor-invoice-h1-wrap'>{componentModalString}</div>
              <STNInput
                errorFound={this.state.PutBackNotificationForStnInput}
                invoiceType={this.state.InvoiceType}
                inputPlaceHolder={componentModalString}
              />
            </div>
          </div>);
        break;

      case appConstants.PUT_BACK_SCAN:
          this._modalContent = "";
        var invoiceStringArg = [];
        invoiceStringArg[0] = this.state.InvoiceType;
        if (this.state.PutBackExceptionStatus == false) {
          var binComponent = "";
          if (this.state.OrigBinUse) {
            binComponent = (<div className="binsFlexWrapperContainer">
              <BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />
              <WrapperSplitRoll scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid} />
            </div>);
          } else {

            binComponent = (<div className='main-container'>
              <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
              <Wrapper scanDetails={this.state.PutBackScanDetails} productDetails={this.state.PutBackProductDetails} itemUid={this.state.PutBackItemUid} />
            </div>);

          }
          this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
          this._component = (
            <div className='grid-container'>
              {(this.state.InvoiceRequired && this.state.InvoiceRequired.invoiceFlag) ? (<div className="gor-invoice-put-back">{utils.frntStringTransform("FRNT.PBI.03", invoiceStringArg)} <span className="gor-invoice-put-back-h2">{this.state.InvoiceRequired.invoiceId}</span></div>) : ""}
              <Modal />
              {binComponent}

              <div className='cancel-scan'>
                <Button1 disabled={false} text={_("Cancel Scan")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} barcode={this.state.PutBackItemUid} color={"black"} />
              </div>
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.PUT_BACK_TOTE_CLOSE:
          this._modalContent = "";
        if (this.state.PutBackExceptionStatus == false) {
          this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
          var subComponent = '';
          var messageType = 'large';
          var m = {
            "details": [],
            "code": "PtB.E.020",
            "description": "Tote Match successfully",
            "level": "info"
          };
          if (this.state.PutBackReconciliation["tableRows"].length > 1)
            subComponent = (
              <div className='main-container'>
                <div className="audit-reconcile-left">
                  <TabularData data={this.state.PutBackReconciliation} />
                </div>
              </div>
            );
          else
            subComponent = (
              <Reconcile navMessagesJson={this.props.navMessagesJson} message={m} />
            );
          messageType = "small";
          this._component = (
            <div className='grid-container audit-reconcilation'>
              <Modal />
              {subComponent}
              <div className='staging-action' >
                <Button1 disabled={false} text={_("BACK")} module={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={false} action={appConstants.CANCEL_TOTE} color={"black"} />
                <Button1 disabled={false} text={_("CLOSE")} module={appConstants.PUT_BACK} toteId={this.state.PutBackToteId} status={true} action={appConstants.CLOSE_TOTE} color={"orange"} />
              </div>
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;

      case appConstants.PUT_BACK_PRESS_PPTL_TOTE:
          this._modalContent = "";
        if (this.state.PutBackExceptionStatus === false) {
          this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
          var binComponent = "";
          if (this.state.OrigBinUse) {
            binComponent = (<BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />)
          } else {
            binComponent = (<div className='main-container'>
              <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
            </div>)
          }
          this._component = (
            <div className='grid-container'>
              <Modal />
              {binComponent}
              <div className='cancel-scan'>
                <Button1 disabled={false} text={_("Cancel Scan")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_SCAN} color={"black"} />
              </div>
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;


      case appConstants.PUT_BACK_NO_SCAN_TOTE:
          this._modalContent = "";
        if (this.state.PutBackExceptionStatus === false) {
          this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />);
          var stageButtonobj = "";
          var binComponent = "";
          if (!this.state.StageButtonHideFlag) {
            stageButtonobj = <div style={{"justifyContent": "space-around"}} className='staging-action' >
              <Button1 disabled={!this.state.StageActive} text={_("Stage")} module={appConstants.PUT_BACK} action={appConstants.STAGE_ONE_BIN} color={"orange"} />
              <Button1 disabled={!this.state.StageAllActive} text={_("Stage All")} module={appConstants.PUT_BACK} action={appConstants.STAGE_ALL} color={"black"} />
            </div>
          }
          if (this.state.OrigBinUse) {
            binComponent = (<BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />)
          } else {
            binComponent = (<div className='main-container'>
              <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
            </div>)
          }
          this._component = (
            <div className='grid-container'>
              {binComponent}
              {stageButtonobj}
            </div>
          );

        } else {
          this._component = this.getExceptionComponent();
        }
        break;

      case appConstants.PUT_BACK_UNSCANNABLE:
          this._modalContent = "";
        var buttonActivateFlag = mainstore.getExeptionQuanity();
        var toteDisplayName = this.getToteDisplayName() || "Tote";
        var numericIndicator = "";
        if (this.state.PutBackExceptionType == "item_unscannable") {
          numericIndicator = <div className="gor-NI-wrapper">
            <hr />
            <div className="exception-qty-title">{_("Unscannable Entity")}</div>
            <NumericIndicator execType={appConstants.DAMAGED_PACK} />
          </div>
        } else {
          numericIndicator = <div className="gor-NI-wrapper">
            <hr />
            <div className="exception-qty-title">{_("Unscannable") + " " + toteDisplayName}</div>
            <NumericIndicator execType={appConstants.DAMAGED_PACK} />
          </div>
        }
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            <div className="exception-right">
              <ExceptionHeader data={this.state.PutBackServerNavData} />

              <div className="main-container exception1 displayBlocked">
                {numericIndicator}
              </div>
              <div className="finish-damaged-barcode padding">
                <Button1 disabled={buttonActivateFlag} text={_("Validate and Confirm")} color={"orange"}
                  module={appConstants.PUT_BACK}
                  action={appConstants.UNSCANNABLE_TOTE_ENTITY_QUANTITY} />

              </div>
            </div>
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_FRONT}
                action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"} />
            </div>
          </div>
        );

        break;


      case appConstants.PUT_BACK_PHYSICALLY_DAMAGED_ITEMS:
        this._navigation = '';
        this._modalContent = "";
        if (this.state.PutBackExceptionScreen === appConstants.ENTITY_DAMAGED)
          this._component = (
            <div className='grid-container exception'>
              <Modal />
              <Exception data={this.state.PutBackExceptionData} />
              <div className="exception-right">
                <ExceptionHeader data={this.state.PutBackServerNavData} />
                <div className="main-container exception1">
                  <Img srcURL={this.state.PutBackExceptionProductDetails.image_url} />

                  <TabularData data={this.state.PutBackExceptionProductDetails} />

                  <KQ scanDetails={this.state.PutBackKQDetails} />
                </div>
                <div className="finish-damaged-barcode">
                  <Button1 disabled={this.state.PutBackKQDetails.current_qty == 0 || (!Number.isInteger(Number(this.state.PutBackKQDetails.current_qty)))} text={_("NEXT")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_ENTITY_DAMAGED} />
                </div>
              </div>
              <div className='cancel-scan'>
                <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER} color={"black"} />
              </div>
            </div>
          );
        break;
      case appConstants.PUT_BACK_EXCEPTION_OVERSIZED_ITEMS:
        this._navigation = '';
        this._modalContent = "";
        if (this.state.PutBackExceptionScreen == "oversized")
          this._component = (
            <div className='grid-container exception'>
              <Modal />
              <Exception data={this.state.PutBackExceptionData} />
              <div className="exception-right">
                <ExceptionHeader data={this.state.PutBackServerNavData} />
                <div className="main-container exception1">
                  <Img srcURL={this.state.PutBackExceptionProductDetails.image_url} />
                  <TabularData data={this.state.PutBackExceptionProductDetails} />

                  <KQ scanDetails={this.state.PutBackKQDetails} />
                </div>
                <div className="finish-damaged-barcode">
                  <Button1 disabled={this.state.PutBackKQDetails.current_qty == 0 || (!Number.isInteger(Number(this.state.PutBackKQDetails.current_qty)))} text={_("NEXT")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_ITEM_OVERSIZED} />
                </div>
              </div>
              <div className='cancel-scan'>
                <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER} color={"black"} />
              </div>
            </div>
          );
        break;
      case appConstants.PUT_BACK_EXCEPTION_EXCESS_ITEMS_IN_BINS:
        this._navigation = '';
        this._modalContent = "";
        var binComponent = "";
        if (this.state.OrigBinUse) {
          binComponent = (<div className="exception1">
            <BinsFlex binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} seatType={this.state.SeatType} />
          </div>)
        } else {
          binComponent = (<div className="main-container exception1">
            <Bins binsData={this.state.PutBackBinData} screenId={this.state.PutBackScreenId} />
          </div>)
        }
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            <div className="exception-right">
              <ExceptionHeader data={this.state.PutBackServerNavData} />
              {binComponent}
              <div className="finish-damaged-barcode">
                <Button1 disabled={this.state.PutBackNextButtonState} text={_("NEXT")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.SEND_EXCESS_ITEMS_BIN} />
              </div>
            </div>
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"} />
            </div>
          </div>
        );
        break;
      case appConstants.PUT_BACK_EXCEPTION_EXTRA_ITEM_QUANTITY_UPDATE:
        this._navigation = '';
        this._modalContent = "";
        if (this.state.PutBackExceptionScreen == "extra_quantity")
          this._component = (
            <div className='grid-container exception'>
              <Modal />
              <Exception data={this.state.PutBackExceptionData} />
              <div className="exception-right">
                <ExceptionHeader data={this.state.PutBackServerNavData} />
                <div className="main-container exception1">
                  <Img srcURL={this.state.PutBackExceptionProductDetails.image_url} />
                  <TabularData data={this.state.PutBackExceptionProductDetails} />
                  <KQ scanDetails={this.state.PutBackKQDetails} />
                </div>
                <div className="finish-damaged-barcode">
                  <Button1 disabled={this.state.PutBackKQDetails.current_qty == 0 || (!Number.isInteger(Number(this.state.PutBackKQDetails.current_qty)))} text={_("NEXT")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.FINISH_EXCEPTION_EXTRA_ITEM} />
                </div>
              </div>
              <div className='cancel-scan'>
                <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER} color={"black"} />
              </div>
            </div>
          );
        break;

      case appConstants.PUT_BACK_SCAN_EXCESS_ITEM_BACKUP:
        var _button;
        this._modalContent = "";
        _button = (<div className="staging-action">
          <Button1 disabled={this.state.PutBackExceptionFlag} text={_("Next")} module={appConstants.PUT_BACK} action={appConstants.EXCESS_ITEM_BIN} color={"orange"} />
        </div>);
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            <div className="exception-right">
              <div className="main-container">
                <div className="kq-exception">
                  <div className="kq-header">{_("Scan excess entities")}</div>
                  <TabularData data={this.state.PutBackExcessItems} className='limit-height width-extra ' />
                  {_button}
                </div>
              </div>
            </div>
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"} />
            </div>
          </div>
        );
        break;

      case appConstants.PUT_BACK_SCAN_EXCESS_ITEM:
        var _button;
        this._modalContent = "";
        _button = (<div className="staging-action">
          <Button1 disabled={this.state.PutBackExceptionFlag} text={_("Next")} module={appConstants.PUT_BACK} action={appConstants.EXCESS_ITEM_BIN} color={"orange"} />
        </div>);
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            <div className="exception-right">
              <div className="main-container">
                <div className="kq-exception">
                  <div className="kq-header">{_("Scan excess entities")}</div>
                  <TabularData data={this.state.PutBackExcessItems} className='limit-height width-extra ' />
                  {_button}
                </div>
              </div>
            </div>
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"} />
            </div>
          </div>
        );
        break;


      case appConstants.PUT_BACK_EXCEPTION_ENITY_IRT_BIN:
        var selected_screen;
        this._modalContent = "";
        var messageIRTenable, messageIRTdisable;
        if (this.state.GetExceptionType == appConstants.PHYSICALLY_DAMAGED) {
          messageIRTenable = (<div className="gor-exceptionConfirm-text">{_("Please put damaged entities in IRT bin and scan the bin")}</div>);
          messageIRTdisable = (<div className="gor-exceptionConfirm-text">{_("Please put damaged entities in exception area")}</div>);
        }
        else if (this.state.GetExceptionType == appConstants.EXTRA_ITEMS) {
          messageIRTenable = (<div className="gor-exceptionConfirm-text">{_("Please put extra entities in IRT bin and scan the bin")}</div>);
          messageIRTdisable = (<div className="gor-exceptionConfirm-text">{_("Please put extra entities in exception area.")}</div>);
        }
        else if (this.state.GetExceptionType == appConstants.ITEM_SCANNABLE) {
          messageIRTenable = (<div className="gor-exceptionConfirm-text">{_("Please put unscannable entities in IRT bin and scan the bin")}</div>);
          messageIRTdisable = (<div className="gor-exceptionConfirm-text">{_("Please put unscannable entities in exception area")}</div>);
        }
        else if (this.state.GetExceptionType == appConstants.ITEM_OVERSIZED) {
          messageIRTenable = (<div className="gor-exceptionConfirm-text">{_("Please put oversized entities in IRT bin and scan the bin")}</div>);
          messageIRTdisable = (<div className="gor-exceptionConfirm-text">{_("Please put oversized entities in exception area")}</div>);
        }
        else if (this.state.GetExceptionType == appConstants.TOTE_UNSCANNABLE) {
          messageIRTenable = (<div className="gor-exceptionConfirm-text">{_("Please put unscannable tote in IRT bin and scan the bin")}</div>);
          messageIRTdisable = (<div className="gor-exceptionConfirm-text">{_("Please put unscannable tote in exception area")}</div>);
        }


        if (!this.state.GetIRTScanStatus) {
          selected_screen = (
            <div className="exception-right">
              <div className="gor-exception-align">
                {messageIRTdisable}
                <div className="finish-damaged-barcode align-button">
                  <Button1 disabled={false} text={_("Confirm")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.PUT_FINISH_EXCEPTION_ENTITY} />
                </div>
              </div>
            </div>
          );
        } else {
          selected_screen = (
            <div className="exception-right">
              <div className="gor-exception-align">
                {messageIRTenable}
              </div>
            </div>
          );
        }
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            {selected_screen}
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_FRONT} action={appConstants.CANCEL_EXCEPTION_MODAL} color={"black"} />
            </div>
          </div>
        );
        break;


      case appConstants.PUT_BACK_EXCEPTION_PUT_EXTRA_ITEM_IN_IRT_BIN:
        this._navigation = '';
        this._modalContent = "";
        this._component = (
          <div className='grid-container exception'>
            <Modal />
            <Exception data={this.state.PutBackExceptionData} />
            <div className="exception-right">
              <ExceptionHeader data={this.state.PutBackServerNavData} />
              <div className="finish-damaged-barcode">
                <Button1 disabled={false} text={_("FINISH")} color={"orange"} module={appConstants.PUT_BACK} action={appConstants.CONFIRM_ITEM_PLACE_IN_IRT} />
              </div>
            </div>
            <div className='cancel-scan'>
              <Button1 disabled={false} text={_("Cancel Exception")} module={appConstants.PUT_BACK} action={appConstants.CANCEL_EXCEPTION_TO_SERVER} color={"black"} />
            </div>
          </div>
        );
        break;

      case appConstants.PUT_BACK_INVALID_TOTE_ITEM:
          this._modalContent = "";
        this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />)

        this._component = (
          <div className='grid-container audit-reconcilation'>
            <Modal />
            <Reconcile navMessagesJson={this.props.navMessagesJson} message={this.state.PutBackToteException} />
            <div className='staging-action' >
              <Button1 disabled={false} text={_("Cancel")} module={appConstants.PUT_BACK} status={true} action={appConstants.CANCEL_TOTE_EXCEPTION} color={"black"} />
              <Button1 disabled={false} text={_("Confirm")} module={appConstants.PUT_BACK} status={true} action={appConstants.CONFIRM_TOTE_EXCEPTION} color={"orange"} />
            </div>
          </div>
        );
        break;
      case appConstants.PPTL_MANAGEMENT:
      case appConstants.SCANNER_MANAGEMENT:
          this._modalContent = "";
        this._navigation = (<Navigation navData={this.state.PutBackNavData} serverNavData={this.state.PutBackServerNavData} navMessagesJson={this.props.navMessagesJson} />)
        var _button;
        if (this.state.PutBackScreenId == appConstants.SCANNER_MANAGEMENT) {
          _button = (<div className='staging-action' >
            <Button1 disabled={false} text={_("BACK")} module={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.CANCEL_ADD_SCANNER} color={"black"} />
            <Button1 disabled={false} text={_("Add Scanner")} module={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.ADD_SCANNER} color={"orange"} />
          </div>)
        }
        else {
          _button = (<div className='staging-action' ><Button1 disabled={false} text={_("BACK")} module={appConstants.PERIPHERAL_MANAGEMENT} status={true} action={appConstants.CANCEL_PPTL} color={"black"} /></div>)
        }
        this._component = (
          <div className='grid-container audit-reconcilation'>
            <div className="row scannerHeader">
              <div className="col-md-6">
                <div className="ppsMode"> PPS Mode : {this.state.PutBackPpsMode.toUpperCase()} </div>
              </div>
              <div className="col-md-6">
                <div className="seatType"> Seat Type : {this.state.PutBackSeatType.toUpperCase()}</div>
              </div>
            </div>
            <TabularData data={this.state.utility} />
            {_button}
            <Modal />
          </div>
        );
        break;
      case appConstants.ITEM_SEARCH:
        this._navigation = '';
        this._modalContent = "";
        this._component = (
          <div>
            <div className="outerWrapperItemSearch">
              <div className="subHeaderItemDetails">{_("Item details")}</div>
              <div className="innerWrapperItemSearch">
                <div className="textBoxContainer">
                  <span className="barcode"></span>
                  {/* <input placeholder="Scan item or enter barcode details" type="text"/> */}
                  <TextEditor callAPItoGetData={this.callAPItoGetData} />
                </div>
              </div>
            </div>
            <div className="itemSearchfooter">
              <Button1 disabled={false} text={_("Close")} module={appConstants.SEARCH_MANAGEMENT} status={true} action={appConstants.BACK} color={"black"} />
            </div>
          </div>
        )
        break;
      case appConstants.ITEM_SEARCH_RESULT:
        this._navigation = '';
        this._modalContent = "";
        this._component = (
          <div>
            <div className="outerWrapperItemSearch">
              <div className="subHeaderItemDetails">{_("Item details")}</div>
              <div className="innerWrapperItemResult">
                {this.state.loaderState ? <div className="spinnerDiv"><Spinner /></div> : <ItemTable data={this.state.ItemSearchData} rowconfig={this.state.rowconfig} />}
              </div>

            </div>
            <div className="itemSearchfooter">
              <Button1 disabled={false} text={_("Close")} module={appConstants.SEARCH_MANAGEMENT} status={true} action={appConstants.BACK} color={"black"} />
            </div>
          </div>
        )
        break;
      default:
        return true;
    }
  },

  getNotificationComponent: function () {
    if (this.state.PutBackNotification != undefined) {
      this._notification = <Notification notification={this.state.PutBackNotification} navMessagesJson={this.props.navMessagesJson} />
    }
    else {
      if ($(".modal.notification-error").is(":visible")) {
        setTimeout((function () {
          $('.modal.notification-error').data('bs.modal').options.backdrop = true
          $(".modal-backdrop").remove()
          $(".modal.notification-error").modal("hide");
          $(".modal").removeClass("notification-error")

        }), 0)

        return null
      }
      else if ($(".modal.in").is(":visible")) {
        setTimeout((function () {
          if ($('.modal.in').find("div").hasClass("modal-footer")) {
            //check when errorcode is true and modal has buttons
            $('.modal.in').data('bs.modal').options.backdrop = 'static';
          }
          else {
            //check when errorcode is true and modal has NO buttons
            $('.modal.in').data('bs.modal').options.backdrop = true;
          }
        }), 0)
        return null
      }
      this._notification = "";
    }
  },
  render: function (data) {
    this.getNotificationComponent();
    this.getScreenComponent(this.state.PutBackScreenId);
    var footer = mainstore.getGamificationUrl() ? <Footer /> : ""
    return (
      <div className="main">
        <Header />
        {this._navigation}
        {this._component}
        {this._modalContent}
        {this._notification}
        {footer}
      </div>

    )
  }
});

module.exports = PutBack;