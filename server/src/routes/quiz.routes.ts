import { Router } from "express";
import {
  addQuestionToQuiz,
  getQuizById,
  getQuizzes,
} from "../controllers/quiz.controller";
import { setCorsHeaders } from "../middleware/corsMiddleware";

const router = Router();

router.use(setCorsHeaders);

router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/add-question", addQuestionToQuiz);

export default router;
