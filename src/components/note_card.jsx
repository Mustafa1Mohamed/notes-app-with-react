// src/components/NoteCard.jsx
import React from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

const NoteCard = ({ note, editingId, editingNote, setEditingNote, startEdit, saveEdit, cancelEdit, deleteNote, highlightText, searchTerm }) => {
    return (
        <div className="card shadow-sm h-100" style={{ transition: "box-shadow 0.2s", cursor: "default" }}>
            {editingId === note.id ? (
                <div className="card-body">
                    <input
                        type="text"
                        value={editingNote.title}
                        onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                        className="form-control mb-3"
                    />
                    <textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                        rows="4"
                        className="form-control mb-4"
                        style={{ resize: "none" }}
                    />
                    <div className="d-flex gap-2">
                        <button onClick={saveEdit} className="btn btn-success flex-fill d-flex align-items-center justify-content-center">
                            <Save size={14} className="me-1" /> Save
                        </button>
                        <button onClick={cancelEdit} className="btn btn-secondary flex-fill d-flex align-items-center justify-content-center">
                            <X size={14} className="me-1" /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title text-dark mb-0" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {highlightText(note.title, searchTerm)}
                        </h5>
                        <small className="text-muted ms-2 text-nowrap">{note.createdAt}</small>
                    </div>
                    <p className="card-text text-muted flex-grow-1" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", lineHeight: "1.5" }}>
                        {highlightText(note.content, searchTerm)}
                    </p>
                    <div className="d-flex gap-2 pt-2 border-top">
                        <button onClick={() => startEdit(note)} className="btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center">
                            <Edit2 size={14} className="me-1" /> Edit
                        </button>
                        <button onClick={() => deleteNote(note.id)} className="btn btn-outline-danger flex-fill d-flex align-items-center justify-content-center">
                            <Trash2 size={14} className="me-1" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteCard;
