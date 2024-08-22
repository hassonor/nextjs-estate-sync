'use client'
import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import {FaGoogle} from "react-icons/fa";
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';
import {signIn, signOut, useSession, getProviders, ClientSafeProvider} from "next-auth/react";
import {sign} from "node:crypto";

const Navbar = () => {
    const {data: session} = useSession();
    const profileImage = session?.user?.image;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);


    const pathname = usePathname();

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }

        setAuthProviders();
    }, [])


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="bg-gray-900 border-b border-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            id="mobile-dropdown-button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        {/* Logo */}
                        <Link href="/" className="flex flex-shrink-0 items-center">
                            <Image
                                className="h-10 w-auto"
                                src={logo}
                                alt="EstateSync"
                            />
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">
                                EstateSync
                            </span>
                        </Link>
                        {/* Desktop Menu Hidden below md screens */}
                        <div className="hidden md:ml-6 md:block">
                            <div className="flex space-x-2">
                                <Link href="/"
                                      className={`${
                                          pathname === '/' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                      } block rounded-md px-3 py-2`}>
                                    Home
                                </Link>
                                <Link href="/properties"
                                      className={`${
                                          pathname === '/properties' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                      } block rounded-md px-3 py-2`}>
                                    Properties
                                </Link>
                                {session &&
                                    (<Link href="/properties/add"
                                           className={`${
                                               pathname === '/properties/add' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                           } block rounded-md px-3 py-2`}>
                                        Add Property
                                    </Link>)}
                            </div>
                        </div>
                    </div>
                    {!session && (<div className="hidden md:block md:ml-6">
                        <div className="flex items-center">
                            {providers && Object.values(providers).map((provider, index) => (
                                <button
                                    key={index}
                                    onClick={() => signIn(provider.id)}
                                    className="flex items-center text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
                                    <FaGoogle className="text-white mr-2"/>
                                    <span>Login or Register</span>
                                </button>
                            ))}
                        </div>
                    </div>)}
                    {session && (<div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                        <Link href="/messages" className="relative group">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                            <span
                                className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                2
                            </span>
                        </Link>
                        {/* Profile dropdown button */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <Image
                                        className="h-8 w-8 rounded-full"
                                        src={profileImage || profileDefault}
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                </button>
                            </div>

                            {/* Profile dropdown */}
                            {isProfileMenuOpen && (<div
                                id="user-menu"
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <Link href="/profile"
                                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                      role="menuitem" onClick={() => setIsProfileMenuOpen(false)}>
                                    Your Profile
                                </Link>
                                <Link href="/properties/saved"
                                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                      role="menuitem" onClick={() => setIsProfileMenuOpen(false)}>
                                    Saved Properties
                                </Link>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    role="menuitem"
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>)}
                        </div>
                    </div>)}
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMobileMenuOpen && (
                <div id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link
                            href='/'
                            className={`${
                                pathname === '/' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            } block rounded-md px-3 py-2 text-base font-medium`}>
                            Home
                        </Link>
                        <Link
                            href='/properties'
                            className={`${
                                pathname === '/properties' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            } block rounded-md px-3 py-2 text-base font-medium`}>
                            Properties
                        </Link>
                        {session && (
                            <Link
                                href='/properties/add'
                                className={`${
                                    pathname === '/properties/add' ? 'bg-gray-700 text-white font-bold border-b-2 border-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                } block rounded-md px-3 py-2 text-base font-medium`}>
                                Add Property
                            </Link>)}
                        {!session && (<button
                            className="flex items-center text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 my-5"
                        >
                            <i className="fa-brands fa-google mr-2"></i>
                            <span>Login or Register</span>
                        </button>)}
                    </div>
                </div>)}
        </nav>
    );
};

export default Navbar;
