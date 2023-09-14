import SideBar from 'components/SideBar';
import useProgram from 'hooks/useProgram';
import MainComponent from 'components/MainComponent';
import { AxiosError } from 'axios';

export default function Home() {
  const { data: programs, isLoading, error } = useProgram();

  return (
    <main className="d-flex h-100">
      <SideBar />
      <section className="h-100 w-100 overflow-auto">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <MainComponent error={error as AxiosError} programs={programs} />
        )}
      </section>
    </main>
  );
}
