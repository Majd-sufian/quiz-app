import { Request, Response } from "express";
import { QuizModel } from "../modals/quiz.model";

export const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await QuizModel.find();
    res.send(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.send(quiz);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addQuestionToQuiz = async (req: Request, res: Response) => {
  try {
    const { quizTitle } = req.body;

    const quiz = await QuizModel.findOne({ title: quizTitle });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const { question, choices, correctAnswer, userInfos } = req.body;

    const isQuestionUnique = quiz.questions.every(
      (existingQuestion) => existingQuestion.question !== question
    );

    if (!isQuestionUnique) {
      return res
        .status(400)
        .json({ message: "Question already exists in the quiz" });
    }

    const newQuestion = {
      question,
      choices,
      correctAnswer,
      userInfos,
    };

    quiz.questions.push(newQuestion);

    await quiz.save();

    res.status(200).json({ message: "Question added to quiz", quiz });
  } catch (error) {
    console.error("Error adding question to quiz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
