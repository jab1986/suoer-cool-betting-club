import React, { useState } from 'react';
import { Trophy, Target, Activity, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import styled from 'styled-components';
import { WWEContainer, WWECard, Grid, FlexRow } from '../styles/components';

const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.yellow};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  
  p {
    color: #d4d4d8;
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StatCard = styled(WWECard)`
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    color: ${props => props.theme.colors.gold};
    margin-bottom: 1rem;
  }
  
  h3 {
    color: ${props => props.theme.colors.yellow};
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: #d4d4d8;
    margin-bottom: 1.5rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
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

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? props.theme.colors.red : '#27272a'};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? '#cc0000' : '#3f3f46'};
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.yellow};
  margin: 1rem 0;
`;

// Player data
const playerData = {
  'Gaz': {
    points: 15,
    winRate: 75,
    wins: 15,
    totalBets: 20,
    streak: { type: 'W', count: 3 },
    form: 1.5
  },
  'Joe': {
    points: 12,
    winRate: 67,
    wins: 12,
    totalBets: 18,
    streak: { type: 'W', count: 2 },
    form: 1.2
  },
  'Sean': {
    points: 10,
    winRate: 63,
    wins: 10,
    totalBets: 16,
    streak: { type: 'L', count: 1 },
    form: 1.0
  },
  'Dean': {
    points: 8,
    winRate: 53,
    wins: 8,
    totalBets: 15,
    streak: { type: 'L', count: 2 },
    form: 0.8
  }
};

const Stats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('Gaz');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const playerStats = playerData[selectedPlayer];
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'betTypes', label: 'Bet Types', icon: PieChart },
    { id: 'weekly', label: 'Weekly Performance', icon: Activity }
  ];

  return (
    <WWEContainer>
      <StatsHeader>
        <h1>STATS CENTER</h1>
        <p>
          Dive deep into player statistics, analyze performance trends, and track betting history
          in the Super Cool Betting Club's interactive statistics hub.
        </p>
      </StatsHeader>
      
      {/* Player Selection */}
      <TabContainer>
        {Object.keys(playerData).map(playerName => (
          <Tab
            key={playerName}
            active={selectedPlayer === playerName}
            onClick={() => setSelectedPlayer(playerName)}
          >
            {playerName.toUpperCase()}
          </Tab>
        ))}
      </TabContainer>
      
      {/* Tab Selection */}
      <TabContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={selectedTab === tab.id}
            onClick={() => setSelectedTab(tab.id)}
          >
            <FlexRow style={{ gap: '0.5rem' }}>
              <tab.icon size={16} />
              {tab.label.toUpperCase()}
            </FlexRow>
          </Tab>
        ))}
      </TabContainer>
      
      {/* Stats Content */}
      {selectedTab === 'overview' && (
        <Grid columns={1} tabletColumns={2} gap="1.5rem">
          <StatCard>
            <Trophy size={36} />
            <h3>TOTAL POINTS</h3>
            <StatValue>{playerStats.points}</StatValue>
            <p>Current season points</p>
          </StatCard>
          
          <StatCard>
            <Target size={36} />
            <h3>WIN RATE</h3>
            <StatValue>{playerStats.winRate}%</StatValue>
            <p>{playerStats.wins} wins out of {playerStats.totalBets} bets</p>
          </StatCard>
          
          <StatCard>
            <Activity size={36} />
            <h3>CURRENT STREAK</h3>
            <StatValue>
              {playerStats.streak.type}{playerStats.streak.count}
            </StatValue>
            <p>
              {playerStats.streak.type === 'W' ? 'Win' : 'Loss'} streak
            </p>
          </StatCard>
          
          <StatCard>
            <TrendingUp size={36} />
            <h3>FORM</h3>
            <StatValue>
              {playerStats.form >= 1.2 ? '↗️ RISING' : 
               playerStats.form <= 0.8 ? '↘️ FALLING' : 
               '➡️ STABLE'}
            </StatValue>
            <p>Average {playerStats.form.toFixed(1)} points per week</p>
          </StatCard>
        </Grid>
      )}
      
      {selectedTab === 'betTypes' && (
        <WWECard>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>BET TYPE PERFORMANCE</h3>
          <Grid columns={1} tabletColumns={2} gap="1.5rem">
            <div style={{ background: '#27272a', padding: '1rem', borderRadius: '4px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Full Time Result</h4>
              <div style={{ fontSize: '1.25rem', color: '#22c55e' }}>75%</div>
              <p>6 / 8 successful</p>
            </div>
            <div style={{ background: '#27272a', padding: '1rem', borderRadius: '4px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Both Teams To Score</h4>
              <div style={{ fontSize: '1.25rem', color: '#22c55e' }}>80%</div>
              <p>4 / 5 successful</p>
            </div>
            <div style={{ background: '#27272a', padding: '1rem', borderRadius: '4px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Over 2.5 Goals</h4>
              <div style={{ fontSize: '1.25rem', color: '#22c55e' }}>75%</div>
              <p>3 / 4 successful</p>
            </div>
            <div style={{ background: '#27272a', padding: '1rem', borderRadius: '4px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Handicap</h4>
              <div style={{ fontSize: '1.25rem', color: '#ffd700' }}>67%</div>
              <p>2 / 3 successful</p>
            </div>
          </Grid>
        </WWECard>
      )}
      
      {selectedTab === 'weekly' && (
        <WWECard>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>WEEKLY PERFORMANCE</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '1rem' }}>
            {[5, 4, 3, 2, 1].map(week => (
              <div key={week} style={{ background: '#27272a', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontSize: '0.875rem', color: '#a1a1aa' }}>Week {week}</div>
                <div style={{ fontSize: '1.25rem', color: '#ffd700', fontWeight: 'bold' }}>{Math.floor(Math.random() * 2) + 1}</div>
                <div style={{ fontSize: '0.875rem', color: '#a1a1aa' }}>{Math.floor(Math.random() * 40) + 60}%</div>
              </div>
            ))}
          </div>
        </WWECard>
      )}
    </WWEContainer>
  );
};

export default Stats; 