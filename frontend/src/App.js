import logo from './logo.svg';
import './App.css';
import Tasks from './components/tasks';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tasks />
      </header>
    </div>
  );
}

export default App;
