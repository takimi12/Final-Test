import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';
import { describe, it, expect, vi } from 'vitest';

// Mockowanie FileIcon za pomocą Vitest
vi.mock('../tree/FileIcon', () => {
  return {
    default: () => 'File Icon Component',
  };
});

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A js library',
    owner: 'facebook',
    name: 'react',
    html_url: 'https://github.com/facebook/react',
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

describe('RepositoriesListItem Component', () => {
  it('shows a link to the GitHub homepage for this repository', async () => {
    renderComponent();
    
    screen.debug();
    // Można dodać asercję, np.
    const link = screen.getByRole('link', { name: /facebook\/react/i });
    expect(link).toHaveAttribute('href', 'https://github.com/facebook/react');

    // Oczekiwanie na ikonę języka (jeśli to konieczne)
    // await screen.findByRole('img', { name: 'Javascript' });
  });
});
