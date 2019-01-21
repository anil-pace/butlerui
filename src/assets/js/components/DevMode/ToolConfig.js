ToolConfigs = {
  toolList: [
    "common",
    "config",
    "put_expectation",
    "order_creator",
    "serialized",
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
    visible: true
  }
};
module.exports = ToolConfigs;
