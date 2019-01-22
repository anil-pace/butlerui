ToolConfigs = {
  toolList: [
    "common",
    "config",
    "put_expectation",
    "order_creator",
    "serialized",
    "image_scanner",
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
    visible: true
  }
};
module.exports = ToolConfigs;
