import Layout from './components/layout';

const Gallery = ({ images }) => {
  return (
    <Layout>
      <div>
        { images.map(image => <img key={image.id} src={image.src} />) }
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const images = [
    { id: 1, src: 'http://source.unsplash.com/250x250/?nature' },
    { id: 2, src: 'http://source.unsplash.com/250x250/?water' },
    { id: 3, src: 'http://source.unsplash.com/250x250/?film' },
    { id: 4, src: 'http://source.unsplash.com/250x250/?travel' },
    { id: 5, src: 'http://source.unsplash.com/250x250/?technology' },
    { id: 6, src: 'http://source.unsplash.com/250x250/?animals' },
    { id: 7, src: 'http://source.unsplash.com/250x250/?people' },
    { id: 8, src: 'http://source.unsplash.com/250x250/?fashion' },
  ];

  return {
    props: {
      images,
    },
  };
}

export default Gallery;
