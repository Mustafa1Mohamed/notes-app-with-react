// src/components/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, clearSearch, filteredCount }) => {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="row g-3 align-items-center">
                    <div className="col-md-8" style={{ position: "relative" }}>
                        <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }} />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search notes by title or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: "45px", paddingRight: searchTerm ? "45px" : "12px" }}
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6c757d", cursor: "pointer" }}
                                title="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <div className="col-md-4">
                        {searchTerm && (
                            <div className="text-muted small">
                                Found {filteredCount} result{filteredCount !== 1 ? "s" : ""} for{" "}
                                <span className="fw-semibold">"{searchTerm}"</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
