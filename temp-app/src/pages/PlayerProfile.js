import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle, 
  XCircle,
  ChevronLeft, 
  Percent,
  Target,
  History
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { WWEContainer, WWECard } from '../styles/components';

// Styled components
const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.zinc800};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: ${props => props.theme.colors.zinc700};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 4px solid ${props => props.theme.colors.red};
  background: ${props => props.theme.colors.zinc800};
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.gold};
`;

const PlayerBio = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #d4d4d8;
`;

const StatsSummary = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.zinc800};
  padding: 1rem;
  border-radius: 8px;
  min-width: 100px;
  
  @media (max-width: 768px) {
    min-width: 80px;
  }
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.gold};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #a1a1aa;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.gold};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled(WWECard)`
  padding: 1.5rem;
  height: 400px;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.yellow};
`;

const StreakContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StreakBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  background: ${props => props.type === 'W' 
    ? props.theme.colors.green500 
    : props.theme.colors.red500};
  color: white;
`;

const ResultsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ResultDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.result 
    ? props.theme.colors.green500 
    : props.theme.colors.red500};
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => 
    props.direction === 'UP' ? props.theme.colors.green500 : 
    props.direction === 'DOWN' ? props.theme.colors.red500 : 
    '#a1a1aa'
  };
  font-weight: ${props => props.direction !== 'STABLE' ? 'bold' : 'normal'};
`;

const RecentBetsContainer = styled(WWECard)`
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const BetsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const BetCard = styled.div`
  background: ${props => props.theme.colors.zinc900};
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid ${props => 
    props.result === true ? props.theme.colors.green500 : 
    props.result === false ? props.theme.colors.red500 : 
    props.theme.colors.yellow};
`;

const BetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const BetWeek = styled.span`
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${props => props.theme.colors.zinc700};
  color: white;
`;

const BetResult = styled.span`
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${props => 
    props.result === true ? props.theme.colors.green500 : 
    props.result === false ? props.theme.colors.red500 : 
    props.theme.colors.yellow};
  color: white;
`;

const FixtureText = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const BetDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #a1a1aa;
`;

const BetHistoryCard = styled(WWECard)`
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const BetHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BetHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${props => props.theme.colors.zinc900};
  border-radius: 6px;
  border-left: 4px solid ${props => 
    props.result === true ? props.theme.colors.green500 : 
    props.result === false ? props.theme.colors.red500 : 
    props.theme.colors.yellow};
`;

const BetHistoryWeek = styled.span`
  font-size: 0.85rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: ${props => props.theme.colors.zinc700};
  color: white;
  margin-right: 0.5rem;
`;

const HistoryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const BetTypeBadge = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  background: ${props => props.theme.colors.red};
  color: white;
  margin-left: 0.5rem;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PlayerProfile = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const { getPlayerStatistics, getFixtureById, betTypes, loading } = useBetting();
  const [player, setPlayer] = useState(null);
  const [recentBets, setRecentBets] = useState([]);
  const [historicalBets, setHistoricalBets] = useState([]);
  
  useEffect(() => {
    if (!loading) {
      const playerData = getPlayerStatistics(playerId);
      
      if (!playerData) {
        navigate('/');
        return;
      }
      
      setPlayer(playerData);
      
      // Get recent bets with fixture details
      const pendingBets = playerData.pendingBets || [];
      
      const enrichedPendingBets = pendingBets.map(bet => {
        const fixture = getFixtureById(bet.fixtureId);
        return {
          ...bet,
          fixture
        };
      });
      
      setRecentBets(enrichedPendingBets);
      
      // Get historical bets (completed ones)
      const allBets = [];
      Object.entries(playerData.betsByWeek || {}).forEach(([weekNum, weekData]) => {
        const weekBets = Array(weekData.total).fill({}).map((_, i) => {
          // This is a placeholder. In a real implementation, we would fetch actual historical bets
          return {
            id: `HIST-${weekNum}-${i}`,
            week: parseInt(weekNum),
            fixture: {
              homeTeam: 'Team A',
              awayTeam: 'Team B'
            },
            type: Object.keys(betTypes)[Math.floor(Math.random() * Object.keys(betTypes).length)],
            prediction: Math.random() > 0.5 ? 'HOME' : 'AWAY',
            result: Math.random() > 0.5
          };
        });
        allBets.push(...weekBets);
      });
      
      setHistoricalBets(allBets.slice(-5)); // Just show last 5 for brevity
    }
  }, [playerId, getPlayerStatistics, getFixtureById, loading, navigate, betTypes]);
  
  if (loading || !player) {
    return <WWEContainer>Loading...</WWEContainer>;
  }
  
  // Prepare chart data
  const weeklyPerformanceData = Object.entries(player.betsByWeek || {}).map(([week, data]) => ({
    week: `W${week}`,
    points: data.points,
    picks: data.total
  }));
  
  const betTypeData = Object.entries(player.betsByType || {}).map(([type, data]) => ({
    name: betTypes[type],
    value: parseInt(data.total),
    winRate: parseFloat(data.winRate)
  }));
  
  return (
    <WWEContainer>
      <BackButton onClick={() => navigate('/leaderboard')}>
        <ChevronLeft size={18} />
        Back to Leaderboard
      </BackButton>
      
      <ProfileHeader>
        <Avatar src={player.avatar} alt={player.name} />
        
        <PlayerInfo>
          <PlayerName>{player.name}</PlayerName>
          <PlayerBio>{player.bio}</PlayerBio>
          
          <StatsSummary>
            <StatItem>
              <StatValue>{player.points}</StatValue>
              <StatLabel>Points</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{player.wins}</StatValue>
              <StatLabel>Wins</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{player.totalBets}</StatValue>
              <StatLabel>Total Bets</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{player.winRate}%</StatValue>
              <StatLabel>Win Rate</StatLabel>
            </StatItem>
            
            <StatItem>
              <StreakContainer>
                <StreakBadge type={player.streak?.type || 'W'}>
                  {player.streak?.count || 0} {player.streak?.type || 'W'}
                </StreakBadge>
              </StreakContainer>
              <StatLabel>Current Streak</StatLabel>
            </StatItem>
            
            <StatItem>
              <TrendIndicator direction={player.trend}>
                {player.trend === 'UP' && <TrendingUp size={18} />}
                {player.trend === 'DOWN' && <TrendingUp size={18} style={{ transform: 'rotate(180deg)' }} />}
                {player.trend}
              </TrendIndicator>
              <StatLabel>Trend</StatLabel>
            </StatItem>
          </StatsSummary>
        </PlayerInfo>
      </ProfileHeader>
      
      <ChartsGrid>
        <ChartContainer>
          <ChartTitle>Weekly Performance</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={weeklyPerformanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 15
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                tick={{ fill: '#d4d4d8' }}
              />
              <YAxis tick={{ fill: '#d4d4d8' }} />
              <Tooltip contentStyle={{ backgroundColor: '#27272a', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="points" stroke="#ffd700" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="picks" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <ChartContainer>
          <ChartTitle>Bet Type Distribution</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={betTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {betTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Total Bets']} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartsGrid>
      
      {recentBets.length > 0 && (
        <RecentBetsContainer>
          <SectionTitle>
            <Calendar size={24} />
            Current Week Bets
          </SectionTitle>
          
          <BetsList>
            {recentBets.map((bet) => (
              <BetCard key={bet.id} result={bet.result}>
                <BetHeader>
                  <BetWeek>Week {bet.week}</BetWeek>
                  <BetResult result={bet.result}>
                    {bet.result === null ? 'Pending' : bet.result ? 'Correct' : 'Incorrect'}
                  </BetResult>
                </BetHeader>
                <FixtureText>{bet.fixture?.homeTeam} vs {bet.fixture?.awayTeam}</FixtureText>
                <BetDetails>
                  <div>{betTypes[bet.type]}</div>
                  <div>{bet.prediction}</div>
                </BetDetails>
              </BetCard>
            ))}
          </BetsList>
        </RecentBetsContainer>
      )}
      
      <BetHistoryCard>
        <SectionTitle>
          <History size={24} />
          Betting History
        </SectionTitle>
        
        <BetHistoryList>
          {historicalBets.map((bet) => (
            <BetHistoryItem key={bet.id} result={bet.result}>
              <HistoryDetails>
                <div>
                  <BetHistoryWeek>W{bet.week}</BetHistoryWeek>
                  {bet.fixture.homeTeam} vs {bet.fixture.awayTeam}
                </div>
                <div style={{ color: '#a1a1aa' }}>
                  {betTypes[bet.type]} • {bet.prediction}
                  <BetTypeBadge>{bet.result ? 'Win' : 'Loss'}</BetTypeBadge>
                </div>
              </HistoryDetails>
              {bet.result ? (
                <CheckCircle size={20} color="#22c55e" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )}
            </BetHistoryItem>
          ))}
        </BetHistoryList>
      </BetHistoryCard>
      
      <ChartContainer>
        <ChartTitle>Bet Type Success Rates</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={betTypeData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#d4d4d8' }} />
            <YAxis label={{ value: 'Win Rate %', angle: -90, position: 'insideLeft', fill: '#d4d4d8' }} tick={{ fill: '#d4d4d8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#27272a', border: 'none' }} />
            <Bar dataKey="winRate" fill="#ff0000" name="Win Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </WWEContainer>
  );
};

export default PlayerProfile; 