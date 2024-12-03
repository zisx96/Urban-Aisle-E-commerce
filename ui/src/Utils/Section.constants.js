export const responsive = {
    superLargeDesktop: {
      // For screens wider than 1600px
      breakpoint: { max: 4000, min: 1601 },
      items: 5,
      slidesToSlide: 1, // Slide 1 card at a time
    },
    desktop: {
      // For screens between 1024px and 1600px
      breakpoint: { max: 1600, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      // For screens between 768px and 1024px
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      // For screens smaller than 768px
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };