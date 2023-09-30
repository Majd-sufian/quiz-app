import mongoose, { Document, Model, Schema } from "mongoose";
import { IQuiz, IQuizQuestion } from "../types/global";

interface IQuizDocument extends IQuiz, Document {}

const quizSchema = new Schema<IQuizDocument>({
  title: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 150,
  },
  imgURL: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
        maxlength: 200,
      },
      choices: {
        type: [String],
        required: true,
        validate: (choices: string[]) => choices.length >= 2,
      },
      correctAnswer: {
        type: String,
        required: true,
        validate: function (this: IQuizQuestion) {
          // Ensure that the correct answer is one of the choices
          return this.choices.includes(this.correctAnswer);
        },
      },
      userInfos: {
        name: {
          type: String,
          required: true,
          maxlength: 50,
        },
        email: {
          type: String,
          required: true,
          maxlength: 50,
        },
      },
    },
  ],
});

export const QuizModel: Model<IQuizDocument> = mongoose.model<IQuizDocument>(
  "Quiz",
  quizSchema
);
