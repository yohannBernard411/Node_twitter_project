const mongoose = require('mongoose');
const env = require(`../environment/${ process.env.NODE_ENV }`);

mongoose.set('useCreateIndex', true);

mongoose.connect(env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => {
          console.log('Connection DB twitter ok!');
        })
        .catch( (err) => {
          console.log(err);
        })
