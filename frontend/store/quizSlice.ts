import { createSlice } from "@reduxjs/toolkit";
import { IQuiz } from "../types/global";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [] as IQuiz[],
  },
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuizById: (state, action) => {
      const { id, quiz } = action.payload;
      const index = state.quizzes.findIndex((q: IQuiz) => q._id === id);
      if (index !== -1) {
        state.quizzes[index] = quiz;
      }
    },
  },
});

export const { setQuizzes, setQuizById } = quizSlice.actions;

export default quizSlice.reducer;
