// src/NotesApp.jsx
import React, { useState, useMemo } from "react";
import Header from "./components/header.jsx";
import SearchBar from "./components/searchbar.jsx";
import NoteForm from "./components/note_form.jsx";
import NotesGrid from "./components/notes_grid.jsx";

const NotesApp = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [editingId, setEditingId] = useState(null);
    const [editingNote, setEditingNote] = useState({ title: "", content: "" });
    const [errors, setErrors] = useState({ title: "", content: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNotes = useMemo(() => {
        if (!searchTerm.trim()) return notes;
        return notes.filter(
            (n) =>
                n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                n.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notes, searchTerm]);

    const addNote = () => {
        const newErrors = { title: "", content: "" };
        if (!newNote.title.trim()) newErrors.title = "Title is required";
        if (!newNote.content.trim()) newErrors.content = "Content is required";
        setErrors(newErrors);
        if (newErrors.title || newErrors.content) return;

        const note = {
            id: Date.now(),
            title: newNote.title.trim(),
            content: newNote.content.trim(),
            createdAt: new Date().toLocaleDateString(),
        };
        setNotes([...notes, note]);
        setNewNote({ title: "", content: "" });
        setErrors({ title: "", content: "" });
    };

    const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));
    const startEdit = (note) => { setEditingId(note.id); setEditingNote({ title: note.title, content: note.content }); };
    const saveEdit = () => {
        if (!editingNote.title.trim() || !editingNote.content.trim()) return;
        setNotes(notes.map((n) => (n.id === editingId ? { ...n, title: editingNote.title.trim(), content: editingNote.content.trim() } : n)));
        setEditingId(null); setEditingNote({ title: "", content: "" });
    };
    const cancelEdit = () => { setEditingId(null); setEditingNote({ title: "", content: "" }); };
    const clearSearch = () => setSearchTerm("");

    const highlightText = (text, searchTerm) => {
        if (!searchTerm.trim()) return text;
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <mark key={i} style={{ backgroundColor: "#fff3cd" }}>{part}</mark> : part
        );
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%)" }}>
            <Header notesCount={notes.length} filteredCount={filteredNotes.length} searchTerm={searchTerm} />
            <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} filteredCount={filteredNotes.length} />
                <NoteForm newNote={newNote} setNewNote={setNewNote} errors={errors} addNote={addNote} />
                <NotesGrid
                    notes={filteredNotes}
                    editingId={editingId}
                    editingNote={editingNote}
                    setEditingNote={setEditingNote}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    cancelEdit={cancelEdit}
                    deleteNote={deleteNote}
                    highlightText={highlightText}
                    searchTerm={searchTerm}
                    clearSearch={clearSearch}
                />
            </div>
        </div>
    );
};

export default NotesApp;
