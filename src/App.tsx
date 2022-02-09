import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes/RoutesList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
