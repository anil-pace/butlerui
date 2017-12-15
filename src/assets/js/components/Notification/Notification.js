var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');
var Modal = require('../Modal/Modal');

var Notification = React.createClass({
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

        if(this.props.notification.level!=undefined && this.props.notification.level == "error" && errorCode){

            if(!$(".modal.notification-error").is(":visible")){
                let message=(function(){
                        if(navMessagesJson !== undefined){
                            message_args.unshift(navMessagesJson[errorCode]);
                            if(message_args[0] == undefined){
                                return _(compData.description);
                            }else{
                                var notification_message = _.apply(null, message_args);
                                return _(notification_message);
                            }
                        }

                    }
                )()
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
            // BSS-5937: condition for clicking outside of Modal with notification_list=> level: "info"
            else if($(".modal.in").is(":visible")){
                setTimeout((function(){
                    if($('.modal.in').find("div").hasClass("modal-footer")){
                        //check when errorcode is true and modal has buttons
                        $('.modal.in').data('bs.modal').options.backdrop='static';
                    }
                    else{
                        //check when errorcode is true and modal has NO buttons
                        $('.modal.in').data('bs.modal').options.backdrop=true;
                    }
                }),0)
                return null
            }
            else if(errorCode !== null){
                return (
                    <div className={appendClass} role="alert">
                        <div className={appendClass1}>
                            <div className="border-glyp">
                                <span className={"glyphicon "+appendClass2}></span>
                            </div>
                        </div>
                        {(function(){
                                if(navMessagesJson != undefined){
                                    message_args.unshift(navMessagesJson[errorCode]);
                                    if(message_args[0] == undefined){
                                        return _(compData.description);
                                    }else{
                                        var notification_message = _.apply(null, message_args);
                                        return _(notification_message);
                                    }
                                }

                            }
                        )()}
                    </div>
                );
            }else{
                return null;
            }
        }
    }
});

module.exports = Notification;