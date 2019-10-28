import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Tag, Form, Dropdown, Button } from 'tabler-react';
import { getJoutes, getPlayers, postJoute } from '../../../controllers/API';
const StyledContainerJoutes = styled.div`
    padding: 2em;
    display: flex;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const Div = styled.div`
    ${(props) => {
        return props.minimize ? ` @media (max-width: 600px) { width: 35px; }` : ''
    }}
    width: ${(props) => props.width || 'unset'};
    display: flex;
    align-items: center;
    max-width: 250px;
    margin-bottom: 1em;
`;

const ContainerJoutes = () => {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [requesting, setRequesting] = useState(false);
    const [listOfJoutes, setListOfJoutes] = useState([]);
    const [ready, setReady] = useState(false);
    const J1Ref = useRef(null);
    const J2Ref = useRef(null);
    const [players, setPlayers] = useState({
        j1: {
            name: '',
            sets: 0
        },
        j2: {
            name: '',
            sets: 0
        },
        winner: {}
    })

    useEffect(() => {
        const fetch = async () => {
            const joutes = await getJoutes();
            const allPlayers = await getPlayers();
            setListOfPlayers(allPlayers);
            setListOfJoutes(joutes.reverse());
            setReady(true);
        }
        fetch();

    }, [])
    const generateTitles = () => {
        return (
            <Table.Header>
                <tr>
                    <Table.ColHeader>ID</Table.ColHeader>
                    <Table.ColHeader>JOUEURS</Table.ColHeader>
                    <Table.ColHeader>SCORE</Table.ColHeader>
                    <Table.ColHeader>VAINQUEUR</Table.ColHeader>
                    <Table.ColHeader></Table.ColHeader>
                </tr>
             </Table.Header>
        )
    }
    const handleClick = (player, oneOrTwo) => {
        setPlayers({
            ...players,
            [oneOrTwo]: {
                ...players[oneOrTwo],
                name: player.firstname,
                id: player.id
            }
        })
        if(oneOrTwo === 'j1') {
            J1Ref.current.state.isOpen = !J1Ref.current.state.isOpen;
        } else {
            J2Ref.current.state.isOpen = !J2Ref.current.state.isOpen;
        }
    }

    const handleChange = (e, oneOrTwo) => {
        setPlayers({
            ...players,
            [oneOrTwo]: {
                ...players[oneOrTwo],
                sets: e.target.value / 1
            },
            winner: e.target.value == 3 ? {
                name: players[oneOrTwo].name,
                id: players[oneOrTwo].id,
                sets: e.target.value / 1
            } : players.winner
        })
    }

    const addJoute = async () => {
        if (requesting) { return }
        setRequesting(true);
        if (!players.winner.id) { return; }
        const loser = [players.j1, players.j2].find((player) => player.sets !== 3);
        const res = await postJoute({
            winner_id: players.winner.id,
            loser_id: loser.id,
            loser_sets: loser.sets
        })
        if (res) {
            setPlayers({
                j1: {
                    name: '',
                    sets: 0
                },
                j2: {
                    name: '',
                    sets: 0
                },
                winner: {}
            })
            setListOfJoutes((prev) => {
                return [
                    {
                        id: prev.length +1,
                        loser: loser.name,
                        score: { winner: 3, loser: loser.sets },
                        winner: players.winner.name
                    },
                    ...prev
                ]
            })
            setTimeout(() => {
                setRequesting(false);
            }, 1000)
        }
    }

    const generateListOfPlayers = (type) => {
        const arrToReturn = [];
        listOfPlayers.map((player) => {
            arrToReturn.push(
                <Dropdown.Item onClick={() => handleClick(player, type)} key={player.id} >
                    {player.firstname}
                </Dropdown.Item>
            )
        })
        return arrToReturn;
    }

    const generateRows = () => {
        const arrToReturn = [];
        listOfJoutes.map((joute) => {
            arrToReturn.push(
                <Table.Row>
                    <Table.Col><Tag rounded>{joute.id}</Tag></Table.Col>
                    <Table.Col>{joute.winner} <Tag color="orange" rounded>vs</Tag> {joute.loser}</Table.Col>
                    <Table.Col>{joute.score.winner} - {joute.score.loser}</Table.Col>
                    <Table.Col><Tag color="green">{joute.winner}</Tag></Table.Col>
                </Table.Row>
            );
        });
        return arrToReturn;
    }

    return ready && (
        <StyledContainerJoutes>
            <Table>
                <Table.Header>
                    <tr>
                        <Table.ColHeader>JOUEURS</Table.ColHeader>
                        <Table.ColHeader>SCORE</Table.ColHeader>
                        <Table.ColHeader>VAINQUEUR</Table.ColHeader>
                    </tr>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                        <Table.Col>
                            <Div>
                                <Button.Dropdown className="responsive-btn" ref={J1Ref} color="primary">
                                    {generateListOfPlayers('j1')}
                                </Button.Dropdown>
                                <Form.Input placeholder="Joueur 1" value={players.j1.name || ''} readOnly />
                            </Div>
                            <Div>
                                <Button.Dropdown className="responsive-btn" ref={J2Ref} color="primary">
                                    {generateListOfPlayers('j2')}
                                </Button.Dropdown>
                                <Form.Input placeholder="Joueur 1" value={players.j2.name || ''} readOnly />
                            </Div>
                        </Table.Col>
                        <Table.Col>
                            <Div minimize={true} width='70px' >
                                <Form.Input type="number" max={players.j2.sets === 3 ? 2 : 3} min="0" onChange={(e) => { handleChange(e, 'j1') }} />
                            </Div>  
                            <Div minimize={true} width='70px' >
                                <Form.Input type="number" max={players.j1.sets === 3 ? 2 : 3} min="0" onChange={(e) => { handleChange(e, 'j2') }} />
                            </Div>
                        </Table.Col>
                        <Table.Col>
                            <Div>
                                <Form.Input value={players.winner.name || ''}/>
                            </Div>
                            <Div>
                                <Button loading={requesting} color="primary" onClick={addJoute}>Ajouter</Button>
                            </Div>
                        </Table.Col>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Table>
                {generateTitles()}
                <Table.Body>
                    {generateRows()}
                </Table.Body>
            </Table>
        </StyledContainerJoutes>
    );
}

export default ContainerJoutes;