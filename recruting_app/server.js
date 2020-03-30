const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uploader = require('express-fileupload');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(uploader());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require recruit routes
const recruitRoutes = require('./src/routes/recruit.routes');
const certificateRoutes = require('./src/routes/certificate.routes');
const jobRoutes = require('./src/routes/job.route');
const languageRoutes = require('./src/routes/language.route');
const school_institutionRoutes = require('./src/routes/school_institutution.route');
// using as middleware
app.use('/api/v1/recruits', recruitRoutes);
app.use('/api/v1/certificates', certificateRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/languages', languageRoutes)
app.use('/api/v1/school_institutions', school_institutionRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
