import { useState, useEffect } from 'react'
import '../App.css'

function PuzzleCard({ puzzle }) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [solves, setSolves] = useState(puzzle.number_of_solves)

  async function handleSolve(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`http://localhost:3000/api/puzzles/${puzzle.id}/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      if (data.correct) {
        setSolves(s => s + 1)
        setResult('correct')
      } else {
        setResult('wrong')
      }
    } catch (err) {
      setResult('error: ' + err.message)
    }
    setSubmitting(false)
  }

  return (
    <div className="box offset">
      <h2>{puzzle.title}</h2>
      <p>{puzzle.description}</p>
      <p>Difficulty: {puzzle.difficulty} · Solves: {solves}</p>
      <form onSubmit={handleSolve}>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Your answer"
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Checking...' : 'Submit'}
        </button>
      </form>
      {result === 'correct' && <p style={{color: 'green'}}>Correct!</p>}
      {result === 'wrong' && <p style={{color: 'red'}}>Wrong answer, try again.</p>}
      {result?.startsWith('error') && <p style={{color: 'red'}}>{result}</p>}
    </div>
  )
}

function App() {
  const [puzzles, setPuzzles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://rust-c5706-default-rtdb.firebaseio.com/puzzles.json')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const list = Object.entries(data).map(([id, puzzle]) => ({ id, ...puzzle }))
          setPuzzles(list)
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading challenges...</p>
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>

  return (
    <>
      <h1>Browse Challenges</h1>
      {puzzles.length === 0 ? (
        <p>No challenges yet.</p>
      ) : (
        puzzles.map(puzzle => <PuzzleCard key={puzzle.id} puzzle={puzzle} />)
      )}
    </>
  )
}

export default App
