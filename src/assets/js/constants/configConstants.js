// var configConstants = {
//   WEBSOCKET_IP: "wss://localhost/wss",
//   INTERFACE_IP: "https://localhost"
// };

var configConstants = {
  WEBSOCKET_IP: "ws://192.168.12.235:8888/ws",
  INTERFACE_IP: "https://192.168.12.235:5000"
};

var BOI_CONFIG = configConstants.INTERFACE_IP + "/api/components/get_boi_config";
configConstants["BOI_CONFIG"] = BOI_CONFIG;
module.exports = configConstants;