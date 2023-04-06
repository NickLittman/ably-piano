"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: "",
      },
    });


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Ably Piano</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-between"
      >
        <Nav className="mr-auto">
          <Nav.Link as={Link} href="/">
            Home
          </Nav.Link>
          {isAuthenticated && (
            <>
              {/* <Nav.Link as={Link} href="loggedin/chat">
                Chat
              </Nav.Link> */}
              <Nav.Link as={Link} href="loggedin/music">
                Music
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {user ? (
            <NavDropdown
              title={
                // <img src={user.picture} alt="Profile" width={50} height={50} />
                <Image src={user.picture || "/profile_image.png"} alt="Profile" width={50} height={50} className="rounded-circle img-fluid profile-picture mb-3 mb-md-0" referrerPolicy="no-referrer" />
              }
            >
              <NavDropdown.Item as={Link} href="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logoutWithRedirect()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

// export default function NavBar({ props }: NavbarProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

//   const logoutWithRedirect = () =>
//     logout({
//       logoutParams: {
//         returnTo: window?.location.origin,
//       },
//     });

//   const isReallyAuthenticated = isAuthenticated && user;

//   const pages = [
//     { name: "Home", href: "/", auth: false },
//     { name: "Chat", href: "/chat", auth: true },
//   ];

//   return (
//     <Navbar {...props}>
//       <NavbarBrand href="/">ably thingy</NavbarBrand>
//       <NavbarToggler onClick={toggle} />
//       <Collapse isOpen={isOpen} navbar>
//         <Nav className="me-auto" navbar>
//           {pages.map(
//             ({ name, href, auth }) =>
//               auth && (
//                 <NavItem key={name}>
//                   <NavLink href={href} tag={Link}>
//                     {name}
//                   </NavLink>
//                 </NavItem>
//               )
//           )}
//           {!isReallyAuthenticated && (
//             <NavItem>
//               <Button
//                 id="qsLoginBtn"
//                 color="primary"
//                 block
//                 onClick={() => loginWithRedirect({})}
//               >
//                 Log in
//               </Button>
//             </NavItem>
//           )}
//           {isReallyAuthenticated && (
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 <img
//                   src={user.picture}
//                   alt="Profile"
//                   className="nav-user-profile rounded-circle"
//                   width="50"
//                   height="50"
//                 />
//               </DropdownToggle>
//               <DropdownMenu>
//                 <DropdownItem header>{user.name}</DropdownItem>
//                 <DropdownItem
//                   tag={Link}
//                   href="/profile"
//                   className="dropdown-profile"
//                   activeClassName="router-link-exact-active"
//                 >
//                   <FontAwesomeIcon icon="user" className="mr-3" /> Profile
//                 </DropdownItem>
//                 <DropdownItem onClick={() => logoutWithRedirect()}>
//                   <FontAwesomeIcon icon="power-off" className="mr-3" /> Log out
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           )}
//         </Nav>
//       </Collapse>
//     </Navbar>
//   );
// }

// const NavBar = () => {
//   const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   const logoutWithRedirect = () =>
//     logout({
//       logoutParams: {
//         returnTo: window?.location.origin,
//       },
//     });

//   const isReallyAuthenticated = isAuthenticated && user;

//   return (
//     <div className="nav-container">
//       <Navbar color="light" light expand="md">
//         <Container>
//           <NavbarBrand className="logo" />
//           <NavbarToggler onClick={toggle} />
//           <Collapse isOpen={isOpen} navbar>
//             <Nav className="mr-auto" navbar>
//               <NavItem>
//                 <NavLink tag={Link} href="/">
//                   Home
//                 </NavLink>
//               </NavItem>
//               {isReallyAuthenticated && (
//                 <NavItem>
//                   <Link href="/chat">
//                     <NavLink>Chat</NavLink>
//                   </Link>
//                 </NavItem>
//               )}
//             </Nav>
//             <Nav className="d-none d-md-block" navbar>
//               {!isReallyAuthenticated && (
//                 <NavItem>
//                   <Button
//                     id="qsLoginBtn"
//                     color="primary"
//                     className="btn-margin"
//                     onClick={() => loginWithRedirect()}
//                   >
//                     Log in
//                   </Button>
//                 </NavItem>
//               )}
//               {isReallyAuthenticated && (
//                 <UncontrolledDropdown nav inNavbar>
//                   <DropdownToggle nav caret id="profileDropDown">
//                     <img
//                       src={user.picture}
//                       alt="Profile"
//                       className="nav-user-profile rounded-circle"
//                       width="50"
//                       height="50"
//                     />
//                   </DropdownToggle>
//                   <DropdownMenu>
//                     <DropdownItem header>{user.name}</DropdownItem>
//                     <DropdownItem
//                       tag={Link}
//                       href="/profile"
//                       className="dropdown-profile"
//                       activeClassName="router-link-exact-active"
//                     >
//                       <FontAwesomeIcon icon="user" className="mr-3" /> Profile
//                     </DropdownItem>
//                     <DropdownItem
//                       id="qsLogoutBtn"
//                       onClick={() => logoutWithRedirect()}
//                     >
//                       <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
//                       out
//                     </DropdownItem>
//                   </DropdownMenu>
//                 </UncontrolledDropdown>
//               )}
//             </Nav>
//             {!isReallyAuthenticated && (
//               <Nav className="d-md-none" navbar>
//                 <NavItem>
//                   <Button
//                     id="qsLoginBtn"
//                     color="primary"
//                     block
//                     onClick={() => loginWithRedirect({})}
//                   >
//                     Log in
//                   </Button>
//                 </NavItem>
//               </Nav>
//             )}
//             {isReallyAuthenticated && (
//               <Nav
//                 className="d-md-none justify-content-between"
//                 navbar
//                 style={{ minHeight: 170 }}
//               >
//                 <NavItem>
//                   <span className="user-info">
//                     <img
//                       src={user.picture || "/profile_image.png"}
//                       alt="Profile"
//                       className="nav-user-profile d-inline-block rounded-circle mr-3"
//                       width="50"
//                       height="50"
//                     />
//                     <h6 className="d-inline-block">{user.name}</h6>
//                   </span>
//                 </NavItem>
//                 <NavItem>
//                   <FontAwesomeIcon icon="user" className="mr-3" />
//                   <NavLink tag={Link} href="/profile">
//                     Profile
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <FontAwesomeIcon icon="power-off" className="mr-3" />
//                   {/* this is a fake link */}
//                   <NavLink
//                     to="#"
//                     id="qsLogoutBtn"
//                     onClick={() => logoutWithRedirect()}
//                   >
//                     Log out
//                   </NavLink>
//                 </NavItem>
//               </Nav>
//             )}
//           </Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// };

// export default NavBar;
