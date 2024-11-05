# Be Sport Smart

Be Sport Smart is a frontend application written in **React 18**. This project aims to be a **personalized service** that helps children choose the ideal sport for them based on various parameters. By guiding children toward the sport that best suits their strengths and interests, Be Sport Smart supports their journey to success in sports, boosting their confidence and improving their chances of earning scholarships.

## Getting Started

### Installation

To set up the project, clone the repository and install the required dependencies:

### Development



	`git clone
	npm install
	npm run dev` 

This will run the app with Vite on your local host. The server is configured to be accessible via the `--host` flag.

## Project Structure

Here is an overview of the main folders and files in the project:

	`public/
	│   ├── assets/            # Contains static assets like images and icons
	│   ├── locales/           # Stores static localization files
	│   ├── favicon.ico        # Favicon for the application
	│   ├── manifest.json      # Manifest file for PWA support
	src/
	│   ├── @types/            # TypeScript types for the application
	│   ├── components/        # Reusable React components
	│   ├── config/            # Configuration files and settings
	│   ├── constants/         # Application constants
	│   ├── helpers/           # Utility functions
	│   ├── hooks/             # Custom React hooks
	│   ├── pages/             # Page components for routes
	│   ├── services/          # API calls and business logic
	│   ├── stores/            # Zustand stores for state management
	│   ├── styles/            # Global and component-specific styles
	│   ├── App.tsx            # Main application component
	│   ├── i18.ts             # Localization configuration file
	│   ├── index.tsx          # Application entry point
	│   ├── routes.ts          # Route configuration
	├── .dockerignore          # Files to ignore in Docker builds
	├── .eslint.cjs            # ESLint configuration
	├── index.html             # Main HTML file
	├── package.json           # Project dependencies and scripts
	├── README.md              # Project documentation
	├── tsconfig.json          # TypeScript configuration
	└── vite.config.ts         # Vite configuration` 

## Localization

The app uses both static and dynamic localization files, managed by **i18next**. Static locales are located in `public/locales`. For dynamic locales, the `i18.ts` file contains a `loadPath` function that determines the path to fetch translations from a storage backend when a dynamic namespace is specified:

typescript

Copy code

	`loadPath: function (language: string, namespace: string[]) {
	  if (namespace[0] === DynamicNamespace) {
	    return `${config.dynamicLocalization.baseUrl}/${language}/translate.json`;
	  }
	  return `/locales/${language}/translate.json`;
	}`

Dynamic locales are fetched from blob storage based on the language and namespace.

## State Management

The application uses **Zustand** for state management. Zustand is a lightweight library that simplifies global state management, making it easy to share and manage state across components.

## Contributing

Feel free to fork the repository and create a pull request if you'd like to contribute.
