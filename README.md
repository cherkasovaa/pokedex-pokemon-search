# Pokédex | Pokémon Search App

## Project description

Pokédex is a web application for searching and viewing Pokémon, built with React and TypeScript. The application allows users to search for Pokémon by name, view their basic information and stats, and download selected Pokémon data as a CSV file. The project demonstrates modern React development, including component lifecycle, error handling, API interaction, and state management with Zustand.

### Key features:

- Search Pokemon by name
- Display list of all Pokemon when search is empty
- Save search query in localStorage
- Display detailed Pokemon information (image, statistics)
- Pagination for browsing Pokémon list
- Theme switcher
- Author page with a short project description
- Select Pokémon and download their information as a CSV file
- Handle API errors with informative messages
- Loading indicator during request execution
- Error Boundary for catching critical errors

## Release date

2025-07-31

## Technology stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Vitest
- PokeAPI
- ESLint
- Prettier
- Husky

## Installation and setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- `npm`

### Installing dependencies

Clone the repository and install all necessary dependencies:

```bash
git clone https://github.com/cherkasovaa/pokedex-pokemon-search.git
```

```bash
cd pokedex-pokemon-search
```

```bash
npm install
```

#### Run in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`. **For proper functionality in the Russian Federation, VPN usage is required.**

#### Build for production:

```bash
npm run build
```

Files for deployment will be created in the `dist` directory.

#### Preview production build:

```bash
npm run preview
```

#### Code quality checks:

```bash
# Run ESLint to find errors
npm run lint
```

```bash
# Automatically fix formatting with Prettier
npm run format:fix
```

#### Running tests

```bash
# Run all tests
npm run test
```

```bash
# Run tests with coverage report
npm run test:coverage
```
