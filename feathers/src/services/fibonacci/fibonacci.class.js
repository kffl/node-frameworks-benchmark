/* eslint-disable no-unused-vars */
function fibo(n) {
  
}

exports.Fibonacci = class Fibonacci {
  constructor (options) {
    this.options = options || {};
  }

  fibo(n) {
    if (n < 2)
      return 1;
    else   return this.fibo(n - 2) + this.fibo(n - 1);
  }

  async find (params) {
    return {res: this.fibo(23)};
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
