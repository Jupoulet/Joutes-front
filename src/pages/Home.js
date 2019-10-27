import React, { useState } from 'react';
import Joutes from '../components/Joutes/containers/containerJoutes';
import { Card, Page, Grid } from 'tabler-react'
import styled from 'styled-components';
import Modal from '../components/Modal/index'

const Div = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [showModal, setShowModal] = useState(null)
    return (
        <>
            <div style={{marginTop: '2em'}}>
                <Grid>   
                    <Grid.Row cards deck>
                        <Grid.Col md={6}>
                            <Card>
                                <Div>
                                    <Page.Title>Joutes</Page.Title>
                                </Div>
                                <Joutes />
                            </Card>            
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </div>
        </>
    );
}

export default Home;