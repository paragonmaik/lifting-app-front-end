import ProgramCard from './ProgramCard';
import { AxiosError } from 'axios';
import { ErrorObject, Program } from 'types';
import { useContext } from 'react';
import { Context } from 'context/Context';

type MainComponentProps = {
  error: AxiosError;
  programs?: Program[];
};

export default function MainComponent({ error, programs }: MainComponentProps) {
  const { curProgramPos } = useContext(Context);

  const err = error?.response?.data as ErrorObject;
  return (
    <>
      {!programs ? (
        <h1>{err.message}</h1>
      ) : (
        <ProgramCard {...programs[curProgramPos]} />
      )}
    </>
  );
}
