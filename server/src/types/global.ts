export interface IQuizQuestion {
  question: string;
  choices: string[];
  correctAnswer: string;
  userInfos: {
    name: string;
    email: string;
  };
}

export interface IQuiz {
  title: string;
  description: string;
  imgURL: string;
  questions: IQuizQuestion[];
}
