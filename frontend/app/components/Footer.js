export default function Footer(params) {
    return (
        <footer className="bg-black text-white py-10 px-6 mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div>
                    <h2 className="text-2xl font-bold mb-3">Bloggram</h2>
                    <p className="text-sm text-gray-400">
                        Building the future of the web with cutting-edge technologies.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                            <a href="#" className="hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                            <a href="#" className="hover:text-white">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                FAQs
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Social</h3>
                    <div className="flex flex-col text-sm space-y-2">
                        <a href="#" className="text-gray-300 hover:text-white">
                            Twitter
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            LinkedIn
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Facebook
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Github
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Bloggram. All rights reserved.
            </div>
        </footer>
    );
}