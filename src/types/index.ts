export type Message =
  | { type: 'GET_RATE' }
  | { type: 'SET_RATE'; payload: { rate: number; strict: boolean } }
