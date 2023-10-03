// import React from "react"
import { Col, Row } from "react-bootstrap"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import ProductItem from "../components/ProductItem"
import { Helmet } from "react-helmet-async"
import { useGetProductsQuery } from "../contexts/productHooks"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>ronen fake amazon</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product}></ProductItem>
          <p>&#8362;{product.price}</p>
        </Col>
      ))}
    </Row>
  )
}

export default HomePage
