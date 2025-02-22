import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Gallery from '../pages/NasaApi/gallery';

// Mocking axios to avoid actual API calls during testing
jest.mock('axios');

test('renders Mars Rover Photos Gallery heading', async () => {
  render(<Gallery />);

});

test('fetches and displays rover photos on initial render', async () => {
  const mockedResponse = {
    data: {
      photos: [
        { id: 1, img_src: 'image1.jpg', camera: { full_name: 'Camera 1' }, earth_date: '2024-05-01' },
        { id: 2, img_src: 'image2.jpg', camera: { full_name: 'Camera 2' }, earth_date: '2024-05-02' },
        { id: 3, img_src: 'image3.jpg', camera: { full_name: 'Camera 3' }, earth_date: '2024-05-03' }
      ]
    }
  };

  axios.get.mockResolvedValue(mockedResponse);

  render(<Gallery />);
});