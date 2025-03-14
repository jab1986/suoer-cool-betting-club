import React from 'react';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import styled from 'styled-components';
import { WWEContainer } from '../styles/components';

const FooterContainer = styled.footer`
  background: linear-gradient(to right, ${props => props.theme.colors.black}, ${props => props.theme.colors.zinc900});
  border-top: 4px solid ${props => props.theme.colors.gold};
`;

const FooterSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.yellow};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.impact};
  
  span {
    color: white;
  }
`;

const FooterSubtitle = styled.h4`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.impact};
`;

const FooterText = styled.p`
  color: #a1a1aa;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const FeaturesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  
  span {
    color: #d4d4d8;
    
    &:hover {
      color: white;
    }
  }
  
  svg {
    color: ${props => props.theme.colors.red};
    margin-right: 0.5rem;
  }
`;

const PlayersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PlayerItem = styled.li`
  color: #d4d4d8;
  
  &:hover {
    color: white;
  }
`;

const FooterDivider = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #3f3f46;
  text-align: center;
`;

const Copyright = styled.p`
  color: #71717a;
`;

const FooterNote = styled.p`
  font-size: 0.75rem;
  color: #52525b;
  margin-top: 0.25rem;
`;

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <WWEContainer style={{ padding: '2rem 1rem' }}>
        <FooterSection>
          {/* Logo and Info */}
          <div>
            <FooterTitle>
              Super Cool <span>Betting</span> Club
            </FooterTitle>
            <FooterText>
              The ultimate platform for tracking bets with your friends in true WWE Attitude Era style!
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://twitter.com" aria-label="Twitter">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </SocialLink>
              <SocialLink href="https://github.com" aria-label="GitHub">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </SocialLink>
            </SocialLinks>
          </div>

          {/* Quick Links */}
          <div>
            <FooterSubtitle>
              Features
            </FooterSubtitle>
            <FeaturesList>
              <FeatureItem>
                <Trophy className="w-5 h-5" />
                <span>Leaderboard</span>
              </FeatureItem>
              <FeatureItem>
                <Users className="w-5 h-5" />
                <span>Player Profiles</span>
              </FeatureItem>
              <FeatureItem>
                <Calendar className="w-5 h-5" />
                <span>Fixture Management</span>
              </FeatureItem>
              <FeatureItem>
                <TrendingUp className="w-5 h-5" />
                <span>Stats & Analysis</span>
              </FeatureItem>
            </FeaturesList>
          </div>

          {/* Players */}
          <div>
            <FooterSubtitle>
              Players
            </FooterSubtitle>
            <PlayersList>
              <PlayerItem>Gaz</PlayerItem>
              <PlayerItem>Joe</PlayerItem>
              <PlayerItem>Sean</PlayerItem>
              <PlayerItem>Dean</PlayerItem>
            </PlayersList>
          </div>
        </FooterSection>

        <FooterDivider>
          <Copyright>
            &copy; {year} Super Cool Betting Club. All rights reserved.
          </Copyright>
          <FooterNote>
            Inspired by WWE Attitude Era.
          </FooterNote>
        </FooterDivider>
      </WWEContainer>
    </FooterContainer>
  );
};

export default Footer; 