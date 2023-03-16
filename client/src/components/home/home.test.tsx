import { render, screen } from '@testing-library/react';
import Home from './home';

describe("<HomePage />", () => {
    test('renders the welcome text', () => {
        render(<Home />);
        const introElement = screen.getByText(/Welcome to the cookup a storm/i);
        expect(introElement).toBeInTheDocument();
    });
})