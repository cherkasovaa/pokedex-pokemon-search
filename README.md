# Pokédex | Pokémon Search App

## Project description

Pokédex is a web application for finding Pokémon, built with React using class components. The application allows users to search for Pokémon by name and view their basic information and stats. This project demonstrates working with the component lifecycle, error handling, API interaction, and state management without external state management libraries.

### Key features:

- Search Pokemon by name
- Display list of all Pokemon when search is empty
- Save search query in localStorage
- Display detailed Pokemon information (image, statistics)
- Handle API errors with informative messages
- Loading indicator during request execution
- Error Boundary for catching critical errors

## Release date

2025-07-11

## Technology stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
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
