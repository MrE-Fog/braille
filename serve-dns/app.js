var dnsd = require('dnsd')

var host = '162.243.70.96'

dnsd.createServer(handler).listen(53, host)

console.log('Server running at $HOST:53')

process.on('uncaughtException', function(err) { 
  console.log(err); 
});

function handler(req, res) {
  
  var question = res.question[0],
    hostname = question.name,
    ttl = Math.floor(Math.random() * 3600)
  
  question.origin = req.connection.remoteAddress;
  
  console.log(question);
  
  //if(question.type == 'A') {
    res.answer.push({name:hostname, type:'A', data:"162.243.70.96", 'ttl': ttl})
  //}
  
/*
  if(question.type == 'TXT') {
    res.answer.push({name:hostname, type:'TXT', data:"v4O5Ux_aVTvcnw1_ccbOhZzjEg0ToPcToMhzEBUMD7U", 'ttl': ttl})
  }
*/
  
  res.end()
  
}