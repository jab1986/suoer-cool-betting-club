import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ChevronRight, BarChart2 } from 'lucide-react';
import { useBetting } from '../context/BettingContext';
import { Layout } from '../components/layout';

const Home = () => {
  const { week } = useBetting();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SUPER COOL BETTING CLUB</h1>
          <p className="max-w-3xl mx-auto text-xl text-zinc-300 mb-8">
            The ultimate platform for tracking bets with your friends!
            Track your predictions, compete against friends, and claim your spot as the champion.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/leaderboard">
              <button className="bg-wwe-red hover:bg-wwe-red/80 text-white font-bold py-3 px-6 rounded-md flex items-center transition-colors">
                <Trophy size={20} className="mr-2" />
                View Leaderboard
              </button>
            </Link>
            
            <Link to="/stats">
              <button className="bg-wwe-red hover:bg-wwe-red/80 text-white font-bold py-3 px-6 rounded-md flex items-center transition-colors">
                <BarChart2 size={20} className="mr-2" />
                View Stats
              </button>
            </Link>
            
            <Link to="/fixtures">
              <button className="bg-wwe-red hover:bg-wwe-red/80 text-white font-bold py-3 px-6 rounded-md flex items-center transition-colors">
                <Calendar size={20} className="mr-2" />
                Week {week} Fixtures
              </button>
            </Link>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="bg-zinc-800 rounded-lg shadow-lg flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
            <Trophy size={48} className="text-wwe-gold mb-6" />
            <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">LEADERBOARD</h3>
            <p className="text-zinc-300 mb-6">Track player standings, points, and see who's leading the pack this season.</p>
            <Link to="/leaderboard" className="text-wwe-red flex items-center">
              <span>View Standings</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-zinc-800 rounded-lg shadow-lg flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
            <BarChart2 size={48} className="text-wwe-gold mb-6" />
            <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">STATS CENTER</h3>
            <p className="text-zinc-300 mb-6">Dive deep into detailed statistics, trends, and performance analytics.</p>
            <Link to="/stats" className="text-wwe-red flex items-center">
              <span>View Stats</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-zinc-800 rounded-lg shadow-lg flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
            <Calendar size={48} className="text-wwe-gold mb-6" />
            <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">FIXTURES</h3>
            <p className="text-zinc-300 mb-6">View upcoming matches, place your bets, and track results as they happen.</p>
            <Link to="/fixtures" className="text-wwe-red flex items-center">
              <span>View Fixtures</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-zinc-800 rounded-lg shadow-lg flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
            <Users size={48} className="text-wwe-gold mb-6" />
            <h3 className="text-2xl text-wwe-yellow mb-4 font-bold">PROFILES</h3>
            <p className="text-zinc-300 mb-6">Check detailed player stats, bet history, and performance analytics.</p>
            <Link to="/profile" className="text-wwe-red flex items-center">
              <span>View Profiles</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center py-12 px-8 bg-gradient-to-r from-red-900/20 via-black/30 to-red-900/20 relative">
          {/* Custom skewed shape using pseudo-elements */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">READY TO PLACE YOUR BETS?</h2>
            <p className="max-w-2xl mx-auto text-zinc-300 mb-8">
              Week {week} fixtures are now available. Make your predictions before the deadline and compete for the top spot on the leaderboard!
            </p>
            <Link to="/fixtures">
              <button className="bg-wwe-red hover:bg-wwe-red/80 text-white font-bold py-3 px-6 rounded-md transition-colors">
                Place Your Bets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
