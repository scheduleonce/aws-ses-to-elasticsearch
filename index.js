const request = require('superagent');
const baseUrl = process.env.BASE_URL;
const user = process.env.USER;
const pass = process.env.PASSWORD;
const prefix = process.env.PREFIX;

exports.handler = function(event, context, callback) {
  const payload = event.Records[0].Sns;
  payload.Message = JSON.parse(payload.Message);
  const index = `${prefix}-${getDate()}`;
  const type = 'emails';
  const id = payload.MessageId;

  request
    .put(`${baseUrl}/${index}/${type}/${id}/_create`)
    .auth(user, pass)
    .send({ data: payload })
    .end(err => {
      if (err) {
        return callback(err);
      }
    });
};

// return the date of first day of the current month
// for example '2017-12-06'
function getDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .substring(0, 10);
}
