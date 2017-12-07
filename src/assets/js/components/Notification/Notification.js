var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');
var mainstore = require('../../stores/mainstore');
var Modal = require('../Modal/Modal');

var Notification = React.createClass({

    getInitialState: function() {
        return{
            errorPopupDisabled: mainstore.getErrorPopupDisabledStatus()
        }
    },

    render: function() {
        var navMessagesJson = this.props.navMessagesJson;
        var compData = this.props.notification;
        var message_args  = this.props.notification.details.slice(0);
        var errorCode = this.props.notification.code;
        if(this.props.notification.level!=undefined && this.props.notification.level == "error"){
            var appendClass = 'notify-error';
            var appendClass1 = 'error-icon';
            var appendClass2 = 'glyphicon-remove';
        }else{
            var appendClass = 'notify';
            var appendClass1 = 'success-icon';
            var appendClass2 = 'glyphicon-ok';
        }

        let message=(function(){
                        if(navMessagesJson){
                            message_args.unshift(navMessagesJson[errorCode]);
                            if(message_args[0] == undefined){
                                return _(compData.description);
                            }else{
                                var notification_message = _.apply(null, message_args);
                                return _(notification_message);
                            }
                        }

                    }
                )();

        var notificationMessage = (
            <div className={appendClass} role="alert">
                <div className={appendClass1}>
                    <div className="border-glyp">
                        <span className={"glyphicon "+appendClass2}></span>
                    </div>
                </div>
                {message}
            </div>
        );

        if(this.props.notification.level!=undefined && this.props.notification.level == "error" && errorCode){
            if(this.state.errorPopupDisabled === true || this.state.errorPopupDisabled === undefined || this.state.errorPopupDisabled === null){
                return notificationMessage;
            }
            else{
                if(!$(".modal.notification-error").is(":visible")){
                {message}
                setTimeout((function(){ActionCreators.showModal({
                    data:message,
                    type:appConstants.ERROR_NOTIFICATION
                });$(".modal-backdrop").each(function(element){
                    $(element).remove()
                });
                     $('.modal').modal({});
                    $(".modal").addClass("notification-error")
                    $('.modal.notification-error').data('bs.modal').options.backdrop = 'static';
                }),0)
            }
            return null
            }
        }else {
            if($(".modal.notification-error").is(":visible")){
                setTimeout((function(){
                    $('.modal.notification-error').data('bs.modal').options.backdrop=true
                    $(".modal-backdrop").remove()
                    $(".modal.notification-error").modal("hide");
                    $(".modal").removeClass("notification-error")

                }),0)
                return null
            }
            // condition for handling of Modal with notification_list=> level: "info"
            if($(".modal.in").is(":visible")){
                setTimeout((function(){
                    $('.modal.in').data('bs.modal').options.backdrop='static';

                }),0)
                return null
            }
            else if(errorCode !== null){
                return notificationMessage;
            }else{
                return null;
            }
        }

        

    }
});

module.exports = Notification;