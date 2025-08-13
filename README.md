# Pokemon App

A modern React application built with TypeScript and Vite for browsing and viewing Pokemon details using the PokeAPI.

## Prerequisites

- **Node.js 22.16** or higher
- npm or yarn package manager

## Features

- 🔍 Browse Pokemon list with search functionality
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast loading with React Query for data fetching
- 📊 Detailed Pokemon stats and information
- 🧪 Comprehensive test coverage (Unit & Integration tests)

## Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Redux Toolkit Query** - Data fetching and state management
- **Lucide React** - Icons
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **MSW (Mock Service Worker)** - API mocking for tests

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/nawfelsekrafi/pokemon-app
   cd pokemon-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Testing

This project includes comprehensive testing setup with:

### Unit Tests
- Component testing with React Testing Library
- Utility function testing
- Individual component behavior testing

### Integration Tests
- End-to-end user workflows
- API integration testing with mocked services
- Navigation and state management testing

### Running Tests

```bash
# Run all tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with interactive UI
npm run test:ui
```

### Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test configuration
│   ├── test-utils.tsx    # Custom render utilities
│   ├── handlers.ts       # MSW API mock handlers
│   ├── server.ts         # MSW server setup
│   └── integration.test.tsx  # Integration tests
├── components/
│   ├── *.test.tsx        # Component unit tests
└── utils/
    └── *.test.ts         # Utility function tests
```

## Project Structure

```
src/
├── api/              # API configuration and RTK Query
├── components/       # React components
├── interfaces/       # TypeScript type definitions
├── utils/           # Utility functions
├── test/            # Test configuration and utilities
└── assets/          # Static assets
```

## API

This application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokemon data.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
