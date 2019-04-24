const express = require('express')
const app = express()
var cors = require('cors');
var morgan = require('morgan')
var bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});


const port = 8081

app.use(express.static('static'))
//app.use(cors());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer"'))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(bodyParser.text());

app.use(function(req, res) {
  
  console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  
  req.next();
})

app.all('/*', (req, res) => res.send('pong'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
