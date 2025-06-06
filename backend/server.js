const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');
const expoPushRoutes = require('./routes/expoPushRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expo-push',expoPushRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Department Notice Board API is Running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
