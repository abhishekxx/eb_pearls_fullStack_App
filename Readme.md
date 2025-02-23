# Logoipsum - A Mini Landing Page

A modern landing page for Logoipsum - A Mini APP built with vanilla HTML, CSS, JavaScript and PHP. Features include a dynamic hero slider, task management system, and contact form.

## Features

- Responsive design that works on all devices
- Dynamic hero section with auto-sliding content
- Interactive task management system
- Contact form with validation
- Modern UI with smooth animations
- Feature cards with dynamic content loading
- Footer with social links and navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- A modern web browser
- Local PHP server for API endpoints (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abhishekxx/eb_pearls_fullStack_App.git
cd eb_pearls_fullStack_App
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

## CLIENT

## Project Structure

```
├── index.html          # Main HTML file
├── style.css          # Global styles
├── main.js           # JavaScript functionality
├── public/           # Static assets
└── package.json      # Project configuration
```

## Features Breakdown

### Hero Section

- Auto-sliding content with smooth transitions
- Custom dot navigation
- Gradient overlay for better text visibility

### Task Manager

- Add, delete, and toggle tasks
- Persistent storage using backend API
- Smooth animations for task interactions

### Contact Form

- Input validation
- Success modal feedback
- API integration for form submission

### Responsive Design

- Mobile-first approach
- Breakpoints for various screen sizes
- Optimized layout for all devices

## API Endpoints

The project uses the following API endpoints:

`BASE_URL = 'http://localhost/eb-pearls-test-server'`

- `GET /get-feature.php` - Fetch feature cards data
- `GET /get-task.php` - Fetch tasks
- `POST /task.php` - Create new task
- `PUT /put-task.php` - Update task status
- `DELETE /task.php` - Delete task
- `POST /post-contact-message.php` - Submit contact form

## Customization

### Colors

The project uses CSS variables for easy customization. Main colors can be modified in `style.css`:

```css
:root {
  --primary-color: #4532fc;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  /* ... other color variables */
}
```

### Content

- Hero section content can be modified in `index.html`
- Feature cards are loaded dynamically from the API
- Task list is loaded dynamically from the API
- Contact form content can be modified in `index.html`
- Footer links and content can be updated in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SERVER / BACKEND

# PHP Feature Management API

A PHP-based REST API for managing features and contact form submissions with MySQL database integration.

## Features

- Feature Management
- Contact Form with Email Integration
- Task Management with Complete CRUD Operations
- MySQL Database Integration
- CORS Support
- PHPMailer Integration for Email Sending

## Prerequisites

- PHP 7.4 or higher
- MySQL Server
- Composer (for PHPMailer dependency)
- SMTP credentials (for email functionality)

## Database Configuration

Update the `db_config.php` file with your database credentials:

```php
$host = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";
```

## Database Schema

### Features Table

Please use file `eb_pearls_test_data_2025-02-22_194639.sql` to create the database schema.

## API Endpoints

### Features

- `GET /get-feature.php`

  - Retrieves all features
  - Returns JSON array of features

- `POST /create-feature.php`
  - Adds a new feature
  - Required fields:
    - icon
    - title
    - description

### Contact Form

- `POST /post-contact-message.php`
  - Submits contact form and sends email
  - Required fields:
    - name
    - email
    - message

### Tasks

- `GET /get-task.php`

  - Retrieves all tasks
  - Returns JSON array of tasks in descending order by ID

- `POST /task.php`

  - Creates a new task
  - Required fields:
    - task (string)
  - Returns the newly created task object

- `DELETE /task.php`

  - Deletes a task
  - Required fields:
    - id (number)
  - Returns success/error message

- `PUT /put-task.php`
  - Updates a task's status and content
  - Required fields:
    - id (number)
    - task (string)
    - completed (boolean)
  - Returns success/error message

## Email Configuration

The application uses PHPMailer for sending emails. Update the SMTP configuration in `post-contact-message.php`:

```php
$mail->Host       = 'smtp.gmail.com';
$mail->Username   = 'your_email@gmail.com';
$mail->Password   = 'your_app_password';
```

## Recipients Mails

$mail->addAddress('johnchand941@gmail.com', 'Abhishek Chand'); // Add a recipient

## Security Notes

- The application implements CORS headers for cross-origin requests
- Input validation and sanitization are implemented
- PDO prepared statements are used to prevent SQL injection
- All API endpoints include proper error handling and validation

## Frontend Integration

The API includes HTML forms for feature management and can be integrated with any frontend framework using the provided API endpoints. All endpoints support CORS for cross-origin requests.

## Error Handling

All endpoints return JSON responses with appropriate success/error messages and HTTP status codes. The API implements comprehensive error handling for:

- Invalid input data
- Database errors
- Missing required fields
- Authentication/Authorization errors
- Server errors
