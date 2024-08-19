import { useState ,useEffect} from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3000/upload", formData)
      .then((res) =>console.log(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
    .get("http://localhost:3000/get-images")
    .then((res) =>setImages(res.data[1].image))
    .catch((err) => console.error(err));

  }, []);
console.log(images);
  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[1])} />
      <button onClick={handleUpload}>Upload</button>
      <br/>
      <img src={`http://localhost:3000/Images/`+images} alt="uploaded image" />
    </>
  );
}

export default App;
