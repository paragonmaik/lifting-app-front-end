import SideBar from 'components/SideBar';
import useProgram from 'hooks/useProgram';
import MainComponent from 'components/MainComponent';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
import { AxiosError } from 'axios';

export default function Home() {
  const { data: programs, isLoading, error, isError } = useProgram();

  return (
    <main className="d-flex h-100">
      <SideBar />
      <section className="h-100 w-100 overflow-auto">
        {isLoading ? (
          <div className="d-flex flex-column">
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
            <Placeholder as={Card.Footer} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </div>
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
