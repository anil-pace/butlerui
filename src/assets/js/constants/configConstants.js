var configConstants = {
  WEBSOCKET_IP: 'wss://localhost/wss',
  INTERFACE_IP: 'https://localhost'
};
var BOI_CONFIG =
  configConstants.INTERFACE_IP + '/api/components/get_boi_config';
configConstants['BOI_CONFIG'] = BOI_CONFIG;
module.exports = configConstants;
