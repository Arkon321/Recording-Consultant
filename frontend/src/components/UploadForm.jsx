import { useState } from "react";
import axios from "axios";

function UploadForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    clientName: "",
    consultantName: "",
    duration: "",
    notes: ""
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/api/recordings",
        formData
      );

      setForm({
        title: "",
        clientName: "",
        consultantName: "",
        duration: "",
        notes: ""
      });

      setFile(null);

      refresh();

      alert("Recording uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-lg">

      <h3 className="mb-4 text-center">
        Upload Consultation Recording
      </h3>

      {/* Title */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
        <label htmlFor="title">Title</label>
      </div>

      {/* Client Name */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="clientName"
          value={form.clientName}
          onChange={(e) =>
            setForm({ ...form, clientName: e.target.value })
          }
          required
        />
        <label htmlFor="clientName">Client Name</label>
      </div>

      {/* Consultant Name */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="consultantName"
          value={form.consultantName}
          onChange={(e) =>
            setForm({ ...form, consultantName: e.target.value })
          }
          required
        />
        <label htmlFor="consultantName">Consultant Name</label>
      </div>

      {/* Duration */}
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="duration"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />
        <label htmlFor="duration">Duration (minutes)</label>
      </div>

      {/* Notes */}
      <div className="form-floating mb-3">
        <textarea
  className="form-control"
  id="notes"
  style={{ height: "120px" }}
  value={form.notes}
  onChange={(e) =>
    setForm({ ...form, notes: e.target.value })
  }
  placeholder=" "   // 👈 IMPORTANT FIX
/>
        <label htmlFor="notes">Notes</label>
      </div>

      {/* File */}
      <div className="mb-3">
        <input
          type="file"
          accept="audio/*,video/*"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      {/* Submit */}
      <button className="btn btn-primary w-100 py-2">
        Upload Recording
      </button>

    </form>
  );
}

export default UploadForm;