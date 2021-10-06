const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xxs = require('xss-clean');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:9000', 'http://localhost:4200'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'origin',
            'Access-Control-Allow-Headers',
        ],
        optionsSuccessStatus: 204,
        preflightContinue: false,
    }),
)

// secure Express app by setting various HTTP headers
app.use(helmet());

// parses incoming requests with JSON payloads and Controls the maximum request body size
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// HTTP request logger middleware
app.use(morgan('tiny'))

// ====================== XXS =================================
// Data sanitization against cross-site scripting (XSS)
app.use(xxs()) // prevent if code contain html code or js code in body and convert it to symbols known

module.exports = app;
