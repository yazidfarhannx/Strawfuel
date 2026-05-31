const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const carbonRoutes = require('./routes/carbonRoutes');
const strawRoutes = require('./routes/strawRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mapRoutes = require('./routes/mapRoutes');
const path = require('path');
const articleRoutes = require('./routes/articleRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/straw', strawRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/map', mapRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/api/articles', articleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ message: 'StrawFuel API Running' });
});

module.exports = app;