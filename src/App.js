import logo from './logo.svg';
import BirthdayMessage from './components/Birthdaymessage';
import BirthdayCountdown from './components/BirthdayCountdown';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Happy Birthday!</h1>
      {/* <BirthdayMessage /> */}
      <BirthdayCountdown targetDate="2025-01-26T20:58:00" />
    </div>
  );
}

export default App;
