import SideBar from 'components/SideBar';
import useProgram from 'hooks/useProgram';
import Spinner from 'react-bootstrap/Spinner';
import MainComponent from 'components/MainComponent';
import { AxiosError } from 'axios';

export default function Home() {
  const { data: programs, isLoading, error, isError } = useProgram();

  return (
    <main className="d-flex h-100">
      <SideBar />
      <section className="h-100 w-100 overflow-auto">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
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
