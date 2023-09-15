import { AxiosError } from 'axios';
import { ErrorObject, Program } from 'types';
import { useContext } from 'react';
import { Context } from 'context/Context';
import ProgramCard from './ProgramCard';

type MainComponentProps = {
  isError: boolean;
  error: AxiosError;
  programs?: Program[];
};

export default function MainComponent({
  error,
  programs,
  isError,
}: MainComponentProps) {
  const { curProgramPos } = useContext(Context);
  const err = error?.response?.data as ErrorObject;

  return (
    <>
      {!programs || isError ? (
        <h1>{err.message}</h1>
      ) : (
        <ProgramCard {...programs[curProgramPos]} />
      )}
    </>
  );
}
