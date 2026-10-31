# Campus Library - Web Services Tutorial 07

A small application based on [CS543_T07.pdf](CS543_T07.pdf). It lists authors and their books and lets you add a book through a GraphQL API backed by MySQL.

```text
HTML/CSS + JavaScript -> GraphQL API (Node.js + Apollo Server) -> MySQL
```

## Requirements

- Node.js 20 or newer (Node.js 22 is suitable for the installed Apollo Server version).
- MySQL Server running locally.
- VS Code with the Live Server extension.

## Project files

```text
tutorial/
  CS543_T07.pdf       Tutorial reference
  schema.sql         Database, tables, and sample data
  db.js              MySQL connection pool
  server.js          GraphQL schema, resolvers, and API startup
  package.json       Node.js dependencies
  package-lock.json  Dependency lockfile
  public/
    index.html       Library page and GraphQL requests
    style.css        Page styling
```

## First-time setup

Run the commands from the `tutorial` folder:

```bash
cd tutorial
npm install
```

Create the database and load the sample data once:

```bash
mysql -u root -p < schema.sql
```

This creates the `gqldemo` database with:

- `authors`: Asha Patel and Ravi Kumar.
- `books`: Databases 101 (2020), SQL in Practice (2022), and Web Services Basics (2023).
- A foreign key linking each book to its author.

If `gqldemo` and its tables are already set up, skip the import. The script is intended for initial setup; rerunning it against existing tables produces a table-already-exists error.

In `db.js`, set `host`, `user`, and `password` to your local MySQL connection details. Keep `database` set to `gqldemo`. The password must match the MySQL account used for the import.

## Run the application

1. Start the GraphQL API from the `tutorial` folder:

   ```bash
   node server.js
   ```

   Expected output:

   ```text
   GraphQL API ready at http://localhost:4000/
   ```

2. Keep that terminal running. In VS Code, right-click `public/index.html` and select **Open with Live Server**.
3. The page loads authors and their books. Enter a title and year, choose an author, and click **Add book**. The list refreshes after the book is saved.

The page address depends on the folder opened in VS Code. When the workspace is the parent `webservices` folder, it is usually:

```text
http://127.0.0.1:5500/tutorial/public/index.html
```

The API address in `public/index.html` is `http://localhost:4000/`. Restart `node server.js` after changing `db.js` or `server.js`.

## Test GraphQL

Open `http://localhost:4000/` in a browser to use Apollo Sandbox.

Fetch authors and their books:

```graphql
query {
  authors {
    id
    name
    country
    books {
      title
      year
    }
  }
}
```

Add the tutorial's example book:

```graphql
mutation {
  addBook(title: "GraphQL for Beginners", year: 2025, authorId: "2") {
    id
    title
    year
    author {
      name
    }
  }
}
```

Each mutation inserts a new row. Use either the form or Sandbox for this example to avoid adding it twice. Refresh the page to confirm the saved book remains under Ravi Kumar.

Other available queries are `author(id: ID!)` and `books`. Relationship fields work in both directions: `Author.books` and `Book.author`.

To check the saved rows directly, log in with `mysql -u root -p` and run:

```sql
USE gqldemo;
SELECT title, year FROM books WHERE author_id = 2;
```

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Page stays on `Loading...` | Keep the API running on port 4000, confirm the API URL in `public/index.html`, and check the API terminal or browser console for errors. |
| `Access denied for user` | Correct the MySQL username and password in `db.js`, then restart the API. |
| `Unknown database 'gqldemo'` | Run the first-time database import. |
| Connection refused on port 3306 | Start MySQL Server and confirm its connection address. |
| `EADDRINUSE` on port 4000 | Another process is using the API port. Stop the previous API process before starting another. |
| HTML page is not found | Open the actual `public/index.html` file through Live Server; the URL depends on your VS Code workspace folder. |

Verification is manual using the page, GraphQL queries, and MySQL. The project does not currently include automated tests; the default `npm test` command is a placeholder.
