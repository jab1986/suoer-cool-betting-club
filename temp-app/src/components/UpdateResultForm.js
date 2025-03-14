import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, X, Trophy } from 'lucide-react';
import { useBetting } from '../context/BettingContext';
import { WWEButton } from '../styles/components';

// Styled Components
const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.zinc900};
  border: 3px solid ${props => props.theme.colors.red};
  border-radius: 0.25rem;
  padding: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 2px solid ${props => props.theme.colors.gold};
    border-radius: 0.25rem;
    z-index: -1;
  }
`;

const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MatchDetails = styled.div`
  background-color: ${props => props.theme.colors.zinc800};
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TeamsDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  
  span {
    padding: 0 1rem;
  }
`;

const CompetitionDisplay = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.zinc400};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.zinc800};
  border: 2px solid ${props => props.theme.colors.zinc700};
  border-radius: 0.25rem;
  color: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.red};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background-color: ${props => props.theme.colors.zinc700};
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.zinc600};
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(34, 197, 94, 0.2);
  border: 2px solid rgb(34, 197, 94);
  border-radius: 0.25rem;
  color: rgb(34, 197, 94);
  padding: 1rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const UpdateResultForm = ({ fixture, onClose }) => {
  const { updateFixtureResult } = useBetting();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    goalsHome: fixture.goalsHome || '',
    goalsAway: fixture.goalsAway || '',
    hasBTTS: false,
    hasOver25: false,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate BTTS and Over 2.5 based on goals if not explicitly set
    const goalsHome = parseInt(formData.goalsHome);
    const goalsAway = parseInt(formData.goalsAway);
    let hasBTTS = formData.hasBTTS;
    let hasOver25 = formData.hasOver25;
    
    // If goals are valid numbers, calculate these values
    if (!isNaN(goalsHome) && !isNaN(goalsAway)) {
      hasBTTS = goalsHome > 0 && goalsAway > 0;
      hasOver25 = goalsHome + goalsAway > 2.5;
    }
    
    // Determine the winner for Full Time Result
    let result = 'draw';
    if (goalsHome > goalsAway) {
      result = 'home';
    } else if (goalsAway > goalsHome) {
      result = 'away';
    }
    
    // Update the fixture with the result
    updateFixtureResult(fixture.id, {
      goalsHome,
      goalsAway,
      status: 'completed',
      results: {
        fullTimeResult: result,
        btts: hasBTTS,
        over25: hasOver25
      }
    });
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message and close form after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };
  
  return (
    <FormContainer>
      <FormTitle>
        <Trophy size={24} />
        Update Match Result
      </FormTitle>
      
      <MatchDetails>
        <TeamsDisplay>
          <span>{fixture.homeTeam}</span>
          <span>vs</span>
          <span>{fixture.awayTeam}</span>
        </TeamsDisplay>
        <CompetitionDisplay>
          {fixture.competition} | {new Date(fixture.date).toLocaleDateString()}
        </CompetitionDisplay>
      </MatchDetails>
      
      {showSuccess && (
        <SuccessMessage>
          <CheckCircle size={20} />
          <span>Result has been updated successfully!</span>
        </SuccessMessage>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="goalsHome">{fixture.homeTeam} Goals</Label>
            <Input 
              type="number" 
              id="goalsHome" 
              name="goalsHome" 
              value={formData.goalsHome}
              onChange={handleChange}
              min="0"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="goalsAway">{fixture.awayTeam} Goals</Label>
            <Input 
              type="number" 
              id="goalsAway" 
              name="goalsAway" 
              value={formData.goalsAway}
              onChange={handleChange}
              min="0"
              required
            />
          </FormGroup>
        </FormGrid>
        
        <FormGroup>
          <Label>Additional Outcomes</Label>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input 
                type="checkbox" 
                name="hasBTTS" 
                checked={formData.hasBTTS}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              Both Teams To Score
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                name="hasOver25" 
                checked={formData.hasOver25}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              Over 2.5 Goals
            </label>
          </div>
        </FormGroup>
        
        <ButtonContainer>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <WWEButton type="submit">
            Update Result
          </WWEButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default UpdateResultForm; 