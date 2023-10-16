import { useRouter } from 'next/router';
import React from 'react';

const ImagePage = () => {
  const router = useRouter();
  const { imageId } = router.query;

  return (
    <div>
      <h1>Image Page for Image ID {imageId}</h1>
      {/* Add content for the image page here */}
    </div>
  );
};

export default ImagePage;
