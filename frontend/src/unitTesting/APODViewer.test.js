import React from 'react';
import { render } from '@testing-library/react';
import Gallery from '../pages/NasaApi/gallery';

test('renders APODViewer component without errors', () => {
  render(<Gallery />);
});