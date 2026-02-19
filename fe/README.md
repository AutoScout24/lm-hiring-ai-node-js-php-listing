# 🚗 Suzuki Car Listing Application

Repo: https://github.com/AutoScout24/as24-hiring-ai-node-js-car-listing
A modern, responsive car listing application built with Next.js, React, Material UI, and a production-ready architecture.

<img width="1470" alt="Screenshot 2025-05-12 at 2 12 14 AM" src="https://github.com/user-attachments/assets/65cff4ee-d268-40b9-b32e-92ffce5a1ab1" />
<img width="1470" alt="Screenshot 2025-05-12 at 2 13 03 AM" src="https://github.com/user-attachments/assets/0d00d320-e218-48e1-8a01-9e0d11e84b8c" />



## Features

- **Car Browsing**: Browse through a wide selection of cars
- **Advanced Filtering**: Filter cars by category (new/used), make, model, price range, year, fuel type, etc.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Server-Side Rendering**: Optimized performance with Next.js SSR
- **Quick Filters**: Easy access to common filtering categories
- **Search Functionality**: Search for specific makes, models, or features
- **Detailed Car Information**: View comprehensive details for each car

## Tech Stack

- **Framework**: Next.js 15.3+
- **UI Library**: React 19+
- **Styling**: Material UI 7.1+
- **State Management**: React Hooks
- **Routing**: Next.js App Router
- **API**: Next.js API Routes
- **Data Source**: JSON file (can be easily replaced with a database)


### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   https://github.com/rvs9/car-listing.git
   cd car-listing
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### FilterSidebar

The FilterSidebar allows users to filter cars based on various criteria:

- Category (New/Used)
- Price Range
- Year of Manufacture
- Brand
- Kilometers Driven
- Fuel Type
- Vehicle Type
- Transmission Type

Each filter is applied immediately when selected, providing instant feedback to the user.

### CarListings

Displays a grid of car cards with pagination and sorting options:

- Relevance
- Price (Low to High / High to Low)
- Newest First
- Mileage (Low to High)

### QuickFilters

Provides easy access to common filter combinations:

- New Cars
- Used Cars
- Price-based filters
- Body type filters
- Fuel type filters

## API Endpoints

- `GET /api/cars`: Get a list of cars with filtering and pagination
- `GET /api/cars/[id]`: Get detailed information about a specific car

## Best Practices Implemented

- **Folder Structure**: Organized by feature and component responsibility
- **Component Reusability**: Components are designed to be reusable
- **Responsive Design**: Mobile-first approach with MUI breakpoints
- **Performance Optimization**:
  - Lazy loading of images
  - Server-side rendering
  - Pagination for data fetching
- **State Management**: Efficient state management with React Hooks
- **Clean Code**
- **SEO Optimization**: Proper metadata and semantic HTML structure
- **Accessibility**: ARIA attributes and keyboard navigation
- **Error Handling**: Graceful error states and fallbacks

## Responsive Design

The application is fully responsive with optimized layouts for:

- Mobile devices
- Tablets
- Desktops

## Testing

The application uses Jest for unit and integration testing.

Running Tests

To execute all tests:

npm run test
# or
yarn test

You can generate a coverage report using:

npm run test -- --coverage

## License

This project is licensed under the MIT License.
