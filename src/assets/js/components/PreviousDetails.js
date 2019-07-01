var React = require('react');

var PreviousDetails = React.createClass({
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
    var type = this.props.type || "";
    var typeToShow = (type === "pick") ? _("Previous Pick Details") : _("Previous Put Details")
    var customizeClass = this.props.customizeClass;
    var previousDetails = this.displayLocale(this.props.previousDetails);
    var objectKeys = Object.keys(previousDetails);
    return (
      <div className={customizeClass ? "p-put-details " + customizeClass : "p-put-details"}>
        <div className="p-put-head">
          {typeToShow.toUpperCase()}
        </div>
        <div className="p-put-content">
          {Object.keys(previousDetails).map(function (key, idx) {
            return (<section key={key + idx} className="p-put-row">
              <p className="p-put-key">{_(key) + " :"}</p>
              <p className="p-put-value">{(previousDetails[key]).trim() || "--"}</p>
            </section>)
          })}
        </div>
        <div className="p-put-head">
          {_("PREVIOUS LOCATION").toUpperCase()}
        </div>
        <div className="p-put-content">
          {Object.keys(previousDetails).map(function (key, idx) {
            if (key === "Location") {
              return (<section key={key + idx} className="p-put-row">
                <p className="p-put-value-1">{(previousDetails[key]).trim() || "2"}</p>
              </section>)
            }
          })}
        </div>
      </div>
    );
  }
});

module.exports = PreviousDetails



