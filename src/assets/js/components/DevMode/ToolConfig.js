ToolConfigs = {
  toolList: [
    "common",
    "config",
    "put_config",
    "put_expectation",
    "order_config",
    "order_creator",
    "serialized",
    "image_scanner",
    "pps_mode_manager",
    "sys_config",
    "remexec",
    "devconsole"
  ],
  common: {
    visible: false,
    tags: ["exclusive"]
  },
  devconsole: {
    tags: ["shared"],
    visible: true
  },
  order_creator: {
    visible: false
  },
  put_expectation: {
    visible: false
  },
  image_scanner: {
    visible: false
  },
  pps_mode_manager: {
    visible: false
  },
  sys_config: {
    visible: false
  },
  put_config: {
    visible: false
  },
  order_config: {
    visible: false
  },
  remexec: {
    visible: true
  }
};
module.exports = ToolConfigs;
