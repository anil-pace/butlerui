ToolConfigs = {
  toolList: [
    "common",
    "config",
    "put_expectation",
    "order_creator",
    "serialized",
    "image_scanner",
    "pps_mode_manager",
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
    visible: true
  },
  put_expectation: {
    visible: false
  },
  image_scanner: {
    visible: false
  },
  pps_mode_manager: {
    visible: false
  }
};
module.exports = ToolConfigs;
