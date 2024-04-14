# Library Management System

This project is a library management system built with Django as the backend framework and React as the frontend library. It allows users to manage books, authors, members, and book loans. Follow the instructions below to set up the project locally.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Backend setup:

    ```bash
    python -m venv myenv
    source myenv/bin/activate  #For linux and macOS
    .\myenv\Scripts\activate #For windows
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

3. Frontend setup:

    ```bash
    cd frontend/
    npm install
    npm run dev
    ```

4. Open your web browser and navigate to `http://localhost:5173/` to view the library management system.

## Features

- **Books:** Add, delete, and update book information.
- **Authors:** Manage author details.
- **Members:** Add and manage library members.
- **Book Loans:** Track book loans to members, including due dates and return status.

## Project Structure

- `library_api/`: Django backend code.
- `frontend/`: React frontend code.


