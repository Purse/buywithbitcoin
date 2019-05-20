import styled from 'styled-components';

const Product = styled.div`
  padding: 20px 0;
  background: #fff;
  border-bottom: 1px solid #DADEE0;
  
  &:last-child {
    border-bottom-width: 0px;
  }
  
  & img {
    width: 100%;
  }
  
  & .product-actions {
    color: #1A2831;
    text-align: center;
    padding-top: 20px;
    font-size: 13px;
    
    & span {
      cursor: pointer;
      &:nth-child(2) {
        padding: 0 5px;
      }
    }
  }
  
  & .product-meta {
    & .orig-price {
      text-decoration: line-through;
      padding-right: 10px;
    }
    & .discounted-price {
      color: #B70101;
    }
    & p {
      overflow: hidden;
      font-size: 13px;
      position: relative; 
      line-height: 1.2em;
      max-height: 3.6em; 
      text-align: left;  
      margin-right: -1em;
      padding-right: 1em;
      color: #1A2831;
      
      &:before {
        content: '...';
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 1em;
        height: 1em;
        margin-top: 0.2em;
        background: white;
      }
    }
  }
  jj
`;

export default Product;