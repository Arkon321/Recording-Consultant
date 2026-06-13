import axios from "axios";

function RecordingList({ recordings, refresh }) {

  const deleteRecording = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/recordings/${id}`
      );

      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete recording");
    }
  };

  const editNotes = async (recording) => {

  const newNotes = prompt(
    "Edit Notes",
    recording.notes
  );

  if (newNotes === null) return;

  await axios.put(
    `http://localhost:5000/api/recordings/${recording.id}`,
    {
      notes: newNotes
    }
  );

  refresh();
};
  if (recordings.length === 0) {
    return (
      <div className="alert alert-info">
        No recordings uploaded yet.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">
        Recordings ({recordings.length})
      </h2>

      {recordings.map((recording) => (
        <div
          key={recording.id}
          className="card shadow-sm mb-4"
        >
          <div className="card-body">

            <h4>{recording.title}</h4>

            <p>
              <strong>Client:</strong>{" "}
              {recording.clientName}
            </p>

            <p>
              <strong>Consultant:</strong>{" "}
              {recording.consultantName}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {recording.duration} mins
            </p>

            <p>
              <strong>Uploaded:</strong>{" "}
              {new Date(recording.createdAt).toLocaleString()}
            </p>

            <details className="mb-3">
              <summary>
                View Notes
              </summary>

              <p className="mt-2">
                {recording.notes}
              </p>
            </details>

            {recording.filePath &&
            recording.filePath.toLowerCase().endsWith(".mp4") ? (

              <video
                controls
                width="100%"
                className="mb-3"
              >
                <source
                  src={`http://localhost:5000/${recording.filePath}`}
                  type="video/mp4"
                />
                Your browser does not support video.
              </video>

            ) : (

              <audio
                controls
                style={{ width: "100%" }}
                className="mb-3"
              >
                <source
                  src={`http://localhost:5000/${recording.filePath}`}
                />
                Your browser does not support audio.
              </audio>

            )}

            <div className="d-flex gap-2">

              <a
                href={`http://localhost:5000/${recording.filePath}`}
                download
                className="btn btn-success"
              >
                Download
              </a>

              <button
                className="btn btn-warning"
                onClick={() =>
                  editNotes(recording)
                }
              >
                Edit Notes
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteRecording(recording.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default RecordingList;