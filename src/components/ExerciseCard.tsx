import Table from 'react-bootstrap/Table';
import ExerciseModal from './ExerciseModal';
import DeleteModal from './DeleteModal';
import Timer from './Timer';
import { Exercise } from 'types';

export default function ExerciseCard(exercise: Exercise) {
  return (
    <div className="p-2 my-2 border rounded border-secondary bg-white">
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            {exercise.instructions ? <th>Instructions</th> : null}
            <th>Load</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Goal</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h6>{exercise.name}</h6>
            </td>
            {exercise.instructions ? <td>exercise.instructions</td> : null}
            <td>{exercise.load}kg</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.goal}</td>
            <td>{exercise.restSeconds} seconds</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-around my-2">
        <Timer timeInSeconds={exercise.restSeconds} />
        <div>
          <DeleteModal
            shouldResetPos={false}
            modelType="Exercise"
            modelName={exercise.name}
            url={`/api/exercises/${exercise.id}`}
          />
          <ExerciseModal isAdd={false} exerciseDTO={exercise} />
        </div>
      </div>
    </div>
  );
}
