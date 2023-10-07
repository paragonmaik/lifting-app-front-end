export type Goal = 'STRENGTH' | 'HYPERTROPHY';

export type ErrorObject = {
  message: string;
};

export type ExerciseDTO = {
  id?: number;
  name: string;
  instructions: string;
  load: number;
  goal: Goal;
  restSeconds: number;
  sets: number;
  reps: number;
  execOrder: number;
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
  sets: number;
  reps: number;
  execOrder: number;
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
