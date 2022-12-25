import React from 'react';
import { CloudUpload } from 'react-bootstrap-icons';
import Image from 'next/image';

import styles from './ImageGallery.module.scss';

export default function ImageGallery(props) {
  const fileRef = React.createRef();
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    (async function() {
      try {
        const response = await fetch(`http://localhost:3001/articles/${props.articleId}/images`);
        const images = await response.json();
        setImages(images);
      }
      catch (error) {
        // todo
      }
    })();
  }, []);

  function onAddImageClick(event) {
    fileRef.current.click();
  }

  function onFileChange(event) {
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(`http://localhost:3001/articles/${props.articleId}/images`, {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <>
      <p>Select an existing image below or click Add to upload.</p>
      <div className={styles['image-gallery__images']}>
        <div className={`${styles["image-gallery__add-image"]} ${styles['image-gallery__image']}`} onClick={onAddImageClick}>
          <CloudUpload />
          Add
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
        </div>
        {images.map((image) => {
          return (
            <div key={image.id} className={styles['image-gallery__image']}>
              <Image src={image.url} alt="Gallery image" width={128} height={96} />
            </div>
          );
        })}
      </div>
    </>
  );
}
