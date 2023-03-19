import { render, screen } from '@testing-library/react';
import Home from './home';

describe("<HomePage />", () => {
    test('renders the welcome text', () => {
        render(<Home />);
        const introElement = screen.getByText(/Welcome to Cook up a Storm website/i);
        expect(introElement).toBeInTheDocument();
    });
})