import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import Logo from "../assets//logo.png";

function NavigationBar(){
    const state = useSelector((state) => state);
    
    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect style={{paddingLeft: "1vw"}}>
            <Navbar.Brand href="/">
                <img src={Logo} alt="bomb" height="30vh" />{" "}PokerTools.com
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="me-auto" activeKey={window.location.pathname}>
                    <Nav.Link href="/home">Home</Nav.Link>
                    {state.user.active ?
                    <>
                        <Nav.Link href="/preflop-charts">Preflop Charts</Nav.Link>
                        <Nav.Link href="/equity-calculator">Equity Calculator</Nav.Link>
                    </>
                    : <></>}
                </Nav>
                {state.user.verified ?
                <Nav>
                    <Nav.Link href="/settings" style={{padding: 0, marginRight: "1em", fontSize: "1.5em"}}>&#9881;</Nav.Link>
                </Nav>
                : <></>}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
