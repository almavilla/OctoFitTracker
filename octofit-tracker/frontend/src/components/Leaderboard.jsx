import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('leaderboard').then((items) => { setEntries(items.sort((left, right) => (left.rank || 999) - (right.rank || 999))); setStatus('ready') }).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h2>Leaderboard</h2></div><span className="count-badge">{entries.length} ranked</span></div>
      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && entries.length === 0 && <p className="state-message">No rankings found.</p>}
      {entries.length > 0 && <div className="table-shell"><table className="table align-middle mb-0"><thead><tr><th>Rank</th><th>User</th><th>Points</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry._id || entry.id}><td><span className="rank-mark">{entry.rank || index + 1}</span></td><td>{entry.userName || entry.userId || 'Unknown user'}</td><td className="points">{entry.points || 0}</td></tr>)}</tbody></table></div>}
    </section>
  )
}
