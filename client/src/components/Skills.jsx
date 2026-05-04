import { useEffect, useState } from 'react'
import { getSkills } from '../services/api'

export default function Skills() {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function() {
        getSkills()
            .then(function(data) {
                setSkills(data)
            })
            .catch(function() {
                setSkills([])
            })
            .finally(function() {
                setLoading(false)
            })
    }, [])

    return (
        <section className="p-10">
            <h2 className="text-3xl font-bold mb-6">Compétences</h2>

            {loading && <p>Chargement...</p>}

            <div className="grid md:grid-cols-2 gap-4">
                {skills.map(function(skill) {
                    return (
                        <div key={skill.id} className="border rounded-xl p-4">
                            <div className="flex justify-between mb-2">
                                <p>{skill.name}</p>
                                <p>{skill.level}%</p>
                            </div>

                            <div className="bg-gray-200 h-3 rounded">
                                <div
                                    className="bg-black h-3 rounded"
                                    style={{ width: skill.level + '%' }}
                                ></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}