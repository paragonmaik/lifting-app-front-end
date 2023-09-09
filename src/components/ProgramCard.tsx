import WorkoutCard from './WorkoutCard';
import { Program } from 'types';
import { Button } from 'react-bootstrap';

export default function ProgramCard(program: Program) {
  return (
    <div className="container">
      <section className="row me-100">
        <div className="p-2 mt-1 mb-1 ">
          <div className="d-flex justify-content-around">
            <h1>{program.name}</h1>
            <div className="my-auto">
              <Button className="mx-1">Add Workout</Button>
              <Button className="mx-1">Edit Program</Button>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-around">
            <span>Duration: {program.durationWeeks} weeks</span>
            <div></div>
          </div>
        </div>
        {program.workouts.map((workout) => (
          <WorkoutCard key={workout.id} {...workout} />
        ))}
      </section>
    </div>
  );
}
