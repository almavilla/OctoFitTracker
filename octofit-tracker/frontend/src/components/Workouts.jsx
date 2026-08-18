import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('workouts').then((items) => { setWorkouts(items); setStatus('ready') }).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Personalized training</p><h2>Workouts</h2></div><span className="count-badge">{workouts.length} plans</span></div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && workouts.length === 0 && <p className="state-message">No workouts found.</p>}
      <div className="resource-grid">{workouts.map((workout) => <article className="resource-card" key={workout._id || workout.id}><p className="eyebrow">{workout.category || 'Training'}</p><h3>{workout.name || 'Workout plan'}</h3><div className="card-meta"><span>{workout.difficulty || 'All levels'}</span><span>{workout.durationMinutes ? `${workout.durationMinutes} min` : 'Flexible'}</span></div></article>)}</div>
    </section>
  )
}
