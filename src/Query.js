import {  gql } from '@apollo/client'



const COUNTRIES = gql`
  query {
    categorys {
      id
      name
    }
  }
`

const RESTARANS = gql`
  query restaran($categoryID: ID!){
    Restarans(categoryID: $categoryID) {
      id
      name
    }
  }
`
const BRANCHES = gql`
  query branche($restaranID: ID!){
    Branches(restaranID: $restaranID) {
      id
      name
    }
  }
`

const MENUS = gql`
  query menu($branchID: ID!){
    Menus(branchID: $branchID) {
      id
      name
      price
    }
  }
`

const NEW_REGION = gql`
  mutation newRestaran($name: String! $categoryID: ID! ) {
    newRestaran(name: $name categoryID: $categoryID ) {
      id
      name
    }
  }
`

const NEW_BRANCH = gql`
  mutation newBranche($name: String! $restaranID: ID! ) {
    newBranche(name: $name restaranID: $restaranID ) {
      id
      name
    }
  }
`
const NEW_MENU = gql`
mutation newMenu($name: String! $price: Int! $branchID: ID! ) {
  newMenu(name: $name price: $price branchID: $branchID ) {
    id
    name
    price
  }
}
`

const ORDERS = gql`
query {
  Orders {
    order_id
    name
    price
  }
}
`

export  {
    COUNTRIES,
    RESTARANS,
    BRANCHES,
    NEW_REGION,
    NEW_BRANCH,
    MENUS,
    NEW_MENU,
    ORDERS
}