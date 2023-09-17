import ExerciseCard from './ExerciseCard';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import WorkoutModal from './WorkoutModal';
import ExerciseModal from './ExerciseModal';
import { Workout } from 'types';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

export default function WorkoutCard(workout: Workout) {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className="card p-2 mt-1 mb-1 border border-primary">
      <div className="d-flex justify-content-around">
        <h4>{workout.name}</h4>
        <div>
          <DeleteModal
            shouldResetPos={false}
            modelType="Workout"
            modelName={workout.name}
            url={`/api/workouts/${workout.id}`}
          />
          <WorkoutModal isAdd={false} workoutDTO={workout} />
        </div>
      </div>
      <div className="my-3 w-100 d-flex justify-content-around">
        <span>Duration: {workout.durationMins} minutes</span>
        <span>
          {workout.description ? workout.description : 'No description'}
        </span>
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
          <ExerciseModal isAdd={true} workoutId={workout.id} />
        </div>
      </Collapse>
    </div>
  );
}
