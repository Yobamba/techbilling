# TechBilling: A Modern Billing Dashboard

TechBilling is an interactive and responsive frontend application designed to present billing metrics and operational requirements for a fictional company. Built with Next.js, it provides a visually appealing and easy-to-navigate interface with interactive features for a seamless user experience.

## Features

-   **Analytics Dashboard**: A comprehensive dashboard displaying key billing metrics:
    -   Interactive charts for Monthly and Annual Revenue.
    -   Total number of invoices issued.
    -   Count of active customers for the current period.
-   **Compliance Management**: A dedicated page to track and manage regulatory requirements:
    -   Lists compliance tasks such as tax reports, audits, and documentation.
    -   Displays important deadlines.
    -   Includes a "Mark as Complete" feature to track progress.
-   **Invoice Simulator**: A simple and intuitive form to:
    -   Enter fictional client and line item data.
    -   Generate a professional invoice preview on the frontend.
-   **Fully Responsive**: The application is optimized for a seamless experience across desktop, tablet, and mobile devices.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: React Hooks & Context API
-   **Charts**: [Recharts](https://recharts.org/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) (via shadcn/ui conventions)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Class Variance Authority**: For managing component variants.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/techbilling.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd techbilling
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
    or if you use yarn:
    ```sh
    yarn install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```sh
npm run dev
```

This will start the application on `http://localhost:3000`. Open this URL in your browser to see the application.

