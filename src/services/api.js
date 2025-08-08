//api.js

import Cookies from 'js-cookie'

export async function getUser(nick, token) {
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(`/api/users/${nick}/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getUsers(token, page = 1) {
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(`/api/users/?page=${page}`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function deleteUser(nick, token) {
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(`/api/users/delete/${nick}/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function patchUser(first_name, last_name, nick, email, password, token, prevNick) {
    const body = {
        "first_name": first_name,
        "last_name": last_name,
        "nick": nick,
        "email": email,
    }

    if(password){
        body.password = password
    }

    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(`/api/users/edit/${prevNick}/`, request)

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
    const response = await fetch(`/api/players/${nick}/matches/?page=${page}`)

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
    const response = await fetch(`/api/players/`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
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

    const response = await fetch(`/api/register/`, request)

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
            "X-CRSFToken": Cookies.get("crsftoken")
        },
        body: JSON.stringify({
            "nick": nick,
            "password": password
        })
    }

    const response = await fetch(`/api/login/`, request)

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
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_PANDASCORE_API_KEY}`
        }
    }

    const response = await fetch(`https://api.pandascore.co/lol/matches?filter[opponent_id]=${teamId}&filter[status]=${status}&page[number]=${page}&page[size]=5`, request)

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
        },
        body: JSON.stringify({
            "email": email
        })
    }

    const response = await fetch(`/api/newsletter/`, request)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}

export async function getPosts(page = 1) {
    const response = await fetch(`/api/posts/?page=${page}`)

    if (!response.ok) {
        const errorData = await response.json()
        const error = new Error(`HTTP ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
    }

    return response.json()
}