Blog System API
This is a RESTful API for a blog system, developed using Node.js, Express, Sequelize, and PostgreSQL. The API supports user authentication, blog creation, and comment functionality, providing a solid foundation for any blog platform.
Features

User Authentication: Sign-up and login functionalities with validation.
Blog Management: Create, update, delete, and retrieve blogs.
Comment System: Add comments to blogs with validation.
User-Friendly API: Endpoints are designed with a RESTful approach, ensuring a clean and easy-to-use API.

Technologies Used

Node.js: A JavaScript runtime for building fast and scalable network applications.
Express: A web framework for Node.js that helps manage routes, middleware, and more.
PostgreSQL: A powerful, open-source relational database system used for data storage.
Sequelize: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
Morgan: HTTP request logger middleware for Node.js.
Cors: Middleware to enable Cross-Origin Resource Sharing.
Body-Parser: Middleware to parse incoming request bodies in a middleware before your handlers.

API Endpoints
User Routes

POST /api/users/signup - Create a new user account.
POST /api/users/login - Authenticate a user and generate a token.

Blog Routes

GET /api/blogs/ - Retrieve all blogs.
GET /api/blogs/:blogId - Retrieve a specific blog with its comments and creator details.
POST /api/blogs/ - Create a new blog (protected route).
PUT /api/blogs/:blogId - Update an existing blog (protected route).
DELETE /api/blogs/:blogId - Delete a blog (protected route).

Comment Routes

POST /api/blogs/:blogId/comments - Add a comment to a specific blog (protected route).

Installation

Clone the repository:
bashCopygit clone https://github.com/yourusername/blog-system-api.git
cd blog-system-api

Install dependencies:
bashCopynpm install

Set up environment variables:
Create a .env file in the root directory and add the following variables:
CopyPORT=3000
DB_HOST=localhost
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=blog_system_db
JWT_SECRET=your_jwt_secret_key
(See the env-example section below for more details)
Set up the database:

Create a PostgreSQL database named blog_system_db
Run the migrations:
bashCopynpx sequelize-cli db:migrate



Start the server:
bashCopynpm start


Usage

Use a tool like Postman or curl to interact with the API endpoints.
For protected routes, include the JWT token in the Authorization header:
CopyAuthorization: Bearer your_jwt_token_here


Testing
Run the test suite using:
bashCopynpm test
env-example
Here's an example of what your .env file should look like:
Copy# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=blog_system_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Optional: Logging Configuration
LOG_LEVEL=info

# Optional: CORS Configuration
CORS_ORIGIN=http://localhost:3000
Make sure to replace the placeholder values with your actual configuration details. Here's what each variable means:

PORT: The port on which your server will run.
DB_HOST: The host address of your PostgreSQL database.
DB_USER: Your PostgreSQL database username.
DB_PASS: Your PostgreSQL database password.
DB_NAME: The name of your PostgreSQL database.
JWT_SECRET: A secret key used to sign and verify JWT tokens.
LOG_LEVEL: (Optional) The level of logging you want (e.g., 'info', 'error', 'debug').
CORS_ORIGIN: (Optional) The allowed origin for CORS (Cross-Origin Resource Sharing).

Remember to never commit your .env file to version control. Always add it to your .gitignore file.
Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
