# Dockerizing a NodeJS and MongoDB App - monitored by Datadog

## Installation

```
git clone https://github.com/raunakkathuria/learning.git
cd docker/nodejs-monogodb-datadog
docker build -t demo_node:latest .
DD_API_KEY=<paste_your_datadog_api_key> docker-compose up
```

The above steps would start up a NodeJS express app at http://localhost:3000/ and will store each request data in MongoDB in the following format:

```
{
  "useragent": {
    "browser": "Firefox",
    "version": "80.0",
    "os": "Linux 64",
    "platform": "Linux",
    "source": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0"
  },
  "ipaddress": "::ffff:172.24.0.1",
  "date": "2020-09-27T01:27:00.517Z"
}
```

To view last ten request data visit http://localhost:3000/dashboard - it fetch the data from MongoDB and send it as JSON.
