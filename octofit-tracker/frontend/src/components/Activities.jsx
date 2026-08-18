import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('activities').then((items) => { setActivities(items); setStatus('ready') }).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h2>Activities</h2></div><span className="count-badge">{activities.length} logged</span></div>
      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && activities.length === 0 && <p className="state-message">No activities found.</p>}
      {activities.length > 0 && <div className="table-shell"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td>{activity.type || 'Activity'}</td><td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td><td>{activity.calories ? `${activity.calories} kcal` : '—'}</td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>}
    </section>
  )
}
