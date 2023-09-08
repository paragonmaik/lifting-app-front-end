export type Goal = 'STRENGTH' | 'HYPERTROPHY';

export type ErrorObject = {
  message: string;
};

export type Exercise = {
  id: number;
  userId?: string;
  name: string;
  load: number;
  goal: Goal;
  restSeconds: number;
  instructions: string;
  dateCreated: string;
};

export type Workout = {
  id: number;
  userId?: string;
  name: string;
  durationMins: number;
  description: string;
  dateCreated: string;
  exercises: Exercise[];
};

export type Program = {
  id: number;
  userId?: string;
  name: string;
  durationWeeks: number;
  description: string;
  dateCreated: string;
  workouts: Workout[];
};
