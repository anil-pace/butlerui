var configConstants = {
  WEBSOCKET_IP : "wss://139.162.60.209/wss",
  INTERFACE_IP : "https://139.162.60.209"
  };
var BOI_CONFIG= configConstants.INTERFACE_IP+"/api/components/get_boi_config";
configConstants["BOI_CONFIG"] = BOI_CONFIG;
module.exports = configConstants;