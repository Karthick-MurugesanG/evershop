const jest = require('jest-mock');
const notFound = require('../../../../../../../../modules/base/pages/global/[auth]notFound[response]');

module.exports = jest.fn(notFound);
