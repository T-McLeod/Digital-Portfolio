
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="container mx-auto px-6 md:px-12 py-6 text-center text-slate-400">
        <p>&copy; {currentYear} {PERSONAL_INFO.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
