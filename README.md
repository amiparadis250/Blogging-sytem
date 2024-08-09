# **Blog System API**

This is a RESTful API for a blog system, developed using Node.js, Express, Sequelize, and PostgreSQL. The API supports user authentication, blog creation, and comment functionality, providing a solid foundation for any blog platform.

## **Features**

- **User Authentication**: Sign-up and login functionalities with validation.
- **Blog Management**: Create, update, delete, and retrieve blogs.
- **Comment System**: Add comments to blogs with validation.
- **User-Friendly API**: Endpoints are designed with a RESTful approach, ensuring a clean and easy-to-use API.

## **Technologies Used**

- **Node.js**: A JavaScript runtime for building fast and scalable network applications.
- **Express**: A web framework for Node.js that helps manage routes, middleware, and more.
- **PostgreSQL**: A powerful, open-source relational database system used for data storage.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Body-Parser**: Middleware to parse incoming request bodies in a middleware before your handlers.

## **API Endpoints**

### **User Routes**

- `POST /api/users/signup` - Create a new user account.
- `POST /api/users/login` - Authenticate a user and generate a token.

### **Blog Routes**

- `GET /api/blogs/` - Retrieve all blogs.
- `GET /api/blogs/:blogId` - Retrieve a specific blog with its comments and creator details.
- `POST /api/blogs/` - Create a new blog (protected route).
- `PUT /api/blogs/:blogId` - Update an existing blog (protected route).
- `DELETE /api/blogs/:blogId` - Delete a blog (protected route).

### **Comment Routes**

- `POST /api/blogs/:blogId/comments` - Add a comment to a specific blog (protected route).

## **Installation**

1. Clone the repository and navigate to the project directory:
    ```bash
    git clone https://github.com/yourusername/blog-system-api.git
    cd blog-system-api
    ```

2. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=
    DEV_DATABASE_URL=
    JWT_SECRET
    baseURL=
    CLOUDNAME=
    APIKEY=
    APISECRET=
    CLOUDINARY_URL=
    ```

3. Run the setup script:
    ```bash
    npm install
    npm start
    ```

## **Usage**

Once the server is running, you can access the API at `http://localhost:5000/` and start making requests to the endpoints.

---


