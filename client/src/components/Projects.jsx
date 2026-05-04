import { useEffect, useState } from 'react'
import { getProjects } from '../services/api'

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(function() {
        getProjects()
            .then(function(data) {
                setProjects(data)
            })
            .catch(function() {
                setError('Impossible de charger les projets.')
            })
            .finally(function() {
                setLoading(false)
            })
    }, [])

    return (
        <section id="projects" className="p-10 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Projets</h2>

            {loading && <p>Chargement...</p>}

            {error && <p className="text-red-600">{error}</p>}

            <div className="grid md:grid-cols-3 gap-6">
                {projects.map(function(project) {
                    return (
                        <div key={project.id} className="bg-white rounded-xl shadow p-4">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                            <p className="mb-4">{project.description}</p>

                            <div className="flex gap-4">
                                <a href={project.github} className="text-blue-600">
                                    GitHub
                                </a>

                                <a href={project.live} className="text-blue-600">
                                    Live
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}