const express = require('express');
const app = express();
const studentRoutes = require('./Routes/studentRoutes');
const setupSwagger = require('./swagger'); // Import Swagger setup
const PORT = 5000;

app.use(express.json());
app.use('/students', studentRoutes);


// 🔹 **Setup Swagger Documentation**
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
