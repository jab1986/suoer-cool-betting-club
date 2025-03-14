import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWEButton, 
  WWECard, 
  SectionTitle,
  Grid,
  FlexRow
} from '../styles/components';

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    margin-bottom: 1rem;
    font-size: 3.5rem;
    
    @media (min-width: 768px) {
      font-size: 4.5rem;
    }
  }
  
  p {
    max-width: 800px;
    margin: 0 auto 2rem auto;
    font-size: 1.25rem;
    color: #d4d4d8;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const FeatureCard = styled(WWECard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    color: ${props => props.theme.colors.gold};
    margin-bottom: 1.5rem;
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

const PlayersList = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PlayerCard = styled.div`
  background: linear-gradient(to bottom, ${props => props.color || '#3b82f6'}, rgba(0,0,0,0.7));
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid ${props => props.color || '#3b82f6'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: white;
  }
  
  p {
    color: #d4d4d8;
    font-size: 0.875rem;
  }
  
  .points {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.gold};
    font-weight: bold;
    margin-top: 0.5rem;
  }
`;

const CTASection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 3rem;
  background: linear-gradient(to right, rgba(255,0,0,0.1), rgba(0,0,0,0.3), rgba(255,0,0,0.1));
  clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
  
  h2 {
    margin-bottom: 1.5rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    color: #d4d4d8;
  }
`;

const Home = () => {
  const { players, currentWeek } = useBetting();
  
  // Sort players by points
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  
  // Player colors
  const playerColors = {
    'Sean': '#3b82f6', // blue
    'Gaz': '#22c55e',  // green
    'Joe': '#eab308',  // yellow
    'Dean': '#a855f7'  // purple
  };
  
  return (
    <WWEContainer>
      <HeroSection>
        <h1>SUPER COOL BETTING CLUB</h1>
        <p>
          The ultimate platform for tracking bets with your friends in true WWE Attitude Era style!
          Track your predictions, compete against friends, and claim your spot as the champion.
        </p>
        
        <ButtonsContainer>
          <Link to="/leaderboard">
            <WWEButton>
              <Trophy size={20} style={{ marginRight: '0.5rem' }} />
              View Leaderboard
            </WWEButton>
          </Link>
          
          <Link to="/fixtures">
            <WWEButton>
              <Calendar size={20} style={{ marginRight: '0.5rem' }} />
              Week {currentWeek} Fixtures
            </WWEButton>
          </Link>
        </ButtonsContainer>
      </HeroSection>
      
      <SectionTitle>CURRENT STANDINGS</SectionTitle>
      
      <PlayersList>
        {sortedPlayers.map(player => (
          <PlayerCard key={player.id} color={playerColors[player.name]}>
            <h3>{player.name}</h3>
            <p>Picks this week: {player.picksThisWeek}</p>
            <div className="points">{player.points} PTS</div>
          </PlayerCard>
        ))}
      </PlayersList>
      
      <Grid columns={1} tabletColumns={3} gap="2rem" style={{ marginTop: '4rem' }}>
        <FeatureCard>
          <Trophy size={48} />
          <h3>LEADERBOARD</h3>
          <p>Track player standings, points, and see who's leading the pack this season.</p>
          <Link to="/leaderboard">
            <FlexRow style={{ color: '#ff0000' }}>
              <span>View Standings</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </FlexRow>
          </Link>
        </FeatureCard>
        
        <FeatureCard>
          <Calendar size={48} />
          <h3>FIXTURES</h3>
          <p>View upcoming matches, place your bets, and track results as they happen.</p>
          <Link to="/fixtures">
            <FlexRow style={{ color: '#ff0000' }}>
              <span>View Fixtures</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </FlexRow>
          </Link>
        </FeatureCard>
        
        <FeatureCard>
          <Users size={48} />
          <h3>PROFILES</h3>
          <p>Check detailed player stats, bet history, and performance analytics.</p>
          <Link to="/profile">
            <FlexRow style={{ color: '#ff0000' }}>
              <span>View Profiles</span>
              <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
            </FlexRow>
          </Link>
        </FeatureCard>
      </Grid>
      
      <CTASection>
        <h2>READY TO PLACE YOUR BETS?</h2>
        <p>
          Week {currentWeek} fixtures are now available. Make your predictions before the deadline and compete for the top spot on the leaderboard!
        </p>
        <Link to="/fixtures">
          <WWEButton>
            Place Your Bets
          </WWEButton>
        </Link>
      </CTASection>
    </WWEContainer>
  );
};

export default Home; 