export default function Navbar() {
    return (
        <nav className="p-4 bg-black text-white flex justify-between items-center">
            <h1 className="font-bold">Portfolio</h1>

            <div className="flex gap-4 text-sm">
                <a href="#projects">Projets</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    )
}