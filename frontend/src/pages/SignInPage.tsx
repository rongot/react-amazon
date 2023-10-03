import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { useSigninMutation } from "../contexts/userHook"
import { toast } from "react-toastify"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox"

function SignInPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectUrl = new URLSearchParams(search).get("redirect")
  const redirect = redirectUrl ? redirectUrl : "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSigninMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await signin({
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
  useEffect(() => {
    //if user exists =all ready loged in
    if (userInfo) {
      navigate(redirect)
    }
    // second params on use effect need to list all values inside the parameter
  }, [userInfo, navigate, redirect])

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            //onchange update the email
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Sign In
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignInPage
