import {mount} from 'cypress/react'
import {SelectCommodity} from "../../../src/pages/commodity/SelectCommodity";

describe('SelectCommodity.cy.ts', () => {
  it('playground', () => {
    cy.intercept("GET", "/api/1.0/commodities", {
      statusCode: 200,
      body: [
        {
          idOfPlatform: "123456",
          pic: "https://gd1.alicdn.com/imgextra/i1/1775515242/O1CN01Y0e8Ri1oaswZpgNzw_!!1775515242.jpg_400x400.jpg",
          price: "23.00",
          shopName: "张三的小店"

        },
        {
          idOfPlatform: "123457",
          pic: "https://gd1.alicdn.com/imgextra/i1/1775515242/O1CN01Y0e8Ri1oaswZpgNzw_!!1775515242.jpg_400x400.jpg",
          price: "50.00",
          shopName: "张三的小店"
        },
        {
          idOfPlatform: "123457",
          pic: "https://gd1.alicdn.com/imgextra/i1/1775515242/O1CN01Y0e8Ri1oaswZpgNzw_!!1775515242.jpg_400x400.jpg",
          price: "50.00",
          shopName: "张三的小店"
        },
        {
          idOfPlatform: "123457",
          pic: "https://gd1.alicdn.com/imgextra/i1/1775515242/O1CN01Y0e8Ri1oaswZpgNzw_!!1775515242.jpg_400x400.jpg",
          price: "50.00",
          shopName: "张三的小店"
        },
        {
          idOfPlatform: "123457",
          pic: "https://gd1.alicdn.com/imgextra/i1/1775515242/O1CN01Y0e8Ri1oaswZpgNzw_!!1775515242.jpg_400x400.jpg",
          price: "50.00",
          shopName: "张三的小店"
        }
      ]
    })
    cy.mount(<SelectCommodity/>)
  })
})