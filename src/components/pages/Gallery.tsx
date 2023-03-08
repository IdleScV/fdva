import { Heading, Box } from "@chakra-ui/react";
import { useState } from "react";
import { CustomImage, images, slides, thumbnails, videos } from "../Images";
import { Gallery as GalleryComponent } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const allImages = [...thumbnails, ...images];
  const allSlides = [...videos, ...slides];

  const handleClick = (index: number, item: CustomImage) => setIndex(index);

  return (
    <Box
      p={{
        base: "1rem",
        md: "2rem",
      }}
      minH={"calc(100vh - 64px)"}
      backgroundColor={"gray.500"}
      display="flex"
      flexDirection="column"
      textAlign={{ base: "center", md: "left" }}
    >
      <Heading>Gallery</Heading>
      <Box>
        <GalleryComponent
          images={allImages}
          onClick={handleClick}
          enableImageSelection={false}
        />
        <Lightbox
          plugins={[Video, Fullscreen, Captions]}
          slides={allSlides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          video={{
            controls: true,
            playsInline: true,
            autoPlay: true,
            loop: true,
          }}
        />
      </Box>
    </Box>
  );
};
export default Gallery;
