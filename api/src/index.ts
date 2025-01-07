import express from "express";
import eventosRoutes from "./routes/eventos.routes";
import guestRoutes from "./routes/guests.routes";
import categoriesRoutes from "./routes/categories.routes";
import cors from "cors";

const app = express();
const port = 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/events", eventosRoutes);
app.use("/guests", guestRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log("Servidor rodando: http://localhost:5555");
});
