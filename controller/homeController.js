const path = require("path");
const noteModel = require("../model/NotesModel");
const Note = require("../model/NotesModel");
const { ObjectId } = require("mongodb");
exports.home = (req, res) => {
  try {
    const allNotes = noteModel.getAllNotes();
    const recentNotes = (allNotes || []).slice(-6).reverse();
    const notesCount = (allNotes || []).length;
    const notesWithTags = (allNotes || []).filter((n) => {
      if (!n.tags) return false;
      const t = Array.isArray(n.tags)
        ? n.tags
        : String(n.tags)
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
      return t.length > 0;
    }).length;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentCount = (allNotes || []).filter((n) => {
      const created = n.id ? parseInt(n.id, 10) : 0;
      return created >= oneDayAgo;
    }).length;

    res.render("homePage", {
      notes: allNotes || [],
      recentNotes,
      notesCount,
      notesWithTags,
      recentCount,
    });
  } catch (err) {
    res.render("homePage", {
      notes: [],
      recentNotes: [],
      notesCount: 0,
      notesWithTags: 0,
      recentCount: 0,
    });
  }
};
exports.deletepage = (req, res) => {
  Note.viewNotes()
    .then((notes) => {
      res.render("deletePage", { notes });
    })
    .catch((err) => {
      console.log(err);
      res.render("deletePage", { notes: [] });
    });
};

exports.addnotes = (req, res) => {
  res.render(path.join(__dirname, "..", "views", "addNotes.ejs"));
};

exports.viewnotes = (req, res) => {
  Note.viewNotes()
    .then((notes) => {
      res.render("viewNotes", { notes });
    })
    .catch((err) => {
      console.log(err);
      res.render("viewNotes", { notes: [] });
    });
};

exports.saveNote = (req, res) => {
  const { title, body, tags } = req.body;
  const objectnotes = new Note(title, body, tags);
  try {
    let { title, body, tags } = req.body;
    if (!body || typeof body !== "string" || !body.trim()) {
      return res.redirect("/");
    }
    body = body.trim();
    if (
      !title ||
      typeof title !== "string" ||
      !title.trim() ||
      title.trim() === "Quick note"
    ) {
      const firstLine = body.split("\n")[0] || "";
      title =
        firstLine.length > 50
          ? firstLine.slice(0, 50) + "..."
          : firstLine || "Quick note";
    } else {
      title = title.trim();
    }
    tags = tags || "";
    objectnotes.saveNotes().then(() => {
      console.log("notes savad successfully");
    });
  } catch (err) {
    console.error("Save note error:", err);
  }
  res.redirect("/");
};

exports.noteDetail = (req, res) => {
  try {
    // const { id } = req.params;
    // const note = noteModel.getNoteById(id);
    // if (!note) {
    //   return res.redirect("/viewNotes");
    // }
    const allNotes = noteModel.getAllNotes();
    const noteIndex = allNotes.findIndex((n) => n === note);
    const noteId = note.id != null ? note.id : noteIndex;
    res.render("noteDetail", { note, noteId });
  } catch (err) {
    res.redirect("/viewNotes");
  }
};

exports.deleteNotes = async (req, res) => {
  const { id, all } = req.query;
  try {
    if (all === "1") {
      await Note.deleteAllNotes();
    } else if (id) {
      await Note.deleteNotes(id);
    }
  } catch (err) {
    console.error("Delete error:", err);
  }

  res.redirect("/deletePage");
};
