import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { useModels } from '../../hooks/useModels';
import { useModelFilter } from '../../hooks/useModelFilter';

// Mock the hooks
vi.mock('../../hooks/useModels');
vi.mock('../../hooks/useModelFilter');

describe('Home Page', () => {
    // Helper to generate N mock models
    const generateMockModels = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `Model ${i + 1}`,
            year: 2023,
            price: 10000 * (i + 1),
            segment: 'Segment',
            thumbnail: `img${i}.jpg`,
            photo: `photo${i}.jpg`,
            title: `Title ${i + 1}`,
            description: `Description ${i + 1}`,
            model_features: [],
            model_highlights: []
        }));
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Parameterized test for requested scenarios
    it.each([0, 1, 2, 5])('renders correctly with %i cars', (count) => {
        const mockModels = generateMockModels(count);

        // Setup mocks
        (useModels as any).mockReturnValue({
            models: mockModels,
            loading: false,
            error: null
        });

        (useModelFilter as any).mockReturnValue({
            activeFilter: 'Todos',
            setActiveFilter: vi.fn(),
            activeSort: 'Nada',
            setActiveSort: vi.fn(),
            filteredAndSortedModels: mockModels // Assuming filter returns everything for this test
        });

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        if (count === 0) {
            expect(screen.getByText(/No se encontraron modelos/i)).toBeInTheDocument();
            expect(screen.queryByText(/Model /)).not.toBeInTheDocument(); // Ensure no models are shown
        } else {
            expect(screen.queryByText(/No se encontraron modelos/i)).not.toBeInTheDocument();
            // Check if the correct number of model cards are rendered.
            // We can check by text "Model X" or simple existence.
            // Since we named them "Model 1", "Model 2", etc.

            // Verify the first and last item logic (strategic check)
            expect(screen.getByText(`Model 1`)).toBeInTheDocument();
            expect(screen.getByText(`Model ${count}`)).toBeInTheDocument();

            // Ideally check total count of rendered items, but that might depend on DOM structure (e.g. role="link" in ModelCard)
            // We can grep by role link inside the grid?
            // Or just trust the first/last check for now as strategic coverage.
        }
    });

    it('renders loading state correctly', () => {
        (useModels as any).mockReturnValue({
            models: [],
            loading: true,
            error: null
        });

        (useModelFilter as any).mockReturnValue({
            activeFilter: 'Todos',
            setActiveFilter: vi.fn(),
            activeSort: 'Nada',
            setActiveSort: vi.fn(),
            filteredAndSortedModels: []
        });

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.queryByText(/Descubrí todos los modelos/i)).not.toBeInTheDocument();
    });
});
