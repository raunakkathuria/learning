const express = require('express');
const useragent = require('express-useragent');
const StatsD = require('hot-shots');
const mongoose = require("mongoose");

const dogstatsd = new StatsD({
  host: process.env.DD_AGENT_HOST,
  globalTags: {
    env: process.env.NODE_ENV,
  },
  errorHandler: function (error) {
    console.error('Cannot connect to Datadog agent: ', error);
  }
});

mongoose
  .connect(
    'mongodb://mongo:27017/vpnmonitoring', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/* for demo its kept in same file
  best to create a separate file
  for better structure and layout */
const Schema = mongoose.Schema;
const requestSchema = new Schema(_getSchema(), {
  collection: 'request-data'
});

requestSchema.index({
  date: -1 // descending order
});

const RequestModel = mongoose.model('Request', requestSchema);

const app = express();
app.use(useragent.express());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

  // save to mongodb
  let requestModelObj = new RequestModel(_getRequestSchema(req));
  requestModelObj.save(function (err, savedObj) {
    if (err) {
      console.error(err);
      return;
    }
  });

  // send metrics to datadog
  dogstatsd.increment('client_connected');

  res.send('Hello World!')
});

app.get('/dashboard', async (req, res) => {
  const result = await RequestModel.find({}, null, { limit: 10 });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function _getSchema() {
  return {
    ipaddress: String,
    date: {
      type: Date,
      default: Date.now,
      expires: 7 * 24 * 60 * 60
    },
    useragent: {
      browser: String,
      version: String,
      os: String,
      platform: String,
      source: String,
    }
  };
}

function _getRequestSchema(req) {
  return {
    ipaddress: req.ip || req.connection.remoteAddress,
    useragent: {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os || 'unknown',
      platform: req.useragent.platform,
      source: req.useragent.source,
    },
  };
}
