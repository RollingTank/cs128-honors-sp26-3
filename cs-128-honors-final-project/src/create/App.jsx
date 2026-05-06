import { useState } from 'react'
import '../App.css'

function App() {
  const [status, setStatus] = useState(null)
  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    setStatus('submitting')
    try {
      const res = await fetch('http://localhost:3000/api/puzzles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          description: form.description.value,
          answer: form.answer.value,
          difficulty: form.difficulty.value,
          number_of_solves: 0,
        }),
      })
      if (!res.ok) throw new Error(`Firebase error: ${res.status}`)
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error: ' + err.message)
    }
  }

  return (
    <>
      <section id="center">
        <div>
          <h2>New Challenge Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Challenge title" required />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Short hint or description" />

            <label htmlFor="answer">Answer</label>
            <input type="text" id="answer" name="answer" placeholder="Expected answer" required />

            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty">
              <option value="easy">Easy — 5 points</option>
              <option value="medium" defaultValue>Medium — 10 points</option>
              <option value="hard">Hard — 20 points</option>
            </select>


            {status === 'success' && <p style={{color: 'green'}}>Challenge created!</p>}
            {status?.startsWith('error') && <p style={{color: 'red'}}>{status}</p>}
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Creating...' : 'Create Challenge'}
            </button>
          </form>
        </div>
      </section>


    </>
  )
}

export default App
