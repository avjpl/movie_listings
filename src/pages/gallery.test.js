import { render, screen } from 'test-utils';

import Gallery from './gallery';

test('about page text', async () => {
  render(<Gallery />);

  const textNode = await screen.getByText(/Gallery page/i);
  expect(textNode).toHaveTextContent('About page');
});
