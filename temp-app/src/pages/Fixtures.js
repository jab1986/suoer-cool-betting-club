import React, { useState } from 'react';
import { Calendar, Clock, Football } from 'lucide-react';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWECard,
  WWEButton, 
  Grid,
  WWETable,
  FlexRow
} from '../styles/components';

const PageHeader = styled.div`
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

const FixtureCard = styled(WWECard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  
  .fixture-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.gold};
  }
  
  .teams {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 1rem 0;
  }
  
  .team {
    text-align: center;
    width: 45%;
    
    .name {
      font-weight: bold;
      color: white;
      font-size: 1.25rem;
    }
  }
  
  .vs {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.red};
    margin: 0 0.5rem;
  }
  
  .fixture-details {
    margin-top: 1rem;
    text-align: center;
    color: #a1a1aa;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .detail {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`;

const Fixtures = () => {
  const { fixtures, week } = useBetting();
  const [selectedWeek, setSelectedWeek] = useState(week);
  
  // Filter fixtures based on selected week
  const weekFixtures = Object.values(fixtures).filter(fixture => 
    fixture.week === selectedWeek
  );
  
  return (
    <WWEContainer>
      <PageHeader>
        <h1>FIXTURES</h1>
        <p>
          View all upcoming matches and results from previous weeks.
          Check the schedule and plan your bets.
        </p>
      </PageHeader>
      
      {/* Week Selection */}
      <TabContainer>
        {Array.from({ length: week + 3 }, (_, i) => (
          <Tab
            key={i + 1}
            active={selectedWeek === i + 1}
            onClick={() => setSelectedWeek(i + 1)}
          >
            WEEK {i + 1}
          </Tab>
        ))}
      </TabContainer>
      
      {/* Fixtures Grid */}
      <Grid columns={1} tabletColumns={2} desktopColumns={3} gap="1.5rem">
        {weekFixtures.length > 0 ? (
          weekFixtures.map(fixture => (
            <FixtureCard key={fixture.id}>
              <div className="fixture-header">
                <Calendar size={20} />
                <span>Week {selectedWeek}</span>
              </div>
              
              <div className="teams">
                <div className="team">
                  <div className="name">{fixture.homeTeam}</div>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <div className="name">{fixture.awayTeam}</div>
                </div>
              </div>
              
              <div className="fixture-details">
                <div className="detail">
                  <Calendar size={16} />
                  <span>{new Date(fixture.date).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <Clock size={16} />
                  <span>{fixture.time || "TBD"}</span>
                </div>
              </div>
              
              {fixture.status === 'completed' && (
                <div className="result">
                  {fixture.goalsHome} - {fixture.goalsAway}
                </div>
              )}
            </FixtureCard>
          ))
        ) : (
          <WWECard>
            <p style={{ textAlign: 'center' }}>No fixtures found for Week {selectedWeek}</p>
          </WWECard>
        )}
      </Grid>
    </WWEContainer>
  );
};

export default Fixtures; 