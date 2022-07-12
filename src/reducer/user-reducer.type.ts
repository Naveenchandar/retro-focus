// enum ActionTypes {
//     SET_USERNAME = 'SET_USERNAME',
//     FETCH_TIME = 'FETCH_TIME',
//     GREETINGS = 'GREETINGS',
//     FETCH_QUOTES = 'FETCH_QUOTES',
//     ADD_UPDATE_TASKS = 'ADD_UPDATE_TASKS',
// }

export type Action =
  | { type: 'SET_USERNAME', payload: string }
  | { type: 'FETCH_TIME'; payload: number }
  | { type: 'GREETINGS'; payload: number }
  | { type: 'FETCH_QUOTES', payload: string }
  | { type: 'ADD_UPDATE_TASKS', payload: string }

export type InitialStateType = {
    userName: string,
    time: number,
    greetings: string,
    tasks: string,
    quotesOfTheDay: string,
}

export interface UserAction {
    type: Action;
    payload: string | number;
}