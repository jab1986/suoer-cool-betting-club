import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusCircle, X } from 'lucide-react';
import { useBetting } from '../context/BettingContext';
import { WWECard, WWEButton } from '../styles/components';

const FormContainer = styled(WWECard)`
  padding: 1.5rem;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.yellow};
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.zinc900};
  color: white;
  border: 2px solid ${props => props.theme.colors.zinc700};
  border-radius: 4px;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.red};
  }
  
  option {
    background-color: ${props => props.theme.colors.zinc900};
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background: transparent;
  color: #a1a1aa;
  border: 2px solid #a1a1aa;
  padding: 0.75rem 1.5rem;
  font-family: ${props => props.theme.fonts.impact};
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s;
  
  &:hover {
    color: white;
    border-color: white;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(34, 197, 94, 0.2);
  border-left: 4px solid ${props => props.theme.colors.green500};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

const AddBetForm = ({ onClose }) => {
  const { players, fixtures, currentWeek, addBet, getPlayerById, getFixtureById } = useBetting();
  
  // Form state
  const [playerId, setPlayerId] = useState('');
  const [fixtureId, setFixtureId] = useState('');
  const [betType, setBetType] = useState('');
  const [prediction, setPrediction] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Get current week's fixtures that are upcoming
  const availableFixtures = fixtures.filter(
    fixture => fixture.week === currentWeek && fixture.status === 'upcoming'
  );
  
  // Filter players who still have picks available
  const availablePlayers = players.filter(player => {
    const playerBets = player.picksThisWeek || 0;
    const usedBets = fixtures
      .filter(fixture => fixture.week === currentWeek)
      .filter(fixture => 
        fixture.bets?.some(bet => bet.playerId === player.id)
      ).length;
    
    return usedBets < playerBets;
  });
  
  // Reset form
  const resetForm = () => {
    setPlayerId('');
    setFixtureId('');
    setBetType('');
    setPrediction('');
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!playerId || !fixtureId || !betType || !prediction) {
      return; // Form validation failed
    }
    
    // Add the bet
    addBet(parseInt(playerId, 10), parseInt(fixtureId, 10), betType, prediction);
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    resetForm();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };
  
  // Get prediction options based on bet type
  const getPredictionOptions = () => {
    if (!betType) return [];
    
    const fixture = fixtureId ? getFixtureById(parseInt(fixtureId, 10)) : null;
    
    switch (betType) {
      case 'Full Time Result':
        return [
          { value: 'home', label: fixture ? `${fixture.homeTeam} Win` : 'Home Win' },
          { value: 'away', label: fixture ? `${fixture.awayTeam} Win` : 'Away Win' },
          { value: 'draw', label: 'Draw' }
        ];
      case 'Both Teams To Score':
        return [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ];
      case 'Over/Under':
        return [
          { value: 'over', label: 'Over 2.5 Goals' },
          { value: 'under', label: 'Under 2.5 Goals' }
        ];
      case 'Handicap':
        return [
          { value: 'home -1', label: fixture ? `${fixture.homeTeam} -1` : 'Home -1' },
          { value: 'away -1', label: fixture ? `${fixture.awayTeam} -1` : 'Away -1' },
          { value: 'home -2', label: fixture ? `${fixture.homeTeam} -2` : 'Home -2' },
          { value: 'away -2', label: fixture ? `${fixture.awayTeam} -2` : 'Away -2' }
        ];
      default:
        return [];
    }
  };
  
  return (
    <FormContainer>
      {success && (
        <SuccessMessage>
          <span>Bet added successfully!</span>
          <button onClick={() => setSuccess(false)}>
            <X size={16} />
          </button>
        </SuccessMessage>
      )}
      
      <FormTitle>
        <PlusCircle size={24} />
        Add New Bet
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="player">Player</Label>
            <Select 
              id="player"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              required
            >
              <option value="">Select Player</option>
              {availablePlayers.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.picksThisWeek} picks available)
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="fixture">Fixture</Label>
            <Select 
              id="fixture"
              value={fixtureId}
              onChange={(e) => setFixtureId(e.target.value)}
              required
            >
              <option value="">Select Fixture</option>
              {availableFixtures.map(fixture => (
                <option key={fixture.id} value={fixture.id}>
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="betType">Bet Type</Label>
            <Select 
              id="betType"
              value={betType}
              onChange={(e) => {
                setBetType(e.target.value);
                setPrediction(''); // Reset prediction when bet type changes
              }}
              required
            >
              <option value="">Select Bet Type</option>
              <option value="Full Time Result">Full Time Result</option>
              <option value="Both Teams To Score">Both Teams To Score</option>
              <option value="Over/Under">Over/Under</option>
              <option value="Handicap">Handicap</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="prediction">Prediction</Label>
            <Select 
              id="prediction"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              required
              disabled={!betType}
            >
              <option value="">Select Prediction</option>
              {getPredictionOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormGrid>
        
        <ButtonContainer>
          {onClose && (
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          )}
          <WWEButton type="submit">
            Add Bet
          </WWEButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default AddBetForm; 