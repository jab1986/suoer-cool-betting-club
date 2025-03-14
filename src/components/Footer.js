import React from 'react';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-wwe-black to-zinc-900 border-t-4 border-wwe-gold">
      <div className="wwe-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-impact text-wwe-yellow mb-4 uppercase tracking-wider">
              Super Cool <span className="text-white">Betting</span> Club
            </h3>
            <p className="text-zinc-400 mb-4">
              The ultimate platform for tracking bets with your friends in true WWE Attitude Era style!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-wwe-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-wwe-gold transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xl font-impact text-wwe-gold mb-4 uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Trophy className="w-5 h-5 text-wwe-red mr-2" />
                <span className="text-zinc-300 hover:text-white">Leaderboard</span>
              </li>
              <li className="flex items-center">
                <Users className="w-5 h-5 text-wwe-red mr-2" />
                <span className="text-zinc-300 hover:text-white">Player Profiles</span>
              </li>
              <li className="flex items-center">
                <Calendar className="w-5 h-5 text-wwe-red mr-2" />
                <span className="text-zinc-300 hover:text-white">Fixture Management</span>
              </li>
              <li className="flex items-center">
                <TrendingUp className="w-5 h-5 text-wwe-red mr-2" />
                <span className="text-zinc-300 hover:text-white">Stats & Analysis</span>
              </li>
            </ul>
          </div>

          {/* Players */}
          <div className="col-span-1">
            <h4 className="text-xl font-impact text-wwe-gold mb-4 uppercase tracking-wider">
              Players
            </h4>
            <ul className="space-y-2">
              <li className="text-zinc-300 hover:text-white">Gaz</li>
              <li className="text-zinc-300 hover:text-white">Joe</li>
              <li className="text-zinc-300 hover:text-white">Sean</li>
              <li className="text-zinc-300 hover:text-white">Dean</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-700 text-center">
          <p className="text-zinc-500">
            &copy; {year} Super Cool Betting Club. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            Inspired by WWE Attitude Era.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 