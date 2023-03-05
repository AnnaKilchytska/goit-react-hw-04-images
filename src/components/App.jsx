import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Searchform from './Searchbar';
import requestImages from '../services/api';
import Button from './Button';
import Loader from './Loader';

function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  let [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    async function makeRequest() {
      try {
        if (request === '') {
          return;
        }
        setStatus('pending');

        const result = await requestImages(request, page);

        const { data: allData } = result;
        const { hits: newImages } = allData;

        if (newImages.length === 0) {
          setStatus('error');
          return;
        } else {
          setImages(i => {
            return page === 1 ? newImages : [...i, ...newImages];
          });
          setStatus('success');
          setShowBtn(page < Math.ceil(allData.totalHits / 12));
        }
      } catch (error) {
        setStatus('error');
      }
    }

    makeRequest();
  }, [request, page]);

  const handleFormSubmit = image => {
    setRequest(image);
    setImages([]);
    setStatus('idle');
    setPage(1);
    setShowBtn(false);
  };

  const handleButtonClick = () => {
    return setPage((page += 1));
  };

  return (
    <>
      <Searchform onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <h1 className="message">Start searching for images</h1>
      )}
      {status === 'error' && (
        <h1 className="message">Oops, something went wrong. Try again!</h1>
      )}

      {status === 'pending' && <Loader />}

      <div>
        <ImageGallery images={images} status={status} page={page} />
        {showBtn && <Button onClick={handleButtonClick} />}
      </div>
    </>
  );
  // }
}

export default App;
