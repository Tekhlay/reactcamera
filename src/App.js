import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Profile from './component/profile';
import CameraCapture from './component/camera';

function App() {
  return (
    <div className="App">
      <Profile />
      <CameraCapture />
    </div>
  );
}

export default App;
