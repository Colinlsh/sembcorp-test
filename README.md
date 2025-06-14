# React Weather Forecast Dashboard

# [demo-site](https://main.du0g6ixst3hoa.amplifyapp.com/)

An interactive and responsive weather dashboard built with React, Redux, and Leaflet. This application allows users to view detailed hourly and daily weather forecasts for any location worldwide, presented with dynamic charts and a rich map interface.

NOTE! - only data from 1st Nov 2024 ~ 10th Nov 2024 is utilized and the search is a free service, it may or may not work.

## Features

- **Interactive Map**: Built with Leaflet and React-Leaflet, allowing smooth panning and zooming.
- **Multiple Data Sources**: Integrates with Open-Meteo for detailed historical/forecast data and Singapore's Data.gov.sg for real-time area forecasts.
- **Dynamic Location Finding**:
  - **Search**: Find any location worldwide by name.
  - **Click-to-Query**: Click anywhere on the map to instantly get coordinates and fetch the forecast.
  - **Reverse Geocoding**: Converts clicked coordinates into human-readable place names.
- **Detailed Forecast Panel**:
  - A modal-style panel that appears with smooth entry and exit animations.
  - Can be toggled on and off by the user.
  - Displays the selected location name and the forecast date range.
- **Rich Data Visualization**:
  - **Mini-Map**: A static map provides visual context within the forecast panel.
  - **Multiple Charts**: Uses Recharts to display three distinct, easy-to-read charts:
    1.  Hourly Temperature & Humidity (Dual-axis Line Chart).
    2.  Hourly Solar Radiation (Area Chart).
    3.  Daily Min/Max Temperature (Bar Chart).
- **Persistent State**: Uses `redux-persist` to remember user state across sessions, with a migration system to handle state shape changes over time.
- **Responsive Design**: The layout adapts from a stacked view on mobile to a multi-column dashboard on wider screens using Tailwind CSS.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) (with Vite)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Mapping**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Charting**: [Recharts](https://recharts.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **APIs**:
  - [Open-Meteo](https://open-meteo.com/) (Archive & Forecast APIs)
  - [OpenStreetMap/Nominatim](https://nominatim.org/) (Geocoding & Reverse Geocoding)
  - [Data.gov.sg](https://data.gov.sg/) (Singapore Area Weather)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory**
    ```sh
    cd <your-project-directory>
    ```
3.  **Install dependencies**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Application

- **Development Mode**:

  ```sh
  npm run dev
  ```

  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Key Project Structure

/src
|-- /api
| |-- agent.ts # Centralized Axios agent for all API requests
|-- /app
| |-- hooks.ts # Typed hooks for Redux
| |-- store.ts # Redux store configuration with Redux Persist
| |-- /slice
| |-- weatherSlice.ts # Redux logic, state, and async thunks for weather
|-- /components
| |-- ColinMapMap.tsx # Main map component orchestrating all UI
| |-- WeatherPanel.tsx # The modal panel with charts and the mini-map
| |-- SearchComponent.tsx# Search input component
| |-- MapClickHandler.tsx# Helper component for map click events
|-- /models
| |-- index.ts # All TypeScript interfaces for the application
