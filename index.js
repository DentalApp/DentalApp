const  express = require ('express');
//const cors = require('cors');


const PORT = 3002;
const IP_ADDRESS = '0.0.0.0';

const app=express();
//app.use(cors());
const bodyParser = require('body-parser');

require('./db');
require('./models/User');


const authRoutes = require('./routes/authRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');

app.use(bodyParser.json());
app.use(authRoutes);


// app.get('/',requireToken,(req,res)=>{
//     // res.send('This is home page');

   app.get('/', requireToken, (req, res) => {
         console.log(req.user);
         res.send(req.user);
 })


//   app.post('/signup',(req,res)=>{
//     console.log(req.body);
    
//    res.send('This is signup page');
// });

//  app.listen(PORT, ()=>{
    //  console.log(`server is running on port ${PORT}`);
 app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is listening on ${IP_ADDRESS}:${PORT}`);
})

