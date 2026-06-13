import UploadForm from "../components/UploadForm";

function UploadPage() {
  return (
    <div className="container mt-4">
      <UploadForm refresh={() => {}} />
    </div>
  );
}

export default UploadPage;