import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const NotesApp = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [editingNote, setEditingNote] = useState({ title: '', content: '' });
    const [errors, setErrors] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // Filter notes based on search term
    const filteredNotes = useMemo(() => {
        if (!searchTerm.trim()) {
            return notes;
        }

        return notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notes, searchTerm]);

    // Add a new note
    const addNote = () => {
        const newErrors = { title: '', content: '' };

        if (!newNote.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!newNote.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);

        if (newErrors.title || newErrors.content) {
            return;
        }

        const note = {
            id: Date.now(),
            title: newNote.title.trim(),
            content: newNote.content.trim(),
            createdAt: new Date().toLocaleDateString()
        };

        setNotes([...notes, note]);
        setNewNote({ title: '', content: '' });
        setErrors({ title: '', content: '' });
    };

    // Delete a note
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        if (editingId === id) {
            setEditingId(null);
        }
    };

    // Start editing a note
    const startEdit = (note) => {
        setEditingId(note.id);
        setEditingNote({ title: note.title, content: note.content });
    };

    // Save edited note
    const saveEdit = () => {
        if (!editingNote.title.trim() || !editingNote.content.trim()) {
            return;
        }

        setNotes(notes.map(note =>
            note.id === editingId
                ? { ...note, title: editingNote.title.trim(), content: editingNote.content.trim() }
                : note
        ));
        setEditingId(null);
        setEditingNote({ title: '', content: '' });
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditingNote({ title: '', content: '' });
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
    };

    // Highlight search term in text
    const highlightText = (text, searchTerm) => {
        if (!searchTerm.trim()) return text;

        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ?
                <mark key={index} style={{ backgroundColor: '#fff3cd', padding: '0 2px' }}>{part}</mark> :
                part
        );
    };

    const customStyles = {
        body: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        headerShadow: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        cardHover: {
            transition: 'box-shadow 0.2s ease-in-out',
            cursor: 'default'
        },
        emptyStateIcon: {
            width: '96px',
            height: '96px',
            stroke: '#9e9e9e',
            strokeWidth: '1'
        },
        inputFocus: {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 0.2rem rgba(99, 102, 241, 0.25)'
        },
        searchContainer: {
            position: 'relative'
        },
        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            pointerEvents: 'none'
        },
        clearButton: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#6c757d',
            cursor: 'pointer',
            padding: '0',
            fontSize: '18px'
        }
    };

    return (
        <div style={customStyles.body}>
            {/* Header */}
            <div className="bg-white border-bottom" style={customStyles.headerShadow}>
                <div className="container-fluid" style={{ maxWidth: '1200px' }}>
                    <div className="d-flex justify-content-between align-items-center py-4">
                        <h1 className="h2 fw-bold text-dark mb-0">Notes App</h1>
                        <div className="d-flex align-items-center">
                            <span className="text-muted small">
                                Total Notes: <span className="fw-semibold text-primary">{notes.length}</span>
                                {searchTerm && (
                                    <span className="ms-2">
                                        | Showing: <span className="fw-semibold text-success">{filteredNotes.length}</span>
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-4" style={{ maxWidth: '1200px' }}>
                {/* Search Bar */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-8">
                                <div style={customStyles.searchContainer}>
                                    <Search
                                        size={18}
                                        style={customStyles.searchIcon}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search notes by title or content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ paddingLeft: '45px', paddingRight: searchTerm ? '45px' : '12px' }}
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={clearSearch}
                                            style={customStyles.clearButton}
                                            title="Clear search"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                {searchTerm && (
                                    <div className="text-muted small">
                                        Found {filteredNotes.length} result{filteredNotes.length !== 1 ? 's' : ''}
                                        {searchTerm && (
                                            <span> for "<span className="fw-semibold">{searchTerm}</span>"</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Note Form */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h2 className="card-title h5 d-flex align-items-center mb-4">
                            <Plus className="me-2 text-primary" size={24} />
                            Add New Note
                        </h2>

                        <div className="row g-3 mb-4">
                            <div className="">
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder="Note title..."
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            <div className="">
                                <textarea
                                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                    placeholder="Note content..."
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                    rows="3"
                                    style={{ resize: 'none' }}
                                />
                                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                            </div>
                        </div>

                        <button
                            onClick={addNote}
                            className="btn btn-primary d-flex align-items-center"
                        >
                            <Plus size={16} className="me-2" />
                            Add Note
                        </button>
                    </div>
                </div>

                {/* Notes Grid */}
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="text-muted mb-4">
                            <svg
                                className="mx-auto"
                                style={customStyles.emptyStateIcon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        {searchTerm ? (
                            <>
                                <h3 className="h5 text-muted mb-2">No notes found</h3>
                                <p className="text-muted">
                                    No notes match your search for "<span className="fw-semibold">{searchTerm}</span>"
                                </p>
                                <button
                                    onClick={clearSearch}
                                    className="btn btn-outline-primary btn-sm"
                                >
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
                ) : (
                    <div className="row g-4">
                        {filteredNotes.map((note) => (
                            <div key={note.id} className="col-12 col-md-6 col-lg-4">
                                <div
                                    className="card shadow-sm h-100"
                                    style={customStyles.cardHover}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)'}
                                >
                                    {editingId === note.id ? (
                                        // Editing Mode
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
                                                style={{ resize: 'none' }}
                                            />
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={saveEdit}
                                                    className="btn btn-success flex-fill d-flex align-items-center justify-content-center"
                                                >
                                                    <Save size={14} className="me-1" />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="btn btn-secondary flex-fill d-flex align-items-center justify-content-center"
                                                >
                                                    <X size={14} className="me-1" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Display Mode
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="card-title text-dark mb-0" style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}>
                                                    {highlightText(note.title, searchTerm)}
                                                </h5>
                                                <small className="text-muted ms-2 text-nowrap">{note.createdAt}</small>
                                            </div>

                                            <p className="card-text text-muted flex-grow-1" style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: '1.5'
                                            }}>
                                                {highlightText(note.content, searchTerm)}
                                            </p>

                                            <div className="d-flex gap-2 pt-2 border-top">
                                                <button
                                                    onClick={() => startEdit(note)}
                                                    className="btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center"
                                                >
                                                    <Edit2 size={14} className="me-1" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteNote(note.id)}
                                                    className="btn btn-outline-danger flex-fill d-flex align-items-center justify-content-center"
                                                >
                                                    <Trash2 size={14} className="me-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesApp;