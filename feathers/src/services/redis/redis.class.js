/* eslint-disable no-unused-vars */
const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

exports.Redis = class Redis {
  constructor (options) {
    this.options = options || {};

  }

  async find (params) {
    const val = await getAsync('counter');
    return {value: val};
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
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
