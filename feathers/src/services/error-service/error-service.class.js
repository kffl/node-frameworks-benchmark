/* eslint-disable no-unused-vars */
exports.ErrorService = class ErrorService {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    const val = parseInt(id);
    const x = val / (val - 1);
    if (!isFinite(x)) {
      throw new TypeError('Division by 0');
    }
    return {
      value: x
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
