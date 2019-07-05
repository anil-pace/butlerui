var React = require('react');
var PreviousLocation = React.createClass({
  getInitialState: function () {
    return {
      product_info_locale: null
    }
  },
  displayLocale: function (data) {
    var product_info_locale = {}
    var image_url = {};
    var language_locale = sessionStorage.getItem('localeData');
    var locale;
    if (language_locale == 'null' || language_locale == null) {
      locale = 'en-US';
    } else {
      locale = JSON.parse(language_locale)["data"]["locale"];
    }
    data.map(function (value, index) {
      var keyValue = "";
      var imageKey;
      for (var key in value[0]) {
        if (key === "product_dimensions") {
          var dimension = value[0][key];
          for (var i = 0; i < dimension.length; i++) {
            if (i === 0) {
              keyValue = dimension[i] + "";
            }
            else {
              keyValue = keyValue + " X " + dimension[i]
            }
          }
        }
        else if (key != 'display_data' && key != 'product_local_image_url') {
          keyValue = value[0][key] + ' ';
        } else if (key != 'display_data' && key == 'product_local_image_url') {
          imageKey = value[0][key];
        }
      }
      value[0].display_data.map(
        function (data_locale, index1) {
          if (data_locale.locale == locale) {
            if (data_locale.display_name != 'product_local_image_url') {
              product_info_locale[data_locale.display_name] = keyValue;
            }
          }
          if (data_locale.display_name == 'product_local_image_url') {
            image_url[data_locale.display_name] = imageKey;
          }
        }
      )
    });
    return product_info_locale;
  },
  render: function () {
    var customizeClass = this.props.customizeClass;
    var previousDetails = this.displayLocale(this.props.previousDetails);
    return (
      <div className={customizeClass ? "p-put-details " + customizeClass : "p-put-details"}>
        <div className="p-put-head">
          {_("PREVIOUS LOCATION").toUpperCase()}
        </div>
        <div className="p-put-content">
          {Object.keys(previousDetails).map(function (key, idx) {
            if (key === "Location") {
              var str = previousDetails[key].trim();
              return (<section key={key + idx} className="p-put-row">
                {str ?
                  <p className="p-put-value-location">{str}</p> : "--"
                }
              </section>)
            }
          })}
        </div>
      </div>
    );
  }
});
module.exports = PreviousLocation