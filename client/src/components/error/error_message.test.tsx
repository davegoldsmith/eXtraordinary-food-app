import { render, screen } from '@testing-library/react';
import ErrorMessage from './error_message';

describe('<ErrorMessage>', () => {
	it('renders given error message', () => {

    const error = "Some error or other occured";
		render(<ErrorMessage errorMessage={error} errorClassName="someClass" />);

		expect(screen.getByText(error)).toBeInTheDocument();
	});
});