import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import quizRoutes from "./routes/quiz.routes";

export const app = express();
app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

app.use("/quizzes", quizRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
