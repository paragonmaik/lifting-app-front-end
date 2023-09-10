import EditExerciseModal from './EditExerciseModal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Exercise } from 'types';

export default function ExerciseCard(exercise: Exercise) {
  return (
    <div className="p-2 border border-secondary">
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instructions</th>
            <th>Load</th>
            <th>Goal</th>
            <th>Rest</th>
            <th>Sets/Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h6>{exercise.name}</h6>
            </td>
            <td>{exercise.instructions}</td>
            <td>{exercise.load}kg</td>
            <td>{exercise.goal}</td>
            <td>{exercise.restSeconds} seconds</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-around">
        <Button>Start Timer</Button>
        <EditExerciseModal {...exercise} />
      </div>
    </div>
  );
}
