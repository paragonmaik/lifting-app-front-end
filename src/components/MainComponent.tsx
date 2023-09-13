import ProgramCard from './ProgramCard';
import { AxiosError } from 'axios';
import { ErrorObject, Program } from 'types';
import { useContext, useState } from 'react';
import { Context } from 'context/Context';

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
  const [errorData, setErrorData] = useState<ErrorObject>();

  if (isError) {
    const err = error.response?.data as ErrorObject;
    setErrorData(err);
  }

  return (
    <>
      {!programs ? (
        <h1>{errorData?.message}</h1>
      ) : (
        <ProgramCard {...programs[curProgramPos]} />
      )}
    </>
  );
}
