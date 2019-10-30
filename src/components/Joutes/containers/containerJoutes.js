import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Tag } from 'tabler-react';
import { getJoutes } from '../../../controllers/API';
import AddJoute from '../AddJoute.js/index';
const StyledContainerJoutes = styled.div`
    padding: 2em;
    display: flex;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const ContainerJoutes = () => {
    // const [listOfPlayers, setListOfPlayers] = useState([]);
    // const [requesting, setRequesting] = useState(false);
    const [listOfJoutes, setListOfJoutes] = useState([]);
    const [ready, setReady] = useState(false);
    // const J1Ref = useRef(null);
    // const J2Ref = useRef(null);
    // const [players, setPlayers] = useState({
    //     j1: {
    //         name: '',
    //         sets: 0
    //     },
    //     j2: {
    //         name: '',
    //         sets: 0
    //     },
    //     winner: {}
    // })

    useEffect(() => {
        const fetch = async () => {
            const joutes = await getJoutes();
            // const allPlayers = await getPlayers();
            // setListOfPlayers(allPlayers);
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
    // const handleClick = (player, oneOrTwo) => {
    //     setPlayers({
    //         ...players,
    //         [oneOrTwo]: {
    //             ...players[oneOrTwo],
    //             name: player.firstname,
    //             id: player.id
    //         }
    //     })
    //     if(oneOrTwo === 'j1') {
    //         J1Ref.current.state.isOpen = !J1Ref.current.state.isOpen;
    //     } else {
    //         J2Ref.current.state.isOpen = !J2Ref.current.state.isOpen;
    //     }
    // }

    // const handleChange = (e, oneOrTwo) => {
    //     setPlayers({
    //         ...players,
    //         [oneOrTwo]: {
    //             ...players[oneOrTwo],
    //             sets: e.target.value / 1
    //         },
    //         winner: e.target.value == 3 ? {
    //             name: players[oneOrTwo].name,
    //             id: players[oneOrTwo].id,
    //             sets: e.target.value / 1
    //         } : players.winner
    //     })
    // }

    // const addJoute = async () => {
    //     if (requesting) { return }
    //     setRequesting(true);
    //     if (!players.winner.id) { return; }
    //     const loser = [players.j1, players.j2].find((player) => player.sets !== 3);
    //     const res = await postJoute({
    //         winner_id: players.winner.id,
    //         loser_id: loser.id,
    //         loser_sets: loser.sets
    //     })
    //     if (res) {
    //         setPlayers({
    //             j1: {
    //                 name: '',
    //                 sets: 0
    //             },
    //             j2: {
    //                 name: '',
    //                 sets: 0
    //             },
    //             winner: {}
    //         })
    //         setListOfJoutes((prev) => {
    //             return [
    //                 {
    //                     id: prev.length +1,
    //                     loser: loser.name,
    //                     score: { winner: 3, loser: loser.sets },
    //                     winner: players.winner.name
    //                 },
    //                 ...prev
    //             ]
    //         })
    //         setTimeout(() => {
    //             setRequesting(false);
    //         }, 1000)
    //     }
    // }

    // const generateListOfPlayers = (type) => {
    //     const arrToReturn = [];
    //     listOfPlayers.map((player) => {
    //         arrToReturn.push(
    //             <Dropdown.Item onClick={() => handleClick(player, type)} key={player.id} >
    //                 {player.firstname}
    //             </Dropdown.Item>
    //         )
    //     })
    //     return arrToReturn;
    // }

    const generateRows = () => {
        const arrToReturn = [];
        listOfJoutes.map((joute) => {
            arrToReturn.push(
                <Table.Row key={joute.id}>
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
            {/* <AddJoute setListOfJoutes={setListOfJoutes} /> */}
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