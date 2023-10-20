import ExerciseCard from './ExerciseCard';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import WorkoutModal from './WorkoutModal';
import ExerciseModal from './ExerciseModal';
import DeleteModal from './DeleteModal';
import { Exercise, Workout } from 'types';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from 'utils/StrictModeDroppable';
import { useMutation } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import { useLocalStorage } from 'hooks/useLocalStorage';

export default function WorkoutCard(workout: Workout) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const exerciseOrder = workout.exercises.length;
  const [token, _setToken] = useLocalStorage('token', '');

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
  });

  const exerciseRequest = (data: {}) => {
    mutate({
      method: 'put',
      url: '/api/exercises/reorder',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  const setExecOrder = (sourceIndex: number, destinationIndex: number) => {
    if (Math.abs(sourceIndex - destinationIndex) <= 1) {
      workout.exercises[sourceIndex].execOrder = destinationIndex;
      workout.exercises[destinationIndex].execOrder = sourceIndex;
      return;
    }

    if (sourceIndex < destinationIndex) {
      workout.exercises[sourceIndex].execOrder = destinationIndex + 0.5;

      workout.exercises.forEach((exercise) => {
        if (exercise.execOrder <= destinationIndex) {
          exercise.execOrder -= 1;
        }
      });

      workout.exercises[sourceIndex].execOrder -= 0.5;
      return;
    }

    if (sourceIndex > destinationIndex) {
      workout.exercises[sourceIndex].execOrder = destinationIndex - 0.5;
      workout.exercises.forEach((exercise) => {
        if (exercise.execOrder >= destinationIndex) {
          exercise.execOrder += 1;
        }
      });

      workout.exercises[sourceIndex].execOrder += 0.5;
      return;
    }
  };

  function handleOnDragEnd(result: DropResult): void {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex == destinationIndex) return;

    setExecOrder(sourceIndex, destinationIndex);

    exerciseRequest(workout.exercises);
  }

  return (
    <div className="p-2 mt-1 mb-1 border bg-light">
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
      <hr className="w-100" />
      <div className="my-3 w-100 d-flex justify-content-around">
        <span>Duration: {workout.durationMins} minutes</span>
        <span>
          {workout.description ? workout.description : 'No description'}
        </span>
      </div>
      <Button
        variant="secondary"
        onClick={() => setIsActive(!isActive)}
        aria-controls={`workout-card-${workout.id}`}
        aria-expanded={isActive}
      >
        {`${isActive ? 'Hide' : 'Show'} Exercises`}
      </Button>
      <hr className="w-100" />
      <Collapse in={isActive}>
        <div id={`workout-card-${workout.id}`}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="exercises">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {workout.exercises
                    .sort(
                      (a: Exercise, b: Exercise) => a.execOrder - b.execOrder
                    )
                    .map((exercise, index) => (
                      <Draggable
                        key={exercise.id}
                        draggableId={exercise.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <ExerciseCard {...exercise} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Collapse>
      <hr className="w-100" />
      <div className="my-2">
        <ExerciseModal
          isAdd={true}
          exerciseOrder={exerciseOrder}
          workoutId={workout.id}
        />
      </div>
    </div>
  );
}
