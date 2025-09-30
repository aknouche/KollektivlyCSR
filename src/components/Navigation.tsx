'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">CSR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kollektivly</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/alla-projekt" className={`transition-colors ${isActive('/alla-projekt')}`}>
              Alla Projekt
            </Link>
            <Link href="/lagg-till-projekt" className={`transition-colors ${isActive('/lagg-till-projekt')}`}>
              Lägg till Projekt
            </Link>
            <Link href="/om-oss" className={`transition-colors ${isActive('/om-oss')}`}>
              Om Oss
            </Link>
            <Link href="/kontakt" className={`transition-colors ${isActive('/kontakt')}`}>
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
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