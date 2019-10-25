import React from 'react';
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
            <Nav.Item value="Joutes" icon="award" type="div" href="/" />
            <Nav.Item value="Joueurs" icon="users" type="div" href="/users" />
        </Nav>
    );
}

export default Navbar;