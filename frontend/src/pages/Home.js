import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="continer">
      <div className="homee">
   
          <h1 className="h1">Welcome to the appointment system</h1>
          <Button  href="/doctors" variant="warning"> Doctors{" "}</Button>{' '}
          <Button  href="/patients" variant="warning"> Patients{" "}</Button>{' '}
        {/* <Button href="/doctors" className="mt-5" variant="primary">
          Doctors{" "}
        </Button> */}
      </div>
    </div>
  );
};

export default Home;
