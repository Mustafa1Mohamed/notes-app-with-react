// src/components/NoteForm.jsx
import React from "react";
import { Plus } from "lucide-react";

const NoteForm = ({ newNote, setNewNote, errors, addNote }) => {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h2 className="card-title h5 d-flex align-items-center mb-4">
                    <Plus className="me-2 text-primary" size={24} /> Add New Note
                </h2>
                <div className="row g-3 mb-4">
                    <div>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            placeholder="Note title..."
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    <div>
                        <textarea
                            className={`form-control ${errors.content ? "is-invalid" : ""}`}
                            placeholder="Note content..."
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            rows="3"
                            style={{ resize: "none" }}
                        />
                        {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                    </div>
                </div>
                <button onClick={addNote} className="btn btn-primary d-flex align-items-center">
                    <Plus size={16} className="me-2" /> Add Note
                </button>
            </div>
        </div>
    );
};

export default NoteForm;
