import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Grid } from 'tabler-react';

const itemsObjects=[
    {
      value: "Joutes",
      icon: "award",
      to: '/'
    },
    { value: "Joueurs", to: "/players", icon: 'users' },
]

const Navbar = () => {
    return (
        <Nav tabbed="true" >
            <Link to="/">
                <Nav.Item hasSubNav={false} value="Joutes" icon="award" type="div" href="/" />
            </Link>
            <Link to="/players">
                <Nav.Item hasSubNav={false} value="Joueurs" icon="users" type="div" href="/players" />
            </Link>
            
        </Nav>
    );
}

export default Navbar;