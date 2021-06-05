const { BadRequest } = require('@feathersjs/errors');
const Ajv = require('ajv');
const ajv = new Ajv({coerceTypes: true});
const  schema = {
  type: 'object',
  properties: {
    number: {
      type: 'integer',
    },
    string: {
      type: 'string',
      minLength: 5,
    },
  },
  required: ['number', 'string'],
};
const validate = ajv.compile(schema);

module.exports = {
  before: {
    all: [],
    find: [ context => {
      const valid = validate(context.params.query);
      if (!valid) {
        throw new BadRequest({data: validate.errors});
      }
    } ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
