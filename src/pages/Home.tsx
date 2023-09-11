import SideBar from 'components/SideBar';
import useProgram from 'hooks/useProgram';
import ProgramCard from 'components/ProgramCard';
import { ErrorObject } from 'types';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { Context } from 'context/Context';

export default function Home() {
  const {
    data: programs,
    isError,
    isLoading,
    error,
    isFetching,
  } = useProgram();
  const { curProgramPos } = useContext(Context);

  if (isFetching) console.log('fetching');
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data as ErrorObject;

    return <h1>{errorResponse.message}</h1>;
  }

  return (
    <main className="d-flex h-100">
      <SideBar />
      <section className="h-100 w-100 overflow-auto">
        <ProgramCard {...programs[curProgramPos]} />
      </section>
    </main>
  );
}
