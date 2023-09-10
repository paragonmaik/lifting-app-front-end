import WorkoutCard from './WorkoutCard';
import EditProgramModal from './EditProgramModal';
import AddWorkoutModal from './AddWorkoutModal';
import { Program } from 'types';

export default function ProgramCard(program: Program) {
  return (
    <div className="container">
      <section className="row me-100">
        <div className="p-2 mt-1 mb-1">
          <div className="my-1 d-flex justify-content-around align-items-center">
            <h1>{program.name}</h1>
            <EditProgramModal {...program} />
          </div>
          <div className="my-1 w-100 d-flex justify-content-around align-items-center">
            <span>Duration: {program.durationWeeks} weeks</span>
            <AddWorkoutModal />
          </div>
        </div>
        {program.workouts.map((workout) => (
          <WorkoutCard key={workout.id} {...workout} />
        ))}
      </section>
    </div>
  );
}
