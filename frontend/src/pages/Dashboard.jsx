import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

import { getNotes, createNotes, updateNotes, deleteNotes } from "../services/api";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const response = await getNotes();

      setNotes(response.data.notes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const openModal = () => {
    setSelectedNote(null);

    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNote(null);

    setShowModal(false);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedNote) {
        await updateNotes(
          selectedNote.id,

          formData,
        );
      } else {
        await createNotes(formData);
      }

      closeModal();

      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);

    setShowModal(true);
  };

  const handleDelete = async (note) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmDelete) return;

    try {
      await deleteNotes(note.id);

      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout openModal={openModal}>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : notes.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-stickies display-1 text-secondary"></i>

            <h3 className="mt-4">No Notes Yet</h3>

            <p>
              Click <strong>Add Note</strong> to create your first note.
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {notes.map((note) => (
            <div key={note.id} className="col-lg-3 col-md-6">
              <NoteCard
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      <NoteModal
        show={showModal}
        closeModal={closeModal}
        selectedNote={selectedNote}
        saveNote={handleSave}
      />
    </DashboardLayout>
  );
}

export default Dashboard;
