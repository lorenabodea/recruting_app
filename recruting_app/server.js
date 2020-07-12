const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uploader = require('express-fileupload');
const nodemailer = require('nodemailer');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(uploader());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

app.post("/sendmail", (req, res) => {
  let user = req.body;
  sendEmailAppointment(user, info => {
    res.send(info);
  });
});

app.post("/sendmailaccept", (req, res) => {
  let user = req.body;
  sendEmailAccept(user, info => {
    res.send(info);
  });
});

app.post("/sendmailreject", (req, res) => {
  let user = req.body;
  sendEmailReject(user, info => {
    res.send(info);
  });
});

async function sendEmailAppointment(user, callback) {
  //create reusable transport object using the default smtp transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rapplication4@gmail.com',
      pass: 's3curep@ssw0rd'
    }
  });

  let mailOptions = {
    from: "microsoft",
    to: user.email,
    subject: "Programare interviu",
    html: `<h1>Buna, ${user.firstname}!</h1><br>
    <h4>Ne-am bucura sa ne vedem la un interviu pentru postul la care ai aplicat la Microsoft.</h4>
    <p>Imi poti spune te rog cand ai fi diponibil saptamana viitoare?</p>
    <h5>Numai bine</h5>`
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

async function sendEmailAccept(user, callback) {
  //create reusable transport object using the default smtp transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rapplication4@gmail.com',
      pass: 's3curep@ssw0rd'
    }
  });

  let mailOptions = {
    from: "microsoft",
    to: "lorenabodea@gmail.com",
    subject: "Raspuns pozitiv ApacksTrading",
    html: `<h1>Buna, ${user.firstname}!</h1><br>
    <h4>Vesti bune!</h4>
    <p>In urma interviului ai primit un feedback pozitiv si ne-ar placea sa te alaturi echipei noastre!</p>
    <h5>Numai bine! Ne auzim curand pentru ultimele detalii</h5>`
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

async function sendEmailReject(user, callback) {
  //create reusable transport object using the default smtp transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rapplication4@gmail.com',
      pass: 's3curep@ssw0rd'
    }
  });

  let mailOptions = {
    from: "microsoft",
    to: "lorenabodea@gmail.com",
    subject: "Raspuns Negativ Apacks Trading",
    html: `<h1>Buna, ${user.firstname}!</h1><br>
    <p>Din pacate nu vom continua impreuna in procesul de recrutare</p>
    <h5>Mult succes!</h5>`
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}
// Require recruit routes
const recruitRoutes = require('./src/routes/recruit.routes');
const certificateRoutes = require('./src/routes/certificate.routes');
const jobRoutes = require('./src/routes/job.route');
const languageRoutes = require('./src/routes/language.route');
const school_institutionRoutes = require('./src/routes/school_institutution.route');
const feedbackRoutes = require('./src/routes/feedback.routes');
// using as middleware
// api routes
app.use('/users', require('./src/controllers/user.controller'));
app.use('/api/v1/recruits', recruitRoutes);
app.use('/api/v1/certificates', certificateRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/languages', languageRoutes)
app.use('/api/v1/school_institutions', school_institutionRoutes)
app.use('/api/v1/feedback', feedbackRoutes);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
