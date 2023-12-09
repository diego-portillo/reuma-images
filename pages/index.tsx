import React, { useEffect, useState } from 'react';
import { useUser } from '@store/user';
import { GetStaticProps } from 'next';
import fetch from 'isomorphic-unfetch';
import Layout from '@components/Layout/Layout';
import ImageList from '@components/ImageList/ImageList';

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/image');
  const { data: allImageList }: TAPIReumaResponse = await response.json();
  const approvedImageList = allImageList.filter((image: TImage) => image.approved);

  return {
    props: {
      imageList: approvedImageList,
    },
  };
};

const HomePage = ({ imageList }: { imageList: TImage[] }) => {
  const { approvedImages } = useUser(); 
  const [filteredImages, setFilteredImages] = useState<TImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filter the images based on the approvedImages array
    const filtered = imageList.filter((image) => approvedImages.includes(image.id));
    
    setFilteredImages(filtered);
    setLoading(false);
  }, [imageList, approvedImages]);

  return (
    <Layout>
     {loading ? (
  // Show a spinner while loading
  <div className="spinner">Loading...</div>
) : filteredImages.length > 0 ? (
  // Render the ImageList when there are filtered images
  <ImageList images={filteredImages} />
) : (
  // Display a message when there are no filtered images
  <div style={{textAlign: 'center', padding:'6rem', fontSize:'1.5rem'}}>No se encontraron imágenes...</div>
)}
      <style jsx>{`
        section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px; /* Adjust the height as needed */
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;
