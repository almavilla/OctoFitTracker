import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
export default function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('teams').then((items) => { setTeams(items); setStatus('ready') }).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Community</p><h2>Teams</h2></div><span className="count-badge">{teams.length} teams</span></div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && teams.length === 0 && <p className="state-message">No teams found.</p>}
      <div className="resource-grid">{teams.map((team) => <article className="resource-card" key={team._id || team.id}><h3>{team.name || 'Unnamed team'}</h3><p>{team.memberIds?.length || team.members?.length || 0} members</p></article>)}</div>
    </section>
  )
}
