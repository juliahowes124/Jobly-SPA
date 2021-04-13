import Routes from "./Routes";
import Nav from "./Nav";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
