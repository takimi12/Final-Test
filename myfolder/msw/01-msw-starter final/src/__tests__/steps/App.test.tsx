import { render, screen, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getFormElements } from '../__tests__/Form.test';
import { posts } from '../../mocks/handlers';
import server from '../../mocks/server';
import {
  getErrorHandler,
  createErrorHandler,
  updateErrorHandler,
  deleteErrorHandler,
} from '../../mocks/handlers';

describe('App', () => {
  test('shows error message when fetching posts fails', async () => {
    // To test how the application handles errors, we need to explicitly configure the server to simulate a failure. This is done using the line server.use(...getErrorHandler);
    server.use(...getErrorHandler);
    render(<App />);
    expect(
      await screen.findByText(/failed to fetch posts/i)
    ).toBeInTheDocument();
  });
  test('shows error message when creating a post fails', async () => {
    const user = userEvent.setup();
    server.use(...createErrorHandler);
    render(<App />);
    const { input, submitBtn } = getFormElements();
    await user.type(input, 'New Post');
    await user.click(submitBtn);
    // verify error message is shown
    expect(
      await screen.findByText(/failed to create post/i)
    ).toBeInTheDocument();
  });
  test('displays error message when updating post fails', async () => {
    const user = userEvent.setup();
    server.use(...updateErrorHandler);
    render(<App />);
    const likeBtn = await screen.findByRole('button', {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    expect(await screen.findByText(/failed to like post/i)).toBeInTheDocument();
  });



  
  test('displays error message when deleting post fails', async () => {
    const user = userEvent.setup();
    server.use(...deleteErrorHandler);
    render(<App />);

    const allPosts = await screen.findAllByRole('article');
    const firstPost = allPosts[0];
    const deleteBtn = within(firstPost).getByRole('button', {
      name: /delete/i,
    });

    await user.click(deleteBtn);

    expect(
      await screen.findByText('Failed to delete post')
    ).toBeInTheDocument();
  });
});
