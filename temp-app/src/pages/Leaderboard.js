import React from 'react';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWECard, 
  WWETable,
  WWEButton,
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
      props.trend === 'UP' 
        ? props.theme.colors.green500 
        : props.theme.colors.red500
    };
  }
`;

const PlayerRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.zinc800};
  }
`;

const ViewProfileButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.red};
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #cc0000;
    transform: scale(1.05);
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
  const { players, loading } = useBetting();
  
  if (loading) {
    return <WWEContainer>Loading...</WWEContainer>;
  }
  
  // Convert players object to array
  const playersArray = Object.entries(players).map(([name, data]) => ({
    name,
    ...data
  }));
  
  // Sort players by points (descending)
  const sortedPlayers = [...playersArray].sort((a, b) => b.points - a.points);
  
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
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <PlayerRow key={player.name}>
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
                  <td>
                    <PlayerName>{player.name}</PlayerName>
                  </td>
                  <td>
                    <PlayerPoints>{player.points}</PlayerPoints>
                  </td>
                  <td>{player.wins || 0}</td>
                  <td>{player.totalBets || 0}</td>
                  <td>{player.winRate || '0.0%'}</td>
                  <td>
                    {player.streak ? (
                      <StreakLabel streak={player.streak.type + player.streak.count}>
                        {player.streak.type}{player.streak.count}
                      </StreakLabel>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {player.last5 && player.last5.map((result, i) => (
                        <ResultDot key={i} win={result} />
                      ))}
                      {(!player.last5 || player.last5.length === 0) && '-'}
                    </div>
                  </td>
                  <td>
                    <TrendCell trend={player.trend}>
                      {player.trend === 'UP' ? (
                        <TrendingUp size={18} />
                      ) : player.trend === 'DOWN' ? (
                        <TrendingDown size={18} />
                      ) : (
                        '-'
                      )}
                    </TrendCell>
                  </td>
                  <td>
                    <ViewProfileButton to={`/player/${player.name}`}>
                      <User size={14} />
                      View
                    </ViewProfileButton>
                  </td>
                </PlayerRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </WWECard>

      {/* Additional information cards */}
      <Grid columns={1} tabletColumns={2} gap="1.5rem" style={{ marginTop: '2rem' }}>
        <StatsCard>
          <Star size={36} />
          <h2>Season Stats</h2>
          <p>Detailed statistics will be available once more weeks are completed.</p>
        </StatsCard>
        
        <StatsCard>
          <TrendingUp size={36} />
          <h2>Performance Trends</h2>
          <p>Player trends and performance analytics will be available as the season progresses.</p>
        </StatsCard>
      </Grid>
    </WWEContainer>
  );
};

export default Leaderboard; 