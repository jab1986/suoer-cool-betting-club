import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Calendar, Clock, Trophy, ChevronLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';
import { 
  WWEContainer, 
  WWECard, 
  WWEButton,
  FlexRow 
} from '../styles/components';

// Styled Components
const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
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

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.zinc800};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.zinc700};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FormCard = styled(WWECard)`
  padding: 1.5rem;
  
  h2 {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
      color: ${props => props.theme.colors.gold};
    }
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormSection = styled.div`
  @media (min-width: 768px) {
    grid-column: ${props => props.fullWidth ? 'span 2' : 'span 1'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
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

const Select = styled.select`
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

const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
`;

const ButtonContainer = styled(FlexRow)`
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (min-width: 768px) {
    grid-column: span 2;
    justify-content: flex-end;
  }
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
  margin: 1rem 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const AddFixture = () => {
  const navigate = useNavigate();
  const { addFixture, currentWeek } = useBetting();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    competition: 'Premier League',
    week: currentWeek,
    status: 'upcoming'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new fixture
    const newFixture = {
      ...formData,
      id: Date.now().toString(), // Simple ID generation
      goalsHome: null,
      goalsAway: null
    };
    
    // Add the fixture
    addFixture(newFixture);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      competition: 'Premier League',
      week: currentWeek,
      status: 'upcoming'
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  return (
    <WWEContainer>
      <PageHeader>
        <h1>Add New Fixture</h1>
        
        <BackButton to="/fixtures">
          <ChevronLeft size={20} />
          <span>Back to Fixtures</span>
        </BackButton>
      </PageHeader>
      
      <FormCard>
        <h2>
          <Trophy size={24} />
          Fixture Details
        </h2>
        
        {showSuccess && (
          <SuccessMessage>
            <CheckCircle size={20} />
            <span>Fixture has been added successfully!</span>
          </SuccessMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <FormGroup>
              <Label htmlFor="homeTeam">Home Team</Label>
              <Input 
                type="text" 
                id="homeTeam" 
                name="homeTeam" 
                value={formData.homeTeam}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <FormGroup>
              <Label htmlFor="awayTeam">Away Team</Label>
              <Input 
                type="text" 
                id="awayTeam" 
                name="awayTeam" 
                value={formData.awayTeam}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormSection>
          
          <FormSection fullWidth>
            <FormGroup>
              <Label>Date & Time</Label>
              <DateTimeGrid>
                <Input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                
                <Input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </DateTimeGrid>
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <FormGroup>
              <Label htmlFor="competition">Competition</Label>
              <Select 
                id="competition" 
                name="competition" 
                value={formData.competition}
                onChange={handleChange}
                required
              >
                <option value="Premier League">Premier League</option>
                <option value="FA Cup">FA Cup</option>
                <option value="Champions League">Champions League</option>
                <option value="Europa League">Europa League</option>
                <option value="EFL Cup">EFL Cup</option>
                <option value="International">International</option>
              </Select>
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <FormGroup>
              <Label htmlFor="week">Week</Label>
              <Input 
                type="number" 
                id="week" 
                name="week" 
                value={formData.week}
                onChange={handleChange}
                min="1"
                required
              />
            </FormGroup>
          </FormSection>
          
          <ButtonContainer>
            <CancelButton type="button" onClick={() => navigate('/fixtures')}>
              Cancel
            </CancelButton>
            <WWEButton type="submit">
              Add Fixture
            </WWEButton>
          </ButtonContainer>
        </Form>
      </FormCard>
    </WWEContainer>
  );
};

export default AddFixture; 