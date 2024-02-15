import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import FileCard from './components/FileCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [pdfText, setPdfText] = useState('placeholder')
  const [searchText, setSearchText] = useState('');
  const [userFiles, setUserFiles] = useState([])

  const handleSearchClick = () => {
    console.log('Search clicked')
    if (searchText == '') return;
    fetch(
      'http://localhost:4000/search/' + searchText,
      {
        method: 'GET'
      }
    ).then(res => res.json())
      .then(files => {
        console.log(files);
        setUserFiles(files);
      });

  }
  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  }
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    fetch(
      'http://localhost:4000/parse',
      {
        method: 'POST',
        body: formData,
      }
    ).then(res => res.text())
      .then((text) => {
        console.log('Received pdf text' + text);
        setPdfText(text);
      })
  };

  return (
    <div className="App">
      <div>
        <input type="file" name="pdfFile" onChange={changeHandler} />
        <div>
        <Button onClick={handleSubmission} variant="primary" size='sm' style={{margin: '5px 0 20px 0'}}>Upload</Button>
        </div>
        <div>
          <input type="text" onChange={handleSearchInput} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      {userFiles.map(file => <FileCard file={file} />)}
    </div>
  );
}

export default App;
