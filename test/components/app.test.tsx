import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../../src/App';

describe('App component', () => {
	it('renders hello world', () => {
		render(<App />);

		const heading = screen.getByRole('heading', { name: 'Hello world!' });
		expect(heading).toBeInTheDocument();
	});
});
