import { Navbar, Nav } from "react-bootstrap";
import Logo from "../assets/images/logo.png";

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect style={{paddingLeft: "1vw"}}>
            <Navbar.Brand href="/">
                <img src={Logo} alt="bomb" height="30vh" />{" "}BombPot
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav activeKey={window.location.pathname}>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/preflop-charts">Preflop Charts</Nav.Link>
                    <Nav.Link href="/equity-calculator">Equity Calculator</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
