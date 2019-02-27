var configConstants = {
  WEBSOCKET_IP: "ws://192.168.15.153:8888/ws",
  INTERFACE_IP: "http://192.168.15.153:5000"
};

// var configConstants = {
//   WEBSOCKET_IP: "wss://192.168.9.206/wss",
//   INTERFACE_IP: "https://192.168.9.206"
// };
var BOI_CONFIG = configConstants.INTERFACE_IP + "/api/components/get_boi_config";
configConstants["BOI_CONFIG"] = BOI_CONFIG;
module.exports = configConstants;