import { useContext, useEffect } from "react"
import "./index.css"
// import { sampleProducts } from "./data/data"
import { LinkContainer } from "react-router-bootstrap"
import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Store } from "../Store"

function App() {
  //get from store
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" })
  }

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    //redirect to /signin
    window.location.href = "/signin"
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Ronen amazon</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <Link to={"/cart"} className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {/* <a href="/signin" className="nav-link">
              Sign In
            </a> */}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to={"/orderhistory"}>
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
