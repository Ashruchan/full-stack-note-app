const { getdb } = require("../utils/databaseutil");
const { ObjectId } = require("mongodb");

module.exports = class Note {
  constructor(title, body, tag) {
    this.title = title;
    this.body = body;
    this.tag = tag;
  }
  saveNotes() {
    const db = getdb();
    return db.collection("notesData").insertOne(this);
  }
  static viewNotes() {
    const db = getdb();
    return db.collection("notesData").find().toArray();
  }
  static deleteNotes(id) {
    const db = getdb();
    return db.collection("notesData").deleteOne({ _id: new ObjectId(id) });
  }
  static deleteAllNotes() {
    const db = getdb();
    return db.collection("notesData").deleteMany({});
  }
  static getNoteById(id) {
    const db = getdb();
    return db.collection("notesData").findOne({
      _id: new ObjectId(id),
    });
  }
};

// const fs = require('fs')2025
// const path=require('path')
// const filePath = path.join(__dirname, '..', 'data', 'notesData.json');

// exports.getAllNotes=()=>{
//     try {
//         const data = fs.readFileSync(filePath,'utf-8');
//         const parsed = JSON.parse(data);
//         return Array.isArray(parsed) ? parsed : [];
//     } catch (err) {
//         return [];
//     }
// }

// exports.addNotes=(title, body, tags)=>{
//     const notes=exports.getAllNotes();
//     const newNote={
//         id: Date.now().toString(),
//         title,
//         body,
//         tags
//     }
//     notes.push(newNote);
//     fs.writeFileSync(filePath, JSON.stringify(notes, null, 3));
// }

// exports.deleteNote = (id) => {
//     const notes = exports.getAllNotes();
//     const idStr = String(id);
//     const filtered = notes.filter((n, i) => {
//         if (n.id != null) return String(n.id) !== idStr;
//         return i !== parseInt(id, 10);
//     });
//     fs.writeFileSync(filePath, JSON.stringify(filtered, null, 3));
// };

// exports.deleteAllNotes = () => {
//     fs.writeFileSync(filePath, JSON.stringify([], null, 3));
// };

// exports.getNoteById = (id) => {
//     const notes = exports.getAllNotes();
//     const idStr = String(id);
//     const idx = parseInt(id, 10);
//     if (!isNaN(idx) && idx >= 0 && idx < notes.length) {
//         const byIndex = notes[idx];
//         if (byIndex.id == null || String(byIndex.id) === idStr) return byIndex;
//     }
//     return notes.find((n) => n.id != null && String(n.id) === idStr) || null;
// };
