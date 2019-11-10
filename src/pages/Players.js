import React, { useState, useEffect } from 'react';
import { Grid, Page, Card, Table, Tag } from 'tabler-react';
import { getPlayers } from '../controllers/API';
import AddPlayer from '../components/Players/AddPlayer';
import styled from 'styled-components';

const StyledContainerJoutes = styled.div`
    @media (min-width: 900px ) {
        padding: 2em;
    }
    display: flex;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const Div = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

const Players = () => {
    const [ready, setReady] = useState(false);
    const [players, setPlayers] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const allPlayers = await getPlayers();
            setPlayers(allPlayers);
            setReady(true);
        }
        fetch();

    }, [update])

    const generatePlayers = () => {
        const arrToReturn = [];
        players.map((player) => {
            arrToReturn.push(
                <Table.Row key={player.id}>
                    <Table.Col><Tag rounded>{player.id}</Tag></Table.Col>
                    <Table.Col>{player.firstname}</Table.Col>
                    <Table.Col>{player.lastname}</Table.Col>
                </Table.Row>
            )
        })
        return arrToReturn;
    }
    return ready && (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Col md={6}>
                        <StyledContainerJoutes>
                            <Card>
                                <Div>
                                    <Page.Title>Joueurs</Page.Title>
                                </Div>
                                <Table>
                                    <Table.Header>
                                        <tr>
                                            <Table.ColHeader>ID</Table.ColHeader>
                                            <Table.ColHeader>PRENOM</Table.ColHeader>
                                            <Table.ColHeader>NOM</Table.ColHeader>
                                        </tr>
                                    </Table.Header>
                                    <Table.Body>
                                        {generatePlayers()}
                                    </Table.Body>
                                </Table>
                            </Card>
                        </StyledContainerJoutes>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <AddPlayer setUpdate={setUpdate} />
                    </Grid.Col>
                </Grid.Row>
            </Grid>
        </>
    );
}

export default Players;