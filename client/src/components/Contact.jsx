import { useState } from 'react'
import { sendContactMessage } from '../services/api'

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [status, setStatus] = useState('')

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setStatus('Envoi en cours...')

        try {
            await sendContactMessage(form)

            setStatus('Message envoyé avec succès.')

            setForm({
                name: '',
                email: '',
                message: ''
            })
        } catch (error) {
            setStatus('Erreur pendant l’envoi du message.')
        }
    }

    return (
        <section id="contact" className="p-10">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>

            <form onSubmit={handleSubmit} className="max-w-xl">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="border p-2 block mb-2 w-full"
                    required
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 block mb-2 w-full"
                    required
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="border p-2 block mb-2 w-full h-32"
                    required
                ></textarea>

                <button className="bg-black text-white p-2">
                    Envoyer
                </button>
            </form>

            {status && <p className="mt-4">{status}</p>}
        </section>
    )
}