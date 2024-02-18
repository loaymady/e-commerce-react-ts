# E-Commerce React TypeScript

## Overview

E-Commerce React TypeScript is a React application with TypeScript for building an e-commerce platform. This project utilizes popular technologies such as Chakra UI, Redux Toolkit, Formik, React Router, and more.

## Technologies Used

- Vite
- React
- TypeScript
- Chakra UI
- Redux Toolkit
- Redux Persist
- React Router
- React Cookies
- React Icons
- Formik
- Yup

## Demo

[Explore E-Commerce-React-TS App](https://e-commerce-react-ts.vercel.app/)

## Project Structure

- `src/`: Directory containing the source code.
  - `app/`: Main application folder.
    - `store.ts`: Redux store configuration.
    - `features/`: Redux features.
      - `cartSlice.ts`: Cart feature slice.
      - `globalSlice.ts`: Global feature slice.
      - `loginSlice.ts`: Login feature slice.
      - `networkSlice.ts`: Network feature slice.
      - `registerSlice.ts`: Register feature slice.
    - `services/`: Service files.
      - `productsSlice.ts`: Products service slice.
  - `assets/`: Directory for project assets.
    - `home.jpg`: HomePage image.
    - `img-placeholder.png`: Image placeholder.
    - `profileDefault.jpg`: Default profile image.
  - `components/`: Directory containing the application components.
    - `Navbar.tsx`: Navigation bar component.
    - `ProductCard.tsx`: Product card component.
    - `CartDrawer.tsx`: Cart drawer component.
    - `CartDrawerItem.tsx`: Cart drawer item component.
    - `DashboardProductsTable.tsx`: Dashboard products table component.
    - `ProductCardSkeleton.tsx`: Skeleton component for loading product cards.
    - `TableSkeleton.tsx`: Skeleton component for loading tables.
    - `ui/`: UI components.
      - `ProductGrid.tsx`: Product grid component.
    - `auth/`: Authentication-related components.
      - `ProtectedRoute.tsx`: Component for protecting routes.
    - `errors/`: Components related to error handling.
      - `ErrorHandler.tsx`: Component for handling errors.
  - `providers/`: Directory for context providers.
    - `InternetConnectionProvider.tsx`: Internet connection provider component.
  - `pages/`: React pages for different routes.
    - `index.tsx`: Main page component.
    - `Layout.tsx`: Layout component.
    - `Login.tsx`: Login page component.
    - `PageNotFound.tsx`: Component for 404 errors.
    - `Products.tsx`: Products page component.
    - `Register.tsx`: Register page component.
    - `Product.tsx`: Product page component.
    - `dashboard/`: Dashboard pages.
      - `AdminDashboard.tsx`: Admin dashboard component.
      - `DashboardLayout.tsx`: Dashboard layout component.
      - `DashboardProducts.tsx`: Dashboard products component.
  - `router/`: React Router configuration.
    - `index.tsx`: Router configuration.
  - `services/`: Service files.
    - `CookieService.ts`: Cookie service.
  - `shared/`: Shared components.
    - `AlertDialog.tsx`: Alert dialog component.
    - `Modal.tsx`: Modal component.
  - `theme/`: Theme configuration.
    - `index.ts`: Theme configuration file.
  - `interfaces/`: Directory containing TypeScript interfaces.
    - `index.ts`: File exporting TypeScript interfaces used throughout the project.
  - `data/`: Directory containing data-related files.
    - `index.ts`: File exporting structured data used in the application.
  - `utils/`: Utility functions and libraries.
    - `functions.ts`: General utility functions.

## Backend API

The E-Commerce-React-TS app communicates with a Strapi backend. The backend API is hosted at:

- **Base URL:** `https://strapi-e-commerce-6029.onrender.com/api`

## Backend Setup

Follow these steps to set up the backend for the Fullstack E-Commerce-React-TS App app:

1. Access the Strapi backend admin panel by visiting [https://strapi-e-commerce-6029.onrender.com/admin](https://strapi-e-commerce-6029.onrender.com/admin).

2. Login a super admin account.
   - Email: admin@admin.com
   - Password: Aa123456

**Note:** Due to the nature of hosting services, it's possible that the Render domain may experience sleep mode delays. If you encounter any issues accessing the backend immediately after setup, please allow some time for the domain to activate.

## Usage

### Main Page

The main page serves as the initial landing page, welcoming users and introducing them to the application. While encouraging exploration of the platform's features, the primary call-to-action is to navigate to product listings.

However, access to product listings requires user authentication. If not logged in, users will be automatically redirected to the login page through a protected route, ensuring a secure and personalized experience.

### Navbar

The Navbar component provides navigation and user-related functionalities. Key features include:

- **Navigation Links:**

  - Users can navigate to different sections, such as Home, Dashboard, and Products, through the navigation links.

- **Color Mode Toggle:**

  - Users can switch between light and dark color modes for a customized visual experience.

- **User Authentication:**

  - The navbar displays different options based on user authentication status. If logged in, the user's profile picture and options for cart and logout are shown.

- **Cart Interaction:**

  - Users can view the number of items in their shopping cart and open the cart drawer for further interaction.

- **Responsive Design:**

  - The navbar is designed to be responsive, adapting to different screen sizes for optimal user experience.

### CartDrawer

The `CartDrawer` component enhances the user experience by providing a visual representation of the shopping cart. Users can easily manage the items in their cart through this interactive drawer. Key features of the `CartDrawer` include:

- **Item Display:**

  - The drawer lists each item in the shopping cart, displaying essential details such as product image, title, and price. This allows users to quickly review the contents of their cart.

- **Quantity Adjustment:**

  - Users can easily manage the quantity of each product in the cart. They can increase or decrease the quantity as needed.

- **Deletion of Products:**

  - Users have the option to remove specific products from their cart. This functionality allows for efficient customization of the shopping cart.

- **Total Price Calculation:**

  - The drawer dynamically calculates and displays the total price of the items in the cart. This gives users a clear understanding of their order's cost.

- **Clear All Option:**

  - The "Clear All" button provides users with the ability to quickly empty their entire shopping cart, offering a convenient way to start fresh.

- **Responsive Design:**
  - The `CartDrawer` component is designed to be responsive, ensuring a seamless user experience across different devices.

### Products Page

- **Accessing Products:**

  - Users need to log in to view the products. If not logged in, they are redirected to the login page.

- **Product Listing:**
  - The products page displays a grid of products, each represented by a `ProductCard` component.

### Product Details Page

- **View Product Details:**

  - Click on a product on the products page to view detailed information about the product.

- **Add to Cart:**
  - On the product details page, users can add the product to their shopping cart.

### Dashboard

The Dashboard component (`DashboardLayout` and `AdminDashboard`) provides a user interface for administrative tasks. Here are the main features:

- **Sidebar Navigation:**

  - Accessible on both desktop and mobile devices.
  - Provides quick navigation to various sections such as Home, Dashboard, and Products.

- **Responsive Design:**

  - Adapts to different screen sizes, with a collapsible sidebar for smaller screens.
  - Responsive navigation options for mobile devices.

- **Admin Dashboard:**

  - Displays user-specific information, such as the profile picture and username.
  - `AdminDashboard` component showcases additional details like the user's role (e.g., "Software Engineer").

- **Color Mode Toggle:**

  - Users can toggle between light and dark color modes for a personalized experience.

- **User Logout:**
  - Users can sign out from the application using the "Sign out" option in the user menu.
