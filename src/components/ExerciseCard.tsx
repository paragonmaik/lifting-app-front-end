import Table from 'react-bootstrap/Table';
import ExerciseModal from './ExerciseModal';
import DeleteModal from './DeleteModal';
import Timer from './Timer';
import { Exercise } from 'types';

export default function ExerciseCard(exercise: Exercise) {
  return (
    <div className="p-2 my-2 border border-secondary">
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instructions</th>
            <th>Load</th>
            <th>Goal</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h6>{exercise.name}</h6>
            </td>
            <td>
              {exercise.instructions
                ? exercise.instructions
                : 'No instructions.'}
            </td>
            <td>{exercise.load}kg</td>
            <td>{exercise.goal}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
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
