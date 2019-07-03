var configConstants = {
   WEBSOCKET_IP: 'wss://192.168.8.53/wss',
   INTERFACE_IP: 'https://192.168.8.53'
};
var BOI_CONFIG =
   configConstants.INTERFACE_IP + '/api/components/get_boi_config';
configConstants['BOI_CONFIG'] = BOI_CONFIG;
module.exports = configConstants;
