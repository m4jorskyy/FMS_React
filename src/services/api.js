//api.js

import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_BACKEND_URL

export async function getMe() {
    const request = {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(`${API_BASE}/api/me/`, request)

    if (!response.ok) {
        throw new Error("Not authenticated")
    }

    return response.json()
}


export async function getUser(nick) {
    const request = {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(`${API_BASE}/api/users/${nick}/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getUsers(page = 1) {
    const request = {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(`${API_BASE}/api/users/?page=${page}`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function deleteUser(nick) {
    const request = {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }

    const response = await fetch(`${API_BASE}/api/users/${nick}/delete/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function patchUser(firstName, lastName, nick, email, password, prevNick) {
    const body = {
        "first_name": firstName,
        "last_name": lastName,
        "nick": nick,
        "email": email,
    }

    if (password) {
        body.password = password
    }

    const request = {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE}/api/users/edit/${prevNick}/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getMatches(nick, page = 1) {
    const response = await fetch(`${API_BASE}/api/players/matches/${nick}/?page=${page}`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }
    return response.json()
}

export async function getPlayers() {
    const response = await fetch(`${API_BASE}/api/players/`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function postPlayer(firstName, lastName, nick, lane, champion, teamRole, twitter, youtube, twitch, kick, instagram, tiktok) {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "nick": nick,
            "lane": lane,
            "champion": champion,
            "team_role": teamRole,
            "twitter": twitter,
            "youtube": youtube,
            "twitch": twitch,
            "kick": kick,
            "instagram": instagram,
            "tiktok": tiktok
        })
    }

    const response = await fetch(`${API_BASE}/api/players/create/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }
    return response
}

export async function postRegister(firstName, lastName, nick, email, password) {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "nick": nick,
            "email": email,
            "password": password
        })
    }

    const response = await fetch(`${API_BASE}/api/register/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response
}

export async function postLogin(nick, password) {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({
            "nick": nick,
            "password": password
        })
    }

    const response = await fetch(`${API_BASE}/api/login/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function postLogout() {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }

    const response = await fetch(`${API_BASE}/api/logout/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getOfficialMatches(teamId, status, page = 1) {
    const response = await fetch(`${API_BASE}/api/officialmatches/?team_id=${teamId}&status=${status}&page=${page}`)
    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }
    return response.json()
}

export async function postNewsletter(email) {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({
            "email": email
        })
    }

    const response = await fetch(`${API_BASE}/api/newsletter/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function postPost(title, text) {
    const request = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({
            "title": title,
            "text": text
        })
    }

    const response = await fetch(`${API_BASE}/api/posts/create/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response
}

export async function getPosts(page = 1) {
    const response = await fetch(`${API_BASE}/api/posts/?page=${page}`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getLatestPost() {
    const response = await fetch(`${API_BASE}/api/posts/?page=1&page_size=1`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    const data = await response.json();
    return data.results[0] || null;
}

export async function getPlayerRanks(nick) {
    const response = await fetch(`${API_BASE}/api/players/${nick}/ranks`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}