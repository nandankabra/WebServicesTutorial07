# CampusEats Catalogue (CS543 Tutorial 8)

An end-to-end Node.js & Express REST API with an HTML/CSS frontend.

## Project Structure
```text
catalogue/
├── server.js          # Express REST API (routes & in-memory data)
├── package.json       # Project dependencies & scripts
├── public/
│   ├── index.html     # Frontend UI (fetch GET & POST)
│   └── style.css      # Styling for catalogue and form
└── .gitignore
```

## Setup & Running

1. **Install dependencies** (if not already installed):
   ```bash
   cd catalogue
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   # or
   node server.js
   ```

3. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

---

## REST Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/items` | List all dishes in the menu | `200 OK` |
| `GET` | `/items/:id` | Get details of a single dish | `200 OK` / `404 Not Found` |
| `POST` | `/items` | Add a new dish (`{ name, price }`) | `201 Created` / `422 Unprocessable` |
| `DELETE`| `/items/:id` | Remove a dish by id | `204 No Content` / `404 Not Found` |

### Example cURL Commands

- **List all dishes**:
  ```bash
  curl localhost:3000/items
  ```

- **Get dish by ID**:
  ```bash
  curl localhost:3000/items/1
  ```

- **Add a new dish**:
  ```bash
  curl -i -X POST localhost:3000/items \
    -H "Content-Type: application/json" \
    -d '{"name":"Masala Dosa","price":60}'
  ```

- **Delete a dish**:
  ```bash
  curl -i -X DELETE localhost:3000/items/1
  ```

