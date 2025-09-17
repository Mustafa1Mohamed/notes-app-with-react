// src/components/NotesGrid.jsx
import React from "react";
import NoteCard from "./note_card";

const NotesGrid = ({ notes, editingId, editingNote, setEditingNote, startEdit, saveEdit, cancelEdit, deleteNote, highlightText, searchTerm, clearSearch }) => {
    if (notes.length === 0) {
        return (
            <div className="text-center py-5">
                {searchTerm ? (
                    <>
                        <h3 className="h5 text-muted mb-2">No notes found</h3>
                        <p className="text-muted">
                            No notes match your search for <span className="fw-semibold">"{searchTerm}"</span>
                        </p>
                        <button onClick={clearSearch} className="btn btn-outline-primary btn-sm">
                            Clear Search
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="h5 text-muted mb-2">No notes yet</h3>
                        <p className="text-muted">Create your first note to get started!</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="row g-4">
            {notes.map((note) => (
                <div key={note.id} className="col-12 col-md-6 col-lg-4">
                    <NoteCard
                        note={note}
                        editingId={editingId}
                        editingNote={editingNote}
                        setEditingNote={setEditingNote}
                        startEdit={startEdit}
                        saveEdit={saveEdit}
                        cancelEdit={cancelEdit}
                        deleteNote={deleteNote}
                        highlightText={highlightText}
                        searchTerm={searchTerm}
                    />
                </div>
            ))}
        </div>
    );
};

export default NotesGrid;
