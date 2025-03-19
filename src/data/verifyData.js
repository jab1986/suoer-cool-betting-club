// Utility script to verify sample data

import { BET_TYPES, OUTCOMES, fixtures, players, bets, currentWeek } from './sampleData';

// Log the basic structure and counts
console.log('===== SAMPLE DATA VERIFICATION =====');
console.log(`Current Week: ${currentWeek}`);
console.log(`Players: ${Object.keys(players).length}`);
console.log(`Fixtures: ${Object.values(fixtures).flat().length}`);
console.log(`Bets: ${bets.length}`);

// Log player details
console.log('\n===== PLAYER DETAILS =====');
Object.entries(players).forEach(([name, data]) => {
  console.log(`\nPlayer: ${name}`);
  console.log(`Points: ${data.points}`);
  console.log(`Picks Per Week: ${data.picksPerWeek}`);
  console.log(`Win Rate: ${data.winRate}%`);
  console.log(`Streak: ${data.streak?.type}${data.streak?.count}`);
  console.log(`Trend: ${data.trend}`);
  
  if (data.betTypeSuccess) {
    console.log('\nBet Type Success:');
    Object.entries(data.betTypeSuccess).forEach(([type, stats]) => {
      console.log(`${BET_TYPES[type]}: ${stats.wins}/${stats.total} (${stats.winRate}%)`);
    });
  }
});

// Log some fixture details
console.log('\n===== FIXTURE EXAMPLES =====');
for (let week = 1; week <= 3; week++) {
  const weekFixtures = fixtures[week] || [];
  console.log(`\nWeek ${week} Fixtures: ${weekFixtures.length}`);
  
  if (weekFixtures.length > 0) {
    const example = weekFixtures[0];
    console.log(`Example: ${example.homeTeam} vs ${example.awayTeam}`);
    console.log(`Status: ${example.completed ? 'Completed' : 'Upcoming'}`);
    if (example.completed && example.result) {
      console.log(`Result: ${example.result.homeScore}-${example.result.awayScore}`);
    }
  }
}

// Export for potential use
export const verifyData = {
  BET_TYPES,
  OUTCOMES,
  fixtures,
  players,
  bets,
  currentWeek
};

export default verifyData;
