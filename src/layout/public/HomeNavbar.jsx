
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-xl font-bold">Logo</div>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-gray-700 hover:text-blue-500">Home</a></li>
                </ul>
            </div>
        </nav>
    );
}