// src/components/Header.jsx
import React from "react";

const Header = ({ notesCount, filteredCount, searchTerm }) => {
    return (
        <div className="bg-white border-bottom" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <div className="container-fluid" style={{ maxWidth: "1200px" }}>
                <div className="d-flex justify-content-between align-items-center py-4">
                    <h1 className="h2 fw-bold text-dark mb-0">Notes App</h1>
                    <div className="d-flex align-items-center">
                        <span className="text-muted small">
                            Total Notes: <span className="fw-semibold text-primary">{notesCount}</span>
                            {searchTerm && (
                                <span className="ms-2">
                                    | Showing:{" "}
                                    <span className="fw-semibold text-success">{filteredCount}</span>
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
