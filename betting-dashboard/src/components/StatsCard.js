import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, trend, icon }) => {
  return (
    <div className="card relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="z-10">
          <h3 className="text-lg font-title">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' && (
                <>
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm font-bold">{change}</span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500 text-sm font-bold">{change}</span>
                </>
              )}
              {trend === 'neutral' && (
                <span className="text-metal-gray text-sm font-bold">{change}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="z-10 opacity-80">
          {icon}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary opacity-10"></div>
    </div>
  );
};

export default StatsCard; 