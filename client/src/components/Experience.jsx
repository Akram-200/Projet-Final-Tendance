import { useEffect, useState } from 'react'
import { getExperiences } from '../services/api'

export default function Experience() {
    const [experiences, setExperiences] = useState([])

    useEffect(function() {
        getExperiences()
            .then(function(data) {
                setExperiences(data)
            })
            .catch(function() {
                setExperiences([])
            })
    }, [])

    return (
        <section className="p-10 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Expérience</h2>

            <div className="space-y-4">
                {experiences.map(function(item) {
                    return (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-bold">{item.title}</h3>
                            <p>{item.place}</p>
                            <p className="text-sm text-gray-600">{item.year}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}