export interface TAnswer {
  answer_id: string;
  answer_pic: string;
  answer_text: string;
}

export interface TUserAnswer {
  question: TQuestion['number'];
  answer: TAnswer;
}
export interface TQuestion {
  answers: TAnswer[];
  number: number;
  question: {
    question_id: string;
    question_text: string;
  };
}
export interface IState {
  demo: boolean;
  questions: TQuestion[] | null;
  questionsCount: number;
  answers: TUserAnswer[];
  readonly errors?: string | undefined;
  readonly loading: boolean;
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IStore {
  store: IState;
  dispatch: IAction | any;
}

export enum EActionTypes {
  SET_QUESTIONS = 'SET_QUESTIONS',

  SET_LOADING = 'SET_LOADING',

  SET_ANSWER = 'SET_ANSWER',

  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  RESET_MODAL = 'RESET_MODAL',
}
