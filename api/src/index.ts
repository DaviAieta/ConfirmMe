import express from "express";
import eventosRoutes from "./routes/eventos.routes";
import guestRoutes from "./routes/guests.routes";
import categoriesRoutes from "./routes/categories.routes";
import userRoutes from "./routes/users.routes";
import cors from "cors";

const app = express();
const port = 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/events", eventosRoutes);
app.use("/guests", guestRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
