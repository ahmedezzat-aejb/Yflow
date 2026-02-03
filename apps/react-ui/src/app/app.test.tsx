import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../app/app';

// Mock the components to avoid loading issues in tests
jest.mock('../app/components/Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>
}));

jest.mock('../app/components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>
}));

jest.mock('../app/pages/dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard">Dashboard</div>
}));

jest.mock('../app/pages/projects', () => ({
  Projects: () => <div data-testid="projects">Projects</div>
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders projects page when navigating to /projects', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to projects page
    window.history.pushState({}, '', '/projects');
    
    expect(screen.getByTestId('projects')).toBeInTheDocument();
  });
});
