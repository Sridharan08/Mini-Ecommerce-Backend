const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// ✅ Load env variables BEFORE anything else
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const connectDB = require('./config/db');
const products = require('./routes/product');
const orders = require('./routes/order');

// ✅ Connect to MongoDB after loading .env
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/v1', products);
app.use('/api/v1', orders);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
