import React from 'react';
import { render } from '@testing-library/react';
import EarthImage from '../pages/NasaApi/EarthImage';

test('renders APODViewer component without errors', () => {
  render(<EarthImage />);
});