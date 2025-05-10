const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const aiRoutes = require('./routes/ai');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes); 