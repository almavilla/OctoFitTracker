import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('users')
      .then((items) => {
        setUsers(items)
        setStatus('ready')
      })
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">People</p>
          <h2>Users</h2>
        </div>
        <span className="count-badge">{users.length} total</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading users...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && users.length === 0 && <p className="state-message">No users found.</p>}
      {users.length > 0 && (
        <div className="table-shell">
          <table className="table align-middle mb-0">
            <thead><tr><th>Name</th><th>Email</th><th>Goal</th></tr></thead>
            <tbody>{users.map((user) => <tr key={user._id || user.id}><td>{user.name || 'Unnamed user'}</td><td>{user.email || '—'}</td><td>{user.goal || '—'}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}
