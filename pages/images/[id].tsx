import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout/Layout';
import ImageSummary from '@components/ImageSummary/ImageSummary';

import { Loader } from 'semantic-ui-react';

import { useUser, useUserMutations } from '@store/user';

// ... (previous imports)

const ImagePage = () => {
  const router = useRouter();
  const [image, setImage] = useState<TImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [showApprovalButton, setShowApprovalButton] = useState(true);
  const { messagesDispatch, addApprovedImage, removeApprovedImage } = useUserMutations();
  const { approvedImages, loggedIn } = useUser();

  const handleApproval = async (approve: boolean) => {
    try {
      setApprovalLoading(true);
      setShowApprovalButton(false);

      if (approve) {
        addApprovedImage(image?.id || '');
        localStorage.setItem('approvedImages', JSON.stringify([...approvedImages, image?.id || '']));
        router.push('/verify');
      } else {
        removeApprovedImage(image?.id || '');
        localStorage.setItem('approvedImages', JSON.stringify(approvedImages.filter(id => id !== image?.id)));
        router.push('/');
      }
    } catch (error) {
      messagesDispatch({
        type: 'setMessage',
        message: 'Ocurrió un error al validar la imagen.',
        messageType: 'error',
      });
      router.push('/');
    } 
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/image/${router.query.id}`
        );
        const image: TImage = await response.json();
        if (loggedIn && !approvedImages.includes(image.id)) {
          setImage(image);
        } else if (image && image.id && approvedImages.includes(image.id)) {
          setImage(image);
        } else {
          messagesDispatch({
            type: 'setMessage',
            message: 'Usuario no autorizado.',
            messageType: 'error',
          });
          router.push('/');
        }
      } catch (error) {
        messagesDispatch({
          type: 'setMessage',
          message: 'Ocurrió un error al buscar la imagen.',
          messageType: 'error',
        });
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    // Fetch the image when the component mounts
    fetchImage();
  }, [router.query.id, messagesDispatch, router]);

  return (
    <Layout>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        image ? (
          <>
            <ImageSummary image={image} />
            {loggedIn && (
              <div style={{ marginTop: '20px' }}>
                {approvalLoading ? (
                  <Loader active inline="centered" />
                ) : (
                  <>
                    {showApprovalButton && (
                      <>
                        {approvedImages.includes(image.id || '') ? (
                          <button
                            onClick={() => handleApproval(false)}
                            style={{ borderRadius: '0.2rem', padding: '1rem', border: 'none', fontSize: '1rem', backgroundColor: 'red', color: 'white', display: 'block', margin: '1rem auto' }}
                          >
                            Desaprobar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproval(true)}
                            style={{ borderRadius: '0.2rem', padding: '1rem', border: 'none', fontSize: '1rem', backgroundColor: 'green', color: 'white', display: 'block', margin: '1rem auto' }}
                          >
                            Aprobar
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <div>No se encontró la imagen</div>
        )
      )}
    </Layout>
  );
};

export default ImagePage;
