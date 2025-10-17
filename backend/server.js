const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./src/routes/userRoutes");
const followRoutes = require("./src/routes/followRoutes");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/follow", followRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
