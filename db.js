 const mongoose = require('mongoose');

 require('dotenv').config();

 mongoose.connect(process.env.mongo_URL).then(
     () => {
         console.log('connected to database');
     }
 )
 .catch((err) => {
     console.log(`could not connect to db` + err);

})

// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.mongo_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((err) => {
//     console.error('Could not connect to the database:', err);
//   });
