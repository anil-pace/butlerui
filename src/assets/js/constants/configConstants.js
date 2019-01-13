configConstants = {
    WEBSOCKET_IP : "ws://192.168.9.166:8888/ws",
    INTERFACE_IP : "https://192.168.9.166",
    PLATFORM_IP : "http://192.168.9.166:8080",
    CORE_IP : "http://192.168.9.166:8181"
  };
var BOI_CONFIG= configConstants.INTERFACE_IP+"/api/components/get_boi_config";
configConstants["BOI_CONFIG"] = BOI_CONFIG;
module.exports = configConstants;
