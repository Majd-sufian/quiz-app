export interface IQuizQuestion {
  question: string;
  choices: string[];
  correctAnswer: string;
}

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  imgURL: string;
  questions: IQuizQuestion[];
}

export interface AddQuestionData extends IQuizQuestion {
  quizTitle: string;
}

export interface IUser {
  name: string;
  email: string;
}
