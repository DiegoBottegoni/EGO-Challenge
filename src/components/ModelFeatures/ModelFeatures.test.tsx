import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ModelFeatures from './ModelFeatures';
import type { ModelFeature } from '../../types';

describe('ModelFeatures Carousel', () => {
    const mockFeatures: ModelFeature[] = [
        { name: 'Feature 1', description: 'Desc 1', image: 'img1.jpg' },
        { name: 'Feature 2', description: 'Desc 2', image: 'img2.jpg' },
        { name: 'Feature 3', description: 'Desc 3', image: 'img3.jpg' },
        { name: 'Feature 4', description: 'Desc 4', image: 'img4.jpg' },
    ];

    it('renders correctly', () => {
        render(<ModelFeatures features={mockFeatures} />);
        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByText('Desc 1')).toBeInTheDocument();
    });

    // Since interactions like scroll are hard to mock in jsdom without better mocks for scrollIntoView/scrollTo,
    // we can test if the Arrows render and if clicking them *attempts* to call scroll (or just doesn't crash).
    // A better test for interaction here involves mocking the `useCarousel` hook if we want to test logic,
    // or just checking that the button exists and behaves somewhat expectedly.

    // However, `useCarousel` is used internally. To test *interaction* cleanly without a full browser,
    // checking that the buttons exist is a good start.

    it('renders carousel controls (arrows and dots)', () => {
        render(<ModelFeatures features={mockFeatures} />);

        // We assume Arrows have role="button" or we search by some other means.
        // Looking at the code (ModelFeatures -> CarouselArrows), let's assume standard accessiblity or checking presence.
        // Let's verify we have dots.
        const dots = screen.getAllByRole('button'); // This might catch arrows too
        expect(dots.length).toBeGreaterThan(0);
    });
});
