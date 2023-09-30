import { useQuery } from "react-query";
import axios from "axios";
import { IQuiz } from "../../types/global";

// TODO: MOVE TO ENV
const API_BASE_URL = "http://localhost:4000/quizzes";

const fetchQuizzes = async (): Promise<IQuiz[]> => {
  const response = await axios.get<IQuiz[]>(API_BASE_URL);
  return response.data;
};

const fetchQuizById = async (id: string): Promise<IQuiz> => {
  const response = await axios.get<IQuiz>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const useFetchQuizzes = (): ReturnType<typeof useQuery> => {
  return useQuery<IQuiz[]>("quizzes", fetchQuizzes, {
    refetchOnWindowFocus: false,
  });
};

export const useFetchQuizById = (id: string) => {
  return useQuery<IQuiz>(["quiz", id], () => fetchQuizById(id), {
    refetchOnWindowFocus: false,
  });
};
