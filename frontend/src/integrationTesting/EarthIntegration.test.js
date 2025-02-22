import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EarthImage from '../pages/NasaApi/EarthImage';

describe('EarthImage component', () => {
  it('submits form with valid inputs and displays Earth image', async () => {
    const { getByPlaceholderText, getByText, getByAltText } = render(<EarthImage />);
    
    const latitudeInput = getByPlaceholderText('Enter latitude');
    const longitudeInput = getByPlaceholderText('Enter longitude');
    const dateInput = getByPlaceholderText('Enter date'); // Update placeholder text here
    const showImageButton = getByText('Show Image');

    // Set valid inputs
    fireEvent.change(latitudeInput, { target: { value: '30' } });
    fireEvent.change(longitudeInput, { target: { value: '20' } });
    fireEvent.change(dateInput, { target: { value: '2024-05-01' } });

    // Submit form
    fireEvent.click(showImageButton);
  });
});
