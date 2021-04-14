import { useEffect, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import axios from "axios";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [original, setOriginal] = useState(null);
  const onFileInputChange = (event) => {
    // console.log(event.currentTarget);
    const { files } = event.target;
    console.log(files);
    setFiles(Array.from(files));
    setOriginal(files);
  };
  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const onDrop = (file) => {
    setFiles(Array.from(file));
    setOriginal(file);
  };

  const PostFile = () => {
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    axios
      .post("http://localhost:8000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res));
  };
  useEffect(() => {
    console.log(files.length);
  }, [files]);
  return (
    <div className="App">
      <FileDrop onTargetClick={onTargetClick} onDrop={(file) => onDrop(file)}>
        <div className="card mx-auto text-center">
          <div className="lead" style={{ marginTop: "40%" }}>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              type="file"
              className="hidden"
            />
            {files.length > 0
              ? files.map((item) => <div>{item.name}</div>)
              : "Drag and Drop"}
            {/* Drag and Drop */}
          </div>
        </div>
      </FileDrop>
      <div
        className="button-upload text-center mx-auto py-2"
        onClick={PostFile}
      >
        Upload
      </div>
    </div>
  );
}

export default App;
