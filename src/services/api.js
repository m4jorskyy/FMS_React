//api.js

export async function getMatches(nick, page = 1){
    const response = await fetch(`/api/players/${nick}/matches/?page=${page}`)

    if (!response.ok) {
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        throw error
    }
    return response.json()
}

export async function getPlayers() {
    const response = await fetch(`/api/players/`)

    if (!response.ok) {
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        throw error
    }

    return response.json()
}