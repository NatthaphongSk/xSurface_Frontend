import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Card = styled.div`
  width: 200px;
  height: 335px;
  flex-shrink: 0;
  border-radius: 16px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.2s ease-in-out;
  }
`;
const DotImageContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  bottom: 5px;
`;
const DotImage = styled.div`
  display: inline-block;
  width: 16px;
  height: 2px;
  z-index: 5;
  margin: 0 2px;
  border-radius: 100%;
  background-color: ${({ $isActive }) => ($isActive ? 'red' : '#d9d9d9')};
`;
const DetailContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
  height: 135px;
`;

const ProductDetail = styled.div`
  h6 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
  }
  flex-grow: 1;
`;
const ProductCost = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  font-size: 20px;
  font-weight: 600;
  color: #e13b30;
`;

const images = ['1.jpg', '2.jpg', '3.jpg'];

export default function ProductCard() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (isHover) {
      setImageIndex(1);
    } else setImageIndex(0);
  }, [isHover]);
  useEffect(() => {
    const updateImage = () => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
    if (isHover) {
      const interval = setInterval(updateImage, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [imageIndex]);
  return (
    <Card
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ImageContainer>
        <img src={images[imageIndex]} />
        <DotImageContainer>
          {images.map((el, index) => (
            <DotImage key={index} $isActive={index === imageIndex} />
          ))}
        </DotImageContainer>
      </ImageContainer>
      <DetailContainer>
        <ProductDetail>
          <h6>Product Name</h6>
          <p>Code</p>
        </ProductDetail>
        <ProductCost>฿{new Intl.NumberFormat().format(1000)}</ProductCost>
      </DetailContainer>
    </Card>
  );
}
