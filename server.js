const express = require('express');
const app = express();

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(express.static(__dirname + '/public'));

app.listen(8080, function() {
    console.log("I'm listening.")
});
