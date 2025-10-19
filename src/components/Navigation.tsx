'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kollektivly</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/alla-projekt" className={`transition-colors ${isActive('/alla-projekt')}`}>
              Projekt
            </Link>
            <Link href="/faq" className={`transition-colors ${isActive('/faq')}`}>
              FAQ
            </Link>
            <Link href="/om-oss" className={`transition-colors ${isActive('/om-oss')}`}>
              Om Oss
            </Link>
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              <Link
                href="/logga-in"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Logga in
              </Link>
              <Link
                href="/registrera"
                className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Registrera
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;