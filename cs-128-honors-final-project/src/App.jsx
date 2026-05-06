import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <h1>Welcome to FileHunt</h1>

      <p className="offset"><b>somewhere in these files there are answers.</b></p>

      <div className="box offset">
        <p>Download files. Search for hidden answers. Submit what you find. Climb the scoreboard.</p>
        <p>
          <Link to="/browse">Browse challenges</Link>
          <Link to="/create">Upload a new challenge</Link>
        </p>
      </div>

      <div className="box crooked">
        <h2>How It Works</h2>
        <ol>
          <li>Download the challenge file.</li>
          <li>Dig around until you find the hidden answer.</li>
          <li>Submit the answer and collect points.</li>
        </ol>
      </div>
    </>
  )
}

export default App
