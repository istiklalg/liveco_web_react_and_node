import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  // CarouselCaption
} from "reactstrap";

// function getItemList() {
//   let url = "http://localhost:3000/sliders";
//   fetch(url, (err, rows) => {
//     if(err){
//       console.error("slider parçaları alınamadı ! ", err.message);
//       return []
//     }else{
//       return rows;
//     }
//   });
// }

var items = [
  {
    id: 1,
    src: "slider1.png",
    altText: "LIV-ECO Görsel 1",
    caption: "Slide 1",
  },
  {
    id: 2,
    src: "slider2.png",
    altText: "LIV-ECO Görsel 2",
    caption: "Slide 2",
  },
  {
    id: 3,
    src: "slider3.png",
    altText: "LIV-ECO Görsel 3",
    caption: "Slide 3",
  },
  {
    id: 4,
    src: "slider4.png",
    altText: "LIV-ECO Görsel 4",
    caption: "Slide 4",
  },
  {
    id: 5,
    src: "slider5.png",
    altText: "LIV-ECO Görsel 5",
    caption: "Slide 5",
  },
];

// var items = []

// const getItemList = () => {
//   let url = "http://localhost:3000/sliders";
//   fetch(url).then((rows) => {
//     items = rows;
//   });
// };

const SliderGalery = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img
          className="d-block w-100 sliderImage"
          src={`${process.env.PUBLIC_URL}/images/permanent/${item.src}`}
          alt={item.altText}
        />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval="8000"
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText=" "
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText=" "
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default SliderGalery;
