const _ = require("lodash");

module.exports = {
  listeners: {},

  one(name, func) {
    const callback = (payload) => {
      func(payload);
      this.off(name, callback);
    };

    this.on(name, callback);
  },

  on(name, func) {
    if (!_.isArray(this.listeners, name)) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(func);
  },

  off(name, func = null) {
    _.remove(this.listeners[name], (listenerFunc) => {
      return func === listenerFunc || func === null;
    });
  },

  emit(name, payload) {
    _.each(this.listeners[name], (func) => func(payload));
  },
};
