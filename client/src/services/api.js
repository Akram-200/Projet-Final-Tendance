const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function getProjects() {
    const response = await fetch(`${API_URL}/api/projects`)

    if (!response.ok) {
        throw new Error('Erreur pendant le chargement des projets')
    }

    return response.json()
}

export async function getSkills() {
    const response = await fetch(`${API_URL}/api/skills`)

    if (!response.ok) {
        throw new Error('Erreur pendant le chargement des compétences')
    }

    return response.json()
}

export async function getExperiences() {
    const response = await fetch(`${API_URL}/api/experiences`)

    if (!response.ok) {
        throw new Error('Erreur pendant le chargement des expériences')
    }

    return response.json()
}

export async function sendContactMessage(data) {
    const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error('Erreur pendant l’envoi du message')
    }

    return response.json()
}