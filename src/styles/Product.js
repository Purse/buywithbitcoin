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
    clear: both;
    margin: 15px 0;
    position: relative;
    font-size: 13px;

    input,
    textarea {
      border: 1px solid #eeeeee;
      box-sizing: border-box;
      margin: 0;
      outline: none;
      padding: 10px;
    }

    input[type="button"] {
      -webkit-appearance: button;
      cursor: pointer;
      background-color: #eeeeee;
      min-width: 18px;
      transition: all 300ms ease;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    .button-minus,
    .button-plus {
      font-weight: bold;
      height: 38px;
      padding: 0;
      width: 18px;
      position: relative;
    }

    .quantity-field {
      position: relative;
      height: 38px;
      left: -6px;
      text-align: center;
      width: 42px;
      display: inline-block;
      font-size: 13px;
      resize: vertical;
    }

    .button-plus {
      left: -13px;
    }

    input[type="number"] {
      -moz-appearance: textfield;
      -webkit-appearance: none;
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
    & .product-title {
      cursor: pointer;
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
`;

export default Product;
