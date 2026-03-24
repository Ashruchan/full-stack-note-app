# Full-Stack Notes App (Express + EJS + MongoDB)


A simple full-stack notes app that supports basic CRUD operations:
- Create notes (title, body, tags)
- View notes (home + list page)
- Delete notes (single note or all notes)

## Visit here
-https://notehive-jet.vercel.app/

## Tech Stack
- Backend: `express` (routes + server)
- Views: `ejs`
- Database: MongoDB (using the Node `mongodb` driver)

## Prerequisites
- Node.js installed
- A running MongoDB instance (local or MongoDB Atlas)

## Setup
1. Install dependencies
   - `cd notesapp`
   - `npm install`
2. Configure MongoDB connection
   - This project currently uses a hard-coded MongoDB connection string inside:
     - `notesapp/utils/databaseutil.js` (`mongourl` constant)
   - Update `mongourl` to your own MongoDB URI.
   - It uses database name: `notes`
   - Collection name: `notesData`
3. Start the server
   - `npm start` (runs `nodemon server.js`)

## Run Locally
- Open: `http://localhost:3000`

## Routes / Pages
- `GET /`
  - Home page that renders `homePage` with notes + simple stats
- `GET /addNotes.ejs`
  - Renders the page to add a new note
- `POST /notes`
  - Saves the note from the form (`title`, `body`, `tags`)
- `GET /viewNotes`
  - Renders a page listing all notes (`viewNotes`)
- `GET /deletePage` (and `GET /deletePage.html`)
  - Renders the delete UI (`deletePage`)
- `GET /delete?all=1`
  - Deletes all notes
- `GET /delete?id=<noteId>`
  - Deletes a single note by MongoDB ObjectId
- `GET /note/:id`
  - Note detail page (`noteDetail`)

## Notes
- This project does not use environment variables for MongoDB by default; configuration is done in `notesapp/utils/databaseutil.js`.
- If your MongoDB connection fails, check the `mongourl` string and ensure the `notes` database + `notesData` collection exist (MongoDB will create them automatically on first write).
