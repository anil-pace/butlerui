var configConstants = {
   WEBSOCKET_IP: 'wss://192.168.9.166/wss',
   INTERFACE_IP: 'https://192.168.9.166'
};
var BOI_CONFIG =
   configConstants.INTERFACE_IP + '/api/components/get_boi_config';
configConstants['BOI_CONFIG'] = BOI_CONFIG;
module.exports = configConstants;
