import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  CheckCircle, 
  BarChart3,
  Target
} from 'lucide-react';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWECard, 
  WWEButton, 
  SectionTitle,
  FlexRow,
  Grid
} from '../styles/components';

// Dashboard styled components
const DashboardHeader = styled(FlexRow)`
  margin-bottom: 2rem;
  flex-direction: column;
  align-items: flex-start;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  h1 {
    margin-bottom: 1rem;
    
    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }
`;

const StatsGrid = styled(Grid)`
  margin-bottom: 2rem;
`;

const StatCard = styled(WWECard)`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  clip-path: polygon(0 0, 100% 0, 97% 100%, 3% 100%);
`;

const StatHeader = styled.p`
  color: #a1a1aa;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 2.5rem;
  font-family: ${props => props.theme.fonts.impact};
  color: white;
  margin: 0.5rem 0;
  letter-spacing: 0.05em;
`;

const StatTrend = styled.p`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: ${props => 
    props.trend === 'up' 
      ? props.theme.colors.green500 
      : props.trend === 'down' 
        ? props.theme.colors.red500 
        : '#a1a1aa'
  };
  letter-spacing: 0.02em;
`;

const IconContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.75rem;
  border-radius: 9999px;
  align-self: flex-end;
  margin-bottom: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.gold};
  }
`;

const ContentGrid = styled(Grid)`
  grid-template-columns: 1fr;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardHeader = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PlayerRow = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PlayerInfo = styled(FlexRow)``;

const PlayerRank = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: bold;
  margin-right: 0.75rem;
  
  background-color: ${props => {
    if (props.rank === 1) return props.theme.colors.gold;
    if (props.rank === 2) return props.theme.colors.silver;
    if (props.rank === 3) return '#cd7f32'; // Bronze
    return props.theme.colors.zinc700;
  }};
  
  color: ${props => {
    if (props.rank <= 2) return '#000000';
    return 'white';
  }};
`;

const PlayerName = styled.p`
  font-family: ${props => props.theme.fonts.impact};
  color: white;
`;

const PlayerPicks = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
`;

const PlayerPoints = styled.div`
  text-align: right;
`;

const PointsValue = styled.p`
  font-size: 1.25rem;
  font-family: ${props => props.theme.fonts.impact};
  color: ${props => props.theme.colors.yellow};
`;

const PointsLabel = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
`;

const BetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  /* Scrollbar styling for Webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #27272a;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.red};
    border-radius: 3px;
  }
`;

const BetItem = styled.div`
  border-bottom: 1px solid #3f3f46;
  padding-bottom: 0.75rem;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const BetHeader = styled(FlexRow)`
  justify-content: space-between;
  align-items: flex-start;
`;

const PlayerIndicator = styled.div`
  width: 0.25rem;
  height: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
  
  background-color: ${props => {
    if (props.player === 'Sean') return '#3b82f6'; // blue
    if (props.player === 'Gaz') return '#22c55e'; // green
    if (props.player === 'Joe') return '#eab308'; // yellow
    if (props.player === 'Dean') return '#a855f7'; // purple
    return props.theme.colors.zinc700;
  }};
`;

const BetDetails = styled.div``;

const BetFixture = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
`;

const BetPrediction = styled.p`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${props => props.theme.colors.yellow};
`;

const BetType = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
`;

const FixturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FixtureDate = styled.p`
  font-size: 0.75rem;
  color: #a1a1aa;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FixtureGroup = styled.div`
  border-bottom: 1px solid #3f3f46;
  padding-bottom: 0.75rem;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FixtureItem = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FixtureName = styled.p`
  color: white;
`;

const FixtureTime = styled.p`
  font-size: 0.875rem;
  color: #a1a1aa;
`;

const Dashboard = () => {
  const { 
    players, 
    fixtures, 
    bets, 
    currentWeek, 
    getPlayerById, 
    getFixtureById 
  } = useBetting();
  
  // Sort players by points (descending)
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  
  // Get current week's fixtures
  const currentWeekFixtures = fixtures.filter(fixture => fixture.week === currentWeek);
  
  // Get current week's bets
  const currentWeekBets = bets.filter(bet => bet.week === currentWeek);
  
  // Calculate stats
  const totalBets = bets.length;
  const totalWins = bets.filter(bet => bet.isCorrect === true).length;
  const winRate = totalBets > 0 ? ((totalWins / totalBets) * 100).toFixed(1) : '0.0';
  
  // Sample data for stats
  const stats = [
    { 
      title: 'Total Bets', 
      value: totalBets.toString(), 
      icon: <Target size={32} />,
      change: `${currentWeekBets.length} this week`,
      trend: 'neutral'
    },
    { 
      title: 'Total Wins', 
      value: totalWins.toString(), 
      icon: <CheckCircle size={32} />,
      change: 'From all weeks',
      trend: 'neutral'
    },
    { 
      title: 'Win Rate', 
      value: `${winRate}%`, 
      icon: <BarChart3 size={32} />,
      change: 'Overall performance',
      trend: totalWins > 0 ? 'up' : 'neutral'
    },
    { 
      title: 'Current Week', 
      value: currentWeek.toString(), 
      icon: <Calendar size={32} />,
      change: 'Picks due Friday',
      trend: 'neutral'
    },
  ];
  
  // Group fixtures by date
  const fixturesByDate = currentWeekFixtures.reduce((acc, fixture) => {
    if (!acc[fixture.date]) {
      acc[fixture.date] = [];
    }
    acc[fixture.date].push(fixture);
    return acc;
  }, {});
  
  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <WWEContainer>
      <DashboardHeader>
        <h1>Betting Dashboard</h1>
        <Link to="/fixtures">
          <WWEButton>
            <Calendar size={20} style={{ marginRight: '0.5rem' }} />
            <span>Week {currentWeek} Fixtures</span>
          </WWEButton>
        </Link>
      </DashboardHeader>

      {/* Stats Cards */}
      <StatsGrid columns={1} tabletColumns={2} mobileColumns={1} gap="1.5rem">
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <IconContainer>
              {stat.icon}
            </IconContainer>
            <div>
              <StatHeader>{stat.title}</StatHeader>
              <StatValue>{stat.value}</StatValue>
              <StatTrend trend={stat.trend}>{stat.change}</StatTrend>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid gap="2rem">
        {/* Leaderboard */}
        <WWECard>
          <CardHeader>
            <SectionTitle>Leaderboard</SectionTitle>
            <Link to="/leaderboard" style={{ color: '#ff0000', display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
              <span>Full Standings</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </CardHeader>
          <div>
            {sortedPlayers.map((player, index) => (
              <PlayerRow key={player.id}>
                <PlayerInfo>
                  <PlayerRank rank={index + 1}>{index + 1}</PlayerRank>
                  <div>
                    <PlayerName>{player.name}</PlayerName>
                    <PlayerPicks>Picks this week: {player.picksThisWeek}</PlayerPicks>
                  </div>
                </PlayerInfo>
                <PlayerPoints>
                  <PointsValue>{player.points}</PointsValue>
                  <PointsLabel>points</PointsLabel>
                </PlayerPoints>
              </PlayerRow>
            ))}
          </div>
        </WWECard>

        {/* Current Week's Bets */}
        <WWECard>
          <CardHeader>
            <SectionTitle>Week {currentWeek} Bets</SectionTitle>
            <Link to="/fixtures" style={{ color: '#ff0000', display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
              <span>All Bets</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </CardHeader>
          <BetList>
            {currentWeekBets.map((bet, index) => {
              const player = getPlayerById(bet.playerId);
              const fixture = getFixtureById(bet.fixtureId);
              
              return (
                <BetItem key={bet.id}>
                  <BetHeader>
                    <FlexRow>
                      <PlayerIndicator player={player.name} />
                      <BetDetails>
                        <PlayerName>{player.name}</PlayerName>
                        <BetFixture>{fixture.homeTeam} vs {fixture.awayTeam}</BetFixture>
                      </BetDetails>
                    </FlexRow>
                    <div style={{ textAlign: 'right' }}>
                      <BetPrediction>
                        {bet.betType === 'Full Time Result' 
                          ? bet.prediction === 'home' 
                            ? fixture.homeTeam + ' Win' 
                            : bet.prediction === 'away' 
                              ? fixture.awayTeam + ' Win' 
                              : 'Draw'
                          : bet.prediction === 'over' 
                            ? 'Over 2.5' 
                            : bet.prediction === 'under' 
                              ? 'Under 2.5' 
                              : bet.prediction === 'yes' 
                                ? 'BTTS' 
                                : bet.prediction === 'no' 
                                  ? 'No BTTS' 
                                  : bet.prediction}
                      </BetPrediction>
                      <BetType>{bet.betType}</BetType>
                    </div>
                  </BetHeader>
                </BetItem>
              );
            })}
          </BetList>
        </WWECard>

        {/* Upcoming Fixtures */}
        <WWECard>
          <CardHeader>
            <SectionTitle>Upcoming Fixtures</SectionTitle>
            <Link to="/fixtures" style={{ color: '#ff0000', display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
              <span>All Fixtures</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </CardHeader>
          <FixturesList>
            {Object.entries(fixturesByDate).map(([date, fixtures]) => (
              <FixtureGroup key={date}>
                <FixtureDate>{formatDate(date)}</FixtureDate>
                <div>
                  {fixtures.map(fixture => (
                    <FixtureItem key={fixture.id}>
                      <FixtureName>{fixture.homeTeam} vs {fixture.awayTeam}</FixtureName>
                      <FixtureTime>{fixture.time}</FixtureTime>
                    </FixtureItem>
                  ))}
                </div>
              </FixtureGroup>
            ))}
          </FixturesList>
        </WWECard>
      </ContentGrid>
    </WWEContainer>
  );
};

export default Dashboard; 