import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, TrendingUp, Users, Calendar } from 'lucide-react';
import LeagueTable from '../components/LeagueTable';
import StatsCard from '../components/StatsCard';
import UpcomingFixtures from '../components/UpcomingFixtures';
import CurrentWeekBets from '../components/CurrentWeekBets';

const Dashboard = () => {
  // Summary stats
  const stats = [
    { 
      title: 'Total Bets', 
      value: '78', 
      change: '+12%', 
      trend: 'up',
      icon: <BarChart className="w-12 h-12 text-primary" />
    },
    { 
      title: 'Total Wins', 
      value: '46', 
      change: '+8%', 
      trend: 'up',
      icon: <TrendingUp className="w-12 h-12 text-primary" />
    },
    { 
      title: 'Win Rate', 
      value: '59%', 
      change: '-2%', 
      trend: 'down',
      icon: <Users className="w-12 h-12 text-primary" />
    },
    { 
      title: 'Current Week', 
      value: '29', 
      change: '', 
      trend: 'neutral',
      icon: <Calendar className="w-12 h-12 text-primary" />
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl md:text-5xl font-title text-primary mb-4 md:mb-0">
          DASHBOARD
        </h1>
        <div className="flex space-x-4">
          <Link to="/fixtures" className="btn btn-primary">
            View Fixtures
          </Link>
          <Link to="/stats" className="btn btn-secondary">
            Player Stats
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* League Table - Takes 1/3 of the screen on large displays */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h2 className="text-2xl font-title text-primary mb-4">LEAGUE TABLE</h2>
            <LeagueTable />
            <div className="mt-4 text-right">
              <Link to="/leaderboard" className="text-secondary font-bold hover:underline">
                Full Leaderboard &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Takes 2/3 of the screen on large displays */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Week's Bets */}
          <div className="card">
            <h2 className="text-2xl font-title text-primary mb-4">THIS WEEK'S BETS</h2>
            <CurrentWeekBets />
          </div>

          {/* Upcoming Fixtures */}
          <div className="card">
            <h2 className="text-2xl font-title text-primary mb-4">UPCOMING FIXTURES</h2>
            <UpcomingFixtures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 