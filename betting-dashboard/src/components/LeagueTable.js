import React from 'react';
import { Trophy } from 'lucide-react';

const LeagueTable = () => {
  // Mock data - would come from API in production
  const players = [
    { id: 1, name: 'Sean', points: 34, position: 1 },
    { id: 2, name: 'Gaz', points: 32, position: 2 },
    { id: 3, name: 'Joe', points: 31, position: 3 },
    { id: 4, name: 'Dean', points: 17, position: 4 }
  ];

  // Get position icon/styling
  const getPositionDisplay = (position) => {
    switch (position) {
      case 1:
        return (
          <div className="flex items-center">
            <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-bold text-yellow-500">1st</span>
          </div>
        );
      case 2:
        return <span className="font-bold text-gray-300">2nd</span>;
      case 3:
        return <span className="font-bold text-amber-700">3rd</span>;
      default:
        return <span className="text-metal-gray">{position}th</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="table-header">
            <th className="px-4 py-2 text-left">Pos</th>
            <th className="px-4 py-2 text-left">Player</th>
            <th className="px-4 py-2 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr 
              key={player.id}
              className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}
            >
              <td className="px-4 py-3">
                {getPositionDisplay(player.position)}
              </td>
              <td className="px-4 py-3 font-bold">{player.name}</td>
              <td className="px-4 py-3 text-right font-bold text-lg">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable; 