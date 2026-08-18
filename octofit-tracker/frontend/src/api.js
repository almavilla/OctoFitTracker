const codespaceName = import.meta.env.VITE_CODESPACE_NAME

// Define VITE_CODESPACE_NAME in frontend/.env.local for a Codespaces API.
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchResource(resource) {
  const response = await fetch(`${apiBaseUrl}/api/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`)
  }
  return getItems(await response.json())
}
