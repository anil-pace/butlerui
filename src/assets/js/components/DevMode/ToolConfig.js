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
    tags: ["shared"]
  },
  order_creator: {
    visible: true
  }
};
module.exports = ToolConfigs;
