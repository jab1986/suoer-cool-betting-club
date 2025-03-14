import React from 'react';
import { Trophy, Medal, Star, TrendingUp, TrendingDown } from 'lucide-react';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWECard, 
  WWETable,
  Grid
} from '../styles/components';

// Styled Components
const LeaderboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 1rem;
  }
  
  p {
    color: #a1a1aa;
    font-size: 1.125rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 2rem;
  
  /* Scrollbar styling for Webkit browsers */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #27272a;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.red};
    border-radius: 3px;
  }
`;

const StyledTable = styled(WWETable)`
  min-width: 800px;
  
  td {
    padding: 1rem 0.75rem;
  }
  
  tbody tr {
    transition: background-color 0.2s;
    
    &:hover {
      background-color: ${props => props.theme.colors.zinc800};
    }
  }
`;

const PlayerName = styled.div`
  font-family: ${props => props.theme.fonts.impact};
  font-size: 1.25rem;
  color: white;
`;

const PlayerPoints = styled.div`
  font-weight: bold;
  font-size: 1.125rem;
  color: ${props => props.theme.colors.yellow};
`;

const RankCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${props => props.color || props.theme.colors.zinc700};
  }
`;

const StreakLabel = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.875rem;
  
  background-color: ${props => 
    props.streak.startsWith('W') 
      ? 'rgba(34, 197, 94, 0.2)' 
      : 'rgba(239, 68, 68, 0.2)'
  };
  
  color: ${props => 
    props.streak.startsWith('W') 
      ? props.theme.colors.green500 
      : props.theme.colors.red500
  };
`;

const ResultDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  margin: 0 2px;
  
  background-color: ${props => 
    props.win ? props.theme.colors.green500 : props.theme.colors.red500
  };
`;

const TrendCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${props => 
      props.trend === 'up' 
        ? props.theme.colors.green500 
        : props.theme.colors.red500
    };
  }
`;

const StatsCard = styled(WWECard)`
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  svg {
    color: ${props => props.theme.colors.gold};
    margin-bottom: 1rem;
  }
  
  h2 {
    margin-bottom: 0.75rem;
  }
  
  p {
    color: #a1a1aa;
  }
`;

const Leaderboard = () => {
  const { players, bets } = useBetting();
  
  // Sort players by points (descending)
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  
  // Create enhanced player data for display
  const playerStats = sortedPlayers.map(player => {
    const playerBets = bets.filter(bet => bet.playerId === player.id);
    const totalBets = playerBets.length;
    const winCount = playerBets.filter(bet => bet.isCorrect === true).length;
    const winRate = totalBets > 0 ? ((winCount / totalBets) * 100).toFixed(1) : '0.0';
    
    // Calculate streak
    let currentStreak = 0;
    let streakType = null;
    
    // Get player's bets in reverse chronological order
    const chronoBets = [...playerBets]
      .filter(bet => bet.isCorrect !== null)
      .sort((a, b) => b.id - a.id);
    
    if (chronoBets.length > 0) {
      streakType = chronoBets[0].isCorrect ? 'W' : 'L';
      
      for (let bet of chronoBets) {
        if ((streakType === 'W' && bet.isCorrect) || 
            (streakType === 'L' && !bet.isCorrect)) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
    
    const streak = currentStreak > 0 ? `${streakType}${currentStreak}` : '-';
    
    // Get last 5 results
    const lastFiveResults = chronoBets.slice(0, 5).map(bet => bet.isCorrect);
    
    // Determine trend
    const trend = currentStreak >= 2 
      ? (streakType === 'W' ? 'up' : 'down') 
      : (player.points > 0 ? 'up' : 'neutral');
    
    return {
      ...player,
      winRate: `${winRate}%`,
      wins: winCount,
      total: totalBets,
      streak,
      lastFive: lastFiveResults,
      trend
    };
  });

  return (
    <WWEContainer>
      <LeaderboardHeader>
        <h1>Leaderboard</h1>
        <p>
          Season standings for the 4 players in the Super Cool Betting Club
        </p>
      </LeaderboardHeader>

      {/* Main leaderboard */}
      <WWECard>
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th style={{ width: '64px' }}>Rank</th>
                <th>Player</th>
                <th>Points</th>
                <th>Wins</th>
                <th>Total Bets</th>
                <th>Win Rate</th>
                <th>Streak</th>
                <th>Last 5</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {playerStats.map((player, index) => (
                <tr key={player.id}>
                  <td>
                    <RankCell 
                      color={
                        index === 0 ? '#ffd700' : // gold
                        index === 1 ? '#c0c0c0' : // silver
                        index === 2 ? '#cd7f32' : // bronze
                        undefined
                      }
                    >
                      {index === 0 ? (
                        <Trophy size={24} />
                      ) : index === 1 ? (
                        <Medal size={24} />
                      ) : index === 2 ? (
                        <Medal size={24} />
                      ) : (
                        <span className="text-lg font-bold text-zinc-500">{index + 1}</span>
                      )}
                    </RankCell>
                  </td>
                  <td><PlayerName>{player.name}</PlayerName></td>
                  <td><PlayerPoints>{player.points}</PlayerPoints></td>
                  <td>{player.wins}</td>
                  <td>{player.total}</td>
                  <td>{player.winRate}</td>
                  <td>
                    {player.streak !== '-' && (
                      <StreakLabel streak={player.streak}>{player.streak}</StreakLabel>
                    )}
                    {player.streak === '-' && '-'}
                  </td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      {player.lastFive.map((win, i) => (
                        <ResultDot key={i} win={win} />
                      ))}
                      {player.lastFive.length === 0 && '-'}
                    </div>
                  </td>
                  <td>
                    <TrendCell trend={player.trend}>
                      {player.trend === 'up' ? (
                        <TrendingUp size={20} />
                      ) : player.trend === 'down' ? (
                        <TrendingDown size={20} />
                      ) : (
                        <span>-</span>
                      )}
                    </TrendCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </WWECard>

      {/* Coming soon: more detailed stats */}
      <Grid columns={1} tabletColumns={2} gap="2rem">
        <StatsCard>
          <Star size={48} />
          <h2>Season Stats</h2>
          <p>
            Detailed player statistics coming soon!
          </p>
        </StatsCard>
        <StatsCard>
          <TrendingUp size={48} />
          <h2>Performance Trends</h2>
          <p>
            Detailed trend analysis coming soon!
          </p>
        </StatsCard>
      </Grid>
    </WWEContainer>
  );
};

export default Leaderboard; 