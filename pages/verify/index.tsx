import React, { useState, useEffect } from 'react';
import { Image, Header, Loader } from 'semantic-ui-react';
import Layout from '@components/Layout/Layout';
import { useRouter } from 'next/router';
import { useUser, useUserMutations } from '@store/user';
import { GetStaticProps } from 'next';
import ImageList from '@components/ImageList/ImageList';

export const getStaticProps: GetStaticProps = async () => {
  // Fetch not approved images
  const response = await fetch('http://localhost:3000/api/image');
  const { data: allImageList }: TAPIReumaResponse = await response.json();
  const approvedImageList = allImageList.filter((image: TImage) => image.approved);

  return {
    props: {
      imageList: approvedImageList,
    },
  };
};

const VerifyPage = ({ imageList }: { imageList: TImage[] }) => {
  const { loggedIn, approvedImages } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notApprovedImages, setNotApprovedImages] = useState<TImage[]>([]);

  const { messagesDispatch } = useUserMutations();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of approved image IDs
        const response = await fetch('http://localhost:3000/api/image');
        const { data: allImageList }: TAPIReumaResponse = await response.json();
        const notApprovedImagesList = allImageList.filter((image: TImage) => !approvedImages.includes(image.id));

        // Set the not approved images in the state
        setNotApprovedImages(notApprovedImagesList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };

    if (loggedIn) {
      // Fetch data only if the user is logged in
      fetchData();
    } else {
      messagesDispatch({
        type: 'setMessage',
        message: 'Usuario no autorizado.',
        messageType: 'error',
      });
      router.push('/');
    }
  }, [loggedIn, router, imageList]);

  return (
    <Layout>
      <section>
  <Header as="h1" textAlign="center">
    Verificar Imágenes
  </Header>
  {loading ? (
    // Show a spinner while loading
    <Loader active inline="centered" />
  ) : notApprovedImages.length > 0 ? (
    // Show the list of not approved images
    <ImageList images={notApprovedImages} />
  ) : (
    // Display a message when no images are pending
    <div>No se encontraron imágenes pendientes</div>
  )}
</section>

     

      <style jsx>{`
        figure,
        ol {
          padding: 0;
          margin: 0;
        }
        section {
            text-align: center;
            margin-bottom: 2rem;
          }
        figure {
          margin: 2rem auto 3rem;
          text-align: center;
        }
        figcaption {
          margin-top: 0.5rem;
          font-site: 0.7rem;
          color: grey;
        }

        ul {
          list-style: none;

          // Look ma! Responsive grid with no Media queries :)
          // https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          grid-gap: 4.5rem 3rem;

          // Look ma! A CSS Counter :)
          // https://moderncss.dev/totally-custom-list-styles/
          counter-reset: orderedlist;
        }
        

        li {
          position: relative;
        }
        h3:first-child {
          // why the first-child selector you may ask...
          // to gain specificity and thus avoid using '!important' :)
          padding-left: 40px;
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default VerifyPage;
