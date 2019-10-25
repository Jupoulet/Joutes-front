import React from 'react';
import Joutes from '../components/Joutes/containers/containerJoutes';
import { Card, Page } from 'tabler-react'
import styled from 'styled-components';

const Div = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

const Home = () => {
    return (
        <div style={{marginTop: '2em'}}>
            <Card>
                <Div>
                    <Page.Title>Joutes</Page.Title>
                </Div>
                <Joutes />
            </Card>            
        </div>
    );
}

export default Home;