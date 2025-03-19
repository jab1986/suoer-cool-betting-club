import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ChevronRight, BarChart2 } from 'lucide-react';
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
  const { week } = useBetting();
  
  return (
    <WWEContainer>
      <HeroSection>
        <h1>SUPER COOL BETTING CLUB</h1>
        <p>
          The ultimate platform for tracking bets with your friends!
          Track your predictions, compete against friends, and claim your spot as the champion.
        </p>
        
        <ButtonsContainer>
          <Link to="/leaderboard">
            <WWEButton>
              <Trophy size={20} style={{ marginRight: '0.5rem' }} />
              View Leaderboard
            </WWEButton>
          </Link>
          
          <Link to="/stats">
            <WWEButton>
              <BarChart2 size={20} style={{ marginRight: '0.5rem' }} />
              View Stats
            </WWEButton>
          </Link>
          
          <Link to="/fixtures">
            <WWEButton>
              <Calendar size={20} style={{ marginRight: '0.5rem' }} />
              Week {week} Fixtures
            </WWEButton>
          </Link>
        </ButtonsContainer>
      </HeroSection>
      
      <Grid columns={1} tabletColumns={4} gap="2rem" style={{ marginTop: '4rem' }}>
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
          <BarChart2 size={48} />
          <h3>STATS CENTER</h3>
          <p>Dive deep into detailed statistics, trends, and performance analytics.</p>
          <Link to="/stats">
            <FlexRow style={{ color: '#ff0000' }}>
              <span>View Stats</span>
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
          Week {week} fixtures are now available. Make your predictions before the deadline and compete for the top spot on the leaderboard!
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