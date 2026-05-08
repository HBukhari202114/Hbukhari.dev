import { useEffect, useState } from 'react'

export function useGithubRepos(username) {
  const [state, setState] = useState({ loading: true, error: null, repos: [] })

  useEffect(() => {
    let alive = true
    const run = async () => {
      try {
        setState({ loading: true, error: null, repos: [] })
        const res = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const json = await res.json()
        const repos = Array.isArray(json) ? json : []
        const cleaned = repos
          .filter((r) => r && !r.fork)
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        if (alive) setState({ loading: false, error: null, repos: cleaned })
      } catch (e) {
        if (!alive) return
        setState({ loading: false, error: e instanceof Error ? e.message : 'Failed to load', repos: [] })
      }
    }
    run()
    return () => {
      alive = false
    }
  }, [username])

  return state
}

