import React, { useState, useEffect } from 'react';
import Joutes from '../components/Joutes/containers/containerJoutes';
import { Card, Page, Grid, Dimmer, Button} from 'tabler-react'
import styled from 'styled-components';
import Modal from '../components/Modal/index'
import AddJoute from '../components/Joutes/AddJoute.js';
import Stats from '../components/Stats/index.js'
import { getJoutes } from '../controllers/API';

const Div = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

const Home = () => {
    const [showModal, setShowModal] = useState(null)
    const [listOfJoutes, setListOfJoutes] = useState([]);
    const [ready, setReady] = useState(false);
    const [plusClicked, setPlusClicked] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const joutes = await getJoutes();
            setListOfJoutes(joutes.reverse());
            setReady(true);
        }
        fetch();

    }, [])
    const handleClick = () => setPlusClicked(!plusClicked)
    return (
        <>
            <div style={{marginTop: '2em'}}>
                <Grid>
                    <div style={{marginBottom: '1em'}}>
                        <Grid.Row md={12}>
                            <Grid.Col md={1}>
                                <Button icon={plusClicked ? 'minus' : 'plus'} color="primary" outline onClick={handleClick} >Ajouter</Button>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                    {plusClicked ? 
                        <Grid.Row md={12}>
                            <Grid.Col md={12}>
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
                                {/* <Card>
                                    <Div>
                                        <Page.Title>Joutes</Page.Title>
                                    </Div>
                                    {ready &&
                                        <Joutes listOfJoutes={listOfJoutes} />
                                        ||
                                        <Dimmer active loader/>
                                    }
                                </Card>             */}
                            </Grid.Col>
                            {/* <Grid.Col md={6}>
                                    <Stats />
                            </Grid.Col> */}
                        </Grid.Row> 
                    :null}
                    <div style={{marginTop: '1em'}}>
                        <Grid.Row md={12}>
                                <Stats />
                        </Grid.Row>
                    </div>
                    
                </Grid>
            </div>
        </>
    );
}

export default Home;