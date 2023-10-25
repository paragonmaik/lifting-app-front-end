import SideBar from 'components/SideBar';
import useProgram from 'hooks/useProgram';
import MainComponent from 'components/MainComponent';
import Loading from 'components/ui/Loading';
import { AxiosError } from 'axios';

export default function Home() {
  const { data: programs, isLoading, error, isError } = useProgram();

  return (
    <main className="d-flex h-100">
      <SideBar />
      <section className="h-100 w-100 overflow-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <MainComponent
            isError={isError}
            error={error as AxiosError}
            programs={programs}
          />
        )}
      </section>
    </main>
  );
}
