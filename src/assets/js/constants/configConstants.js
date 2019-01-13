configConstants = {
    WEBSOCKET_IP : "ws://localhost:8888/ws",
    INTERFACE_IP : "https://localhost:5000",
    PLATFORM_IP : "http://192.168.8.208:8080",
    CORE_IP : "http://localhost:8181"
  };
var BOI_CONFIG= configConstants.INTERFACE_IP+"/api/components/get_boi_config";
configConstants["BOI_CONFIG"] = BOI_CONFIG;
module.exports = configConstants;