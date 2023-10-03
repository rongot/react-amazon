import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { useSignUpMutation } from "./userHook"
import { toast } from "react-toastify"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox"

function SignupPage() {
  const navigate = useNavigate()
  //useLocation Returns the current location object, which represents the current URL in web browsers.
  //get the query string for value redirct
  const { search } = useLocation()
  const redirectUrl = new URLSearchParams(search).get("redirect")
  const redirect = redirectUrl ? redirectUrl : "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signup, isLoading } = useSignUpMutation()

  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      navigate(redirect)
    }
    // second params on use effect need to list all values inside the parameter
  }, [userInfo, navigate, redirect])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      const data = await signup({
        name,
        email,
        password,
      })
      dispatch({ type: "USER_SIGNIN", payload: data })
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            placeholder="enter name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Comfirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" disabled={isLoading}>
            Sign Up
          </Button>
        </div>
        {isLoading && <LoadingBox />}
        <div className="mb-3">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignupPage
