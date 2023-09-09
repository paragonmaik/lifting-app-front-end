import ExerciseCard from './ExerciseCard';
import { Workout } from 'types';
import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';

export default function WorkoutCard(workout: Workout) {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className="card p-2 mt-1 mb-1 border border-primary">
      <div className="d-flex justify-content-around">
        <h4>{workout.name}</h4>
        <Button>Edit Workout</Button>
      </div>
      <div className="my-3 w-100 d-flex justify-content-around">
        <span>Duration: {workout.durationMins} minutes</span>
        <div></div>
      </div>
      <Button
        onClick={() => setIsActive(!isActive)}
        aria-controls={`workout-card-${workout.id}`}
        aria-expanded={isActive}
      >
        {`${isActive ? 'Hide' : 'Show'} Exercises`}
      </Button>
      <Collapse in={isActive}>
        <div id={`workout-card-${workout.id}`}>
          {workout.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} {...exercise} />
          ))}
          <Button>Add Exercise</Button>
        </div>
      </Collapse>
    </div>
  );
}
