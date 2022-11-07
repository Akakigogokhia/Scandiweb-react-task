import { gql } from '@apollo/client';

export const GET_DATA = gql`
  {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
