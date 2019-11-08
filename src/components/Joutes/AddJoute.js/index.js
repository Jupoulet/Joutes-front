import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Tag, Form, Dropdown, Button } from 'tabler-react';
import { getPlayers, postJoute } from '../../../controllers/API';

const Div = styled.div`
    ${(props) => {
        return props.minimize ? ` @media (max-width: 600px) { width: 35px; }` : ''
    }}
    width: ${(props) => props.width || 'unset'};
    display: flex;
    align-items: flex-end;
    max-width: 250px;
    margin-bottom: 1em;
`;

const StyledContainerJoutes = styled.div`
    padding: 2em;
    display: flex;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const AddJoute = ({ setListOfJoutes }) => {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [requesting, setRequesting] = useState(false);
    const [ready, setReady] =  useState(false);
    const J1Ref = useRef(null);
    const J2Ref = useRef(null);
    const [players, setPlayers] = useState({
        j1: {
            name: '',
            sets: ''
        },
        j2: {
            name: '',
            sets: ''
        },
        winner: {}
    })

    useEffect(() => {
        const fetch = async () => {
            const allPlayers = await getPlayers();
            setListOfPlayers(allPlayers);
            setReady(true);
        }
        fetch();

    }, [])

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

    const handleChange = (e, oneOrTwo) => {
        console.log(e.target.value);
        if (e.target.value.length > 0 && !/[0-9]/.test(e.target.value)) { return; }
        setPlayers({
            ...players,
            [oneOrTwo]: {
                ...players[oneOrTwo],
                sets: e.target.value && e.target.value / 1 || ''
            },
            winner: e.target.value == 3 ? {
                name: players[oneOrTwo].name,
                id: players[oneOrTwo].id,
                sets: e.target.value && e.target.value / 1 || ''
            } : players.winner
        })
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
                    sets: ''
                },
                j2: {
                    name: '',
                    sets: ''
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

    const isValid = (j) => {
        console.log('players', players[j].sets);
        if ([0, 1, 2, 3].includes(players[j].sets)) {
            return true
        }
        return false;
    }

    const isInvalid = (j) => {

        if (players[j].sets !== '' && ![0, 1, 2, 3].includes(players[j].sets)){
            return 'Si pas bien';
        }
        return '';
    }

    return ready &&(
        <StyledContainerJoutes>
            <Table>
                {/* <Table.Header>
                    <tr>
                        <Table.ColHeader>JOUEURS</Table.ColHeader>
                        <Table.ColHeader>SCORE</Table.ColHeader>
                        <Table.ColHeader>VAINQUEUR</Table.ColHeader>
                    </tr>
                </Table.Header> */}
                <Table.Body>
                <Table.Row>
                        <Table.Col>
                            <Div>
                                <Button.Dropdown className="responsive-btn" ref={J1Ref} color="primary">
                                    {generateListOfPlayers('j1')}
                                </Button.Dropdown>
                                <Form.Input label="Joueur 1" placeholder="Joueur 1" value={players.j1.name || ''} readOnly />
                            </Div>
                            <Div>
                                <Button.Dropdown className="responsive-btn" ref={J2Ref} color="primary">
                                    {generateListOfPlayers('j2')}
                                </Button.Dropdown>
                                <Form.Input label="Joueur 2" placeholder="Joueur 1" value={players.j2.name || ''} readOnly />
                            </Div>
                        </Table.Col>
                        <Table.Col>
                            <Div minimize={true} width='70px' >
                                <Form.Input label="Sets j1" error={isInvalid('j1')} valid={isValid('j1')} value={players.j1.sets} onChange={(e) => { handleChange(e, 'j1') }} />
                            </Div>  
                            <Div minimize={true} width='70px' >
                                <Form.Input label="Sets j2" error={isInvalid('j2')} valid={isValid('j2')} value={players.j2.sets} onChange={(e) => { handleChange(e, 'j2') }} />
                            </Div>
                        </Table.Col>
                        <Table.Col>
                            <Div>
                                <Form.Input label="Vainqueur" value={players.winner.name || ''} readOnly />
                            </Div>
                            <Div>
                                <Button loading={requesting} color="primary" onClick={addJoute}>Ajouter</Button>
                            </Div>
                        </Table.Col>
                    </Table.Row>
                </Table.Body>
            </Table>
        </StyledContainerJoutes>
    );
}

export default AddJoute;