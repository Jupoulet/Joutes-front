import React, { useState, useEffect } from 'react';
import Joutes from '../components/Joutes/containers/containerJoutes';
import { Card, Page, Grid, Dimmer } from 'tabler-react'
import styled from 'styled-components';
import Modal from '../components/Modal/index'
import AddJoute from '../components/Joutes/AddJoute.js';
<<<<<<< HEAD
import Stats from '../components/Stats/index.js'
=======
import { getJoutes } from '../controllers/API';
>>>>>>> 1edf23d08aad6bb1fd0fa2f36248f252c917ddf9

const Div = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [showModal, setShowModal] = useState(null)
    const [listOfJoutes, setListOfJoutes] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const joutes = await getJoutes();
            setListOfJoutes(joutes.reverse());
            setReady(true);
        }
        fetch();

    }, [])
    return (
        <>
            <div style={{marginTop: '2em'}}>
                <Grid>
                    <Grid.Row md={12}>
                        <Grid.Col md={6}>
<<<<<<< HEAD
                            <Grid.Row cards deck>
                                <Grid.Col>
                                    <Card>
                                        <Div>
                                            <Page.Title>Ajouter votre joute</Page.Title>
                                        </Div>
                                        <AddJoute />
                                    </Card>            
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row cards deck>
                                <Grid.Col>
                                    <Card>
                                        <Div>
                                            <Page.Title>Joutes</Page.Title>
                                        </Div>
                                        <Joutes />
                                    </Card>            
                                </Grid.Col>
                            </Grid.Row>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <Grid.Row cards deck>
                                <Stats />
                            </Grid.Row>
=======
                            <Card>
                                <Div>
                                    <Page.Title>Ajouter votre joute</Page.Title>
                                </Div>
                                {ready &&
                                    <AddJoute setListOfJoutes={setListOfJoutes}/>
                                    ||
                                    <Dimmer active loader/>
                                }
                            </Card> 
                            <Card>
                                <Div>
                                    <Page.Title>Joutes</Page.Title>
                                </Div>
                                {ready &&
                                    <Joutes listOfJoutes={listOfJoutes} />
                                    ||
                                    <Dimmer active loader/>
                                }
                            </Card>            
>>>>>>> 1edf23d08aad6bb1fd0fa2f36248f252c917ddf9
                        </Grid.Col>
                    </Grid.Row> 
                </Grid>
            </div>
        </>
    );
}

export default Home;