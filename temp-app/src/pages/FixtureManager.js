import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus, CheckCircle, AlertCircle, X } from 'lucide-react';
import styled from 'styled-components';
import { useBetting } from '../context/BettingContext';
import AddBetForm from '../components/AddBetForm';
import UpdateResultForm from '../components/UpdateResultForm';
import { Link } from 'react-router-dom';
import { 
  WWEContainer, 
  WWEButton, 
  WWECard, 
  WWETable,
  FlexRow 
} from '../styles/components';

// Styled Components
const PageHeader = styled(FlexRow)`
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

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.zinc800};
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  transition: all 0.2s;
  
  ${props => props.active ? `
    background-color: ${props.theme.colors.red};
    color: white;
  ` : `
    color: #a1a1aa;
    &:hover {
      color: white;
    }
  `}
`;

const WeekSelector = styled(WWECard)`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const WeekContainer = styled(FlexRow)`
  justify-content: space-between;
`;

const WeekTitle = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    color: ${props => props.theme.colors.gold};
    margin-right: 0.5rem;
  }
  
  h2 {
    margin: 0;
  }
`;

const FixturesCard = styled(WWECard)`
  padding: 1.5rem;
`;

const CardHeader = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ButtonsContainer = styled(FlexRow)`
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.zinc800};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.zinc700};
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.red};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c00000;
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;

const AddFixtureButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.gold};
  color: black;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    background-color: #e6c200;
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  
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

const TeamName = styled.span`
  font-weight: bold;
  color: white;
`;

const ResultCell = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.yellow};
`;

const PredictionContainer = styled(FlexRow)`
  gap: 0.5rem;
`;

const PredictionDot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  
  background-color: ${props => 
    props.result === 'win' 
      ? 'rgba(34, 197, 94, 0.4)' 
      : 'rgba(239, 68, 68, 0.4)'
  };
`;

const PredictionTooltip = styled.div`
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.colors.zinc900};
  color: white;
  font-size: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
  width: 8rem;
  display: none;
  
  ${PredictionDot}:hover & {
    display: block;
  }
  
  p {
    margin-bottom: 0.25rem;
  }
  
  .result {
    color: ${props => 
      props.result === 'win' 
        ? props.theme.colors.green500 
        : props.theme.colors.red500
    };
  }
`;

const ActionButton = styled.button`
  background-color: ${props => 
    props.primary 
      ? props.theme.colors.gold 
      : props.theme.colors.zinc700
  };
  color: ${props => props.primary ? 'black' : 'white'};
  font-weight: bold;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => 
      props.primary 
        ? '#e6c200' 
        : props.theme.colors.zinc600
    };
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  svg {
    color: ${props => props.theme.colors.zinc700};
    margin: 0 auto 1rem auto;
  }
  
  h3 {
    color: #a1a1aa;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #71717a;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  /* Scrollbar styling for Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #27272a;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.red};
    border-radius: 3px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: white;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  z-index: 10;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FixtureManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddBetForm, setShowAddBetForm] = useState(false);
  const [showUpdateResultForm, setShowUpdateResultForm] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const { 
    currentWeek, 
    fixtures, 
    bets, 
    advanceToNextWeek, 
    getPlayerById 
  } = useBetting();

  const handlePreviousWeek = () => {
    // In this simple version, we'll just decrement the week number
    // In a real app, you'd want to validate that there's data for the previous week
    // advanceToPreviousWeek();
  };

  const handleNextWeek = () => {
    advanceToNextWeek();
  };
  
  const openAddBetForm = () => {
    setShowAddBetForm(true);
  };
  
  const closeAddBetForm = () => {
    setShowAddBetForm(false);
  };
  
  const openUpdateResultForm = (fixture) => {
    setSelectedFixture(fixture);
    setShowUpdateResultForm(true);
  };
  
  const closeUpdateResultForm = () => {
    setShowUpdateResultForm(false);
    setSelectedFixture(null);
  };
  
  // Filter fixtures based on the active tab and current week
  const filteredFixtures = fixtures.filter(fixture => {
    const isCurrentWeek = fixture.week === currentWeek;
    const isUpcoming = fixture.status === 'upcoming';
    return isCurrentWeek && (activeTab === 'upcoming' ? isUpcoming : !isUpcoming);
  });
  
  // Group fixtures by date for better display
  const groupedFixtures = filteredFixtures.reduce((acc, fixture) => {
    if (!acc[fixture.date]) {
      acc[fixture.date] = [];
    }
    acc[fixture.date].push(fixture);
    return acc;
  }, {});
  
  // Format date from YYYY-MM-DD to more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get fixture predictions
  const getFixturePredictions = (fixtureId) => {
    return bets
      .filter(bet => bet.fixtureId === fixtureId)
      .map(bet => {
        const player = getPlayerById(bet.playerId);
        return {
          playerId: bet.playerId,
          playerName: player.name,
          prediction: bet.prediction,
          betType: bet.betType,
          isCorrect: bet.isCorrect
        };
      });
  };

  return (
    <WWEContainer>
      <PageHeader>
        <h1>Fixture Manager</h1>
        
        <TabContainer>
          <TabButton 
            active={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </TabButton>
          <TabButton 
            active={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </TabButton>
        </TabContainer>
      </PageHeader>

      {/* Week Selector */}
      <WeekSelector>
        <WeekContainer>
          <WWEButton onClick={handlePreviousWeek}>
            <ChevronLeft size={20} style={{ marginRight: '0.25rem' }} />
            <span>Previous</span>
          </WWEButton>
          
          <WeekTitle>
            <Calendar size={24} />
            <h2>Week {currentWeek}</h2>
          </WeekTitle>
          
          <WWEButton onClick={handleNextWeek}>
            <span>Next</span>
            <ChevronRight size={20} style={{ marginLeft: '0.25rem' }} />
          </WWEButton>
        </WeekContainer>
      </WeekSelector>

      {/* Fixtures List */}
      <FixturesCard>
        <CardHeader>
          <h2>
            {activeTab === 'upcoming' ? 'Upcoming Fixtures' : 'Completed Fixtures'}
          </h2>
          
          <ButtonsContainer>
            <FilterButton>
              <Filter size={16} />
              <span>Filter</span>
            </FilterButton>
            {activeTab === 'upcoming' && (
              <>
                <AddButton onClick={openAddBetForm}>
                  <Plus size={16} />
                  <span>Add Bet</span>
                </AddButton>
                <AddFixtureButton to="/add-fixture">
                  <Plus size={16} />
                  <span>Add Fixture</span>
                </AddFixtureButton>
              </>
            )}
          </ButtonsContainer>
        </CardHeader>

        {/* Display fixtures if available */}
        {Object.keys(groupedFixtures).length > 0 ? (
          <TableContainer>
            <WWETable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Home</th>
                  <th>Away</th>
                  {activeTab === 'completed' && (
                    <>
                      <th>Result</th>
                      <th>Predictions</th>
                    </>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedFixtures).map(([date, fixtures]) => (
                  <React.Fragment key={date}>
                    {/* Date header row */}
                    <tr>
                      <td colSpan={activeTab === 'upcoming' ? 5 : 7} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <strong>{formatDate(date)}</strong>
                      </td>
                    </tr>
                    
                    {/* Fixture rows */}
                    {fixtures.map(fixture => {
                      const predictions = getFixturePredictions(fixture.id);
                      
                      return (
                        <tr key={fixture.id}>
                          <td>{new Date(fixture.date).toLocaleDateString()}</td>
                          <td>{fixture.time}</td>
                          <td><TeamName>{fixture.homeTeam}</TeamName></td>
                          <td><TeamName>{fixture.awayTeam}</TeamName></td>
                          
                          {activeTab === 'completed' && (
                            <>
                              <td>
                                <ResultCell>
                                  {fixture.goalsHome}-{fixture.goalsAway}
                                </ResultCell>
                              </td>
                              <td>
                                <PredictionContainer>
                                  {predictions.map((pred, idx) => (
                                    <PredictionDot 
                                      key={idx} 
                                      result={pred.isCorrect ? 'win' : 'loss'}
                                    >
                                      {pred.playerName.charAt(0)}
                                      <PredictionTooltip result={pred.isCorrect ? 'win' : 'loss'}>
                                        <p><strong>{pred.playerName}</strong></p>
                                        <p>{pred.betType}: {pred.prediction}</p>
                                        <p className="result">
                                          {pred.isCorrect ? 'Correct' : 'Incorrect'}
                                        </p>
                                      </PredictionTooltip>
                                    </PredictionDot>
                                  ))}
                                </PredictionContainer>
                              </td>
                            </>
                          )}
                          
                          <td>
                            {activeTab === 'upcoming' ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <ActionButton primary onClick={() => openAddBetForm()}>
                                  Make Prediction
                                </ActionButton>
                                <ActionButton onClick={() => openUpdateResultForm(fixture)}>
                                  Add Result
                                </ActionButton>
                              </div>
                            ) : (
                              <ActionButton>
                                Details
                              </ActionButton>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </WWETable>
          </TableContainer>
        ) : (
          <EmptyState>
            <Calendar size={48} />
            <h3>No Fixtures Found</h3>
            <p>
              {activeTab === 'upcoming' 
                ? 'There are no upcoming fixtures for this week.' 
                : 'There are no completed fixtures to display.'
              }
            </p>
          </EmptyState>
        )}
      </FixturesCard>
      
      {/* Add Bet Modal */}
      {showAddBetForm && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeAddBetForm}>
              <X size={24} />
            </CloseButton>
            <AddBetForm onClose={closeAddBetForm} />
          </ModalContent>
        </Modal>
      )}
      
      {/* Update Result Modal */}
      {showUpdateResultForm && selectedFixture && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeUpdateResultForm}>
              <X size={24} />
            </CloseButton>
            <UpdateResultForm 
              fixture={selectedFixture} 
              onClose={closeUpdateResultForm} 
            />
          </ModalContent>
        </Modal>
      )}
    </WWEContainer>
  );
};

export default FixtureManager; 