import WorkoutCard from './WorkoutCard';
import ProgramModal from './ProgramModal';
import WorkoutModal from './WorkoutModal';
import { Program } from 'types';
import { Button } from 'react-bootstrap';

export default function ProgramCard(program: Program) {
  return (
    <div className="container">
      <section className="row me-100">
        <div className="p-2 mt-1 mb-1">
          <div className="my-1 d-flex justify-content-around align-items-center">
            <h1>{program.name}</h1>
            <div>
              <Button className="mx-1" variant="danger">
                Delete Program
              </Button>
              <ProgramModal isAdd={false} programDTO={program} />
            </div>
          </div>
          <div className="my-1 w-100 d-flex justify-content-around align-items-center">
            <span>Duration: {program.durationWeeks} weeks</span>
            <WorkoutModal programId={program.id} isAdd={true} />
          </div>
        </div>
        {program.workouts.map((workout) => (
          <WorkoutCard key={workout.id} {...workout} />
        ))}
      </section>
    </div>
  );
}
