var React = require('react');
var mainstore = require('../stores/mainstore');
var Header = require('./Header');
var KQ = require('./ProductDetails/KQ');
var ExceptionHeader = require('./ExceptionHeader');
var allresourceConstants = require('../constants/resourceConstants');
var Navigation = require('./Navigation/Navigation.react');
var Notification = require('./Notification/Notification');
var Button1 = require('./Button/Button');
var appConstants = require('../constants/appConstants');
var Rack = require('./Rack/MsuRack.js');
var Modal = require('./Modal/Modal');
var Exception = require('./Exception/Exception');
var utils = require('../utils/utils.js');
var Spinner = require('./Spinner/LoaderButler');
var ProductInfoDetails = require('./PrdtDetails/ProductInfoDetails');
var TabularData = require('./TabularData');

var Search = React.createClass({
  _notification: '',
  _component: '',
  _navigation: '',
  getInitialState: function() {
    return this.getStateData();
  },
  componentWillMount: function() {
    mainstore.addChangeListener(this.onChange);
  },
  componentDidMount: function() {
    mainstore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function() {
    mainstore.removeChangeListener(this.onChange);
  },
  onChange: function() {
    this.setState(this.getStateData());
  },
  getStateData() {
    var screenData = mainstore.getScreenData();
    return screenData;
  },

  getNotificationComponent: function() {
    if (this.state.SearchItemNotification != undefined) {
      this._notification = (
        <Notification
          notification={this.state.SearchItemNotification}
          navMessagesJson={this.props.navMessagesJson}
        />
      );
    } else {
      if ($('.modal.notification-error').is(':visible')) {
        setTimeout(function() {
          $('.modal.notification-error').data(
            'bs.modal'
          ).options.backdrop = true;
          $('.modal-backdrop').remove();
          $('.modal.notification-error').modal('hide');
          $('.modal').removeClass('notification-error');
        }, 0);

        return null;
      } else if ($('.modal.in').is(':visible')) {
        setTimeout(function() {
          if (
            $('.modal.in')
              .find('div')
              .hasClass('modal-footer')
          ) {
            //check when errorcode is true and modal has buttons
            $('.modal.in').data('bs.modal').options.backdrop = 'static';
          } else {
            //check when errorcode is true and modal has NO buttons
            $('.modal.in').data('bs.modal').options.backdrop = true;
          }
        }, 0);
        return null;
      }
      this._notification = '';
    }
  },
  showModal: function(data, index, manual) {
    if (manual == true) checkListOpen = false;
    var data = {
      checklist_data: data,
      checklist_index: index,
      product_details: this.state.SearchItemProductDetails
    };
    if (checkListOpen == true) {
      setTimeout(function() {
        $('.modal').modal('hide');

        $('.modal')
          .data('bs.modal')
          .escape(); // reset keyboard
        $('.modal').data('bs.modal').options.backdrop = true;
        $('button.close', $('.modal')).show();
      }, 0);
      checkListOpen = false;
    }
  },
  getExceptionComponent: function() {
    var _rightComponent = '';
    this._navigation = '';
    return (
      <div className='grid-container exception'>
        <Modal />
        <Exception data={this.state.SearchExceptionData} action={true} />
        <div className='exception-right'></div>
        <div className='cancel-scan'>
          <Button1
            disabled={false}
            text={_('Cancel Exception')}
            module={appConstants.SEARCH_ITEM}
            action={appConstants.CANCEL_EXCEPTION}
            color={'black'}
          />
        </div>
      </div>
    );
  },

  getScreenComponent: function(screen_id) {
    switch (screen_id) {
      case appConstants.SEARCH_ENTITY_SCAN:
        var kqDisabled = this.state.kQstatus;
        var rackType = '';
        if (!this.state.SearchItemExceptionStatus) {
          this._navigation = (
            <Navigation
              navData={this.state.SearchItemNavData}
              serverNavData={this.state.SearchItemServerNavData}
              navMessagesJson={this.props.navMessagesJson}
            />
          );

          this._component = (
            <div className='grid-container'>
              <Modal />

              <div className='main-container'>
                <div className='remove_SlotDetails'>
                  <Rack
                    isDrawer={this.state.isDrawer}
                    slotType={this.state.SlotType}
                    hideSlotDetails={true}
                    rackData={this.state.SearchItemRackDetails}
                  />
                </div>
                <div className='sideDetails'>
                  <ProductInfoDetails
                    productInfo={this.state.SearchItemProductDetails}
                    serial={this.state.ProductSerial}
                  />
                  <KQ
                    scanDetails={this.state.SearchItemKQQuantity}
                    disable={!kqDisabled}
                  />
                  <Button1
                    disabled={false}
                    text={_('Confirm')}
                    module={appConstants.SEARCH_PPS_ITEM}
                    action={appConstants.KQ_QTY_CONFIRM}
                    color={'black'}
                  />
                </div>
              </div>
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;

      case appConstants.SEARCH_IRT_CONFIRM:
        var irtFlagPlaceholder = '';
        if (this.state.SearchIRTFlag) {
          irtFlagPlaceholder = (
            <div className='irt_image'>
              <span className='barcode'></span>
              <div className='irtBinText'>{_('Scan IRT bin')}</div>
            </div>
          );
        } else {
          irtFlagPlaceholder = (
            <Button1
              disabled={false}
              text={_('Confirm')}
              module={appConstants.SEARCH_PPS_ITEM}
              action={appConstants.SEARCH_ITEM_CONFIRM}
              color={'black'}
            />
          );
        }
        if (!this.state.SearchItemExceptionStatus) {
          this._navigation = (
            <Navigation
              navData={this.state.SearchItemNavData}
              serverNavData={this.state.SearchItemServerNavData}
              navMessagesJson={this.props.navMessagesJson}
            />
          );

          this._component = (
            <div className='grid-container'>
              <Modal />
              <div className='main-container'>
                <div className='rectangleExcessQty'>
                  <div className='excessNumber'>
                    {this.state.SearchItemExcessData}
                  </div>
                  <div className='excessText'>{_('Excess Quantity')}</div>
                </div>
                <ProductInfoDetails
                  productInfo={this.state.SearchItemProductDetails}
                  serial={this.state.ProductSerial}
                />
              </div>
              {irtFlagPlaceholder}
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;
      case appConstants.PPTL_MANAGEMENT:
      case appConstants.SCANNER_MANAGEMENT:
        this._navigation = (
          <Navigation
            navData={this.state.PickFrontNavData}
            serverNavData={this.state.PickFrontServerNavData}
            navMessagesJson={this.props.navMessagesJson}
          />
        );
        var _button;
        if (this.state.PickFrontScreenId == appConstants.SCANNER_MANAGEMENT) {
          _button = (
            <div className='staging-action'>
              <Button1
                disabled={false}
                text={_('BACK')}
                module={appConstants.PERIPHERAL_MANAGEMENT}
                status={true}
                action={appConstants.CANCEL_ADD_SCANNER}
                color={'black'}
              />
              <Button1
                disabled={false}
                text={_('Add Scanner')}
                module={appConstants.PERIPHERAL_MANAGEMENT}
                status={true}
                action={appConstants.ADD_SCANNER}
                color={'orange'}
              />
            </div>
          );
        } else {
          _button = (
            <div className='staging-action'>
              <Button1
                disabled={false}
                text={_('BACK')}
                module={appConstants.PERIPHERAL_MANAGEMENT}
                status={true}
                action={appConstants.CANCEL_PPTL}
                color={'black'}
              />
            </div>
          );
        }
        this._component = (
          <div className='grid-container audit-reconcilation'>
            <div className='row scannerHeader'>
              <div className='col-md-6'>
                <div className='ppsMode'>
                  {' '}
                  PPS Mode : {this.state.PickFrontPpsMode.toUpperCase()}{' '}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='seatType'>
                  {' '}
                  Seat Type : {this.state.PickFrontSeatType.toUpperCase()}
                </div>
              </div>
            </div>
            <TabularData data={this.state.utility} />
            {_button}
            <Modal />
          </div>
        );
        break;

      case appConstants.WAITING_FOR_MSU:
        if (this.state.SearchItemExceptionStatus == false) {
          this._navigation = (
            <Navigation
              navData={this.state.SearchItemNavData}
              serverNavData={this.state.SearchItemServerNavData}
              navMessagesJson={this.props.navMessagesJson}
            />
          );
          this._component = (
            <div className='grid-container'>
              <Modal />

              <div className='main-container'>
                <Spinner />
              </div>
            </div>
          );
        } else {
          this._component = this.getExceptionComponent();
        }
        break;

      default:
        return true;
    }
  },

  render: function(data) {
    this.getNotificationComponent();
    this.getScreenComponent(this.state.SearchItemScreenId);

    return (
      <div className='main'>
        <Header />
        {this._navigation}
        {this._component}
        {this._notification}
      </div>
    );
  }
});

module.exports = Search;
