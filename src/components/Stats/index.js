import React, { useEffect, useState } from 'react';
import { Grid, StampCard } from 'tabler-react';
import { getJoutes, getPlayers } from '../../controllers/API';

const Stats = () => {
    const [joutes, setJoutes] = useState([]);
    const [players, setPlayers] = useState([]);

    const sortJoutesByPlayers = ({ players, joutes }) => {
        const arrToReturn = [];
       for (const player of players) {
           let arrOfJoutes = [];
           joutes.map((joute) => {
               if (joute.loser === player.firstname || joute.winner === player.firstname){
                   arrOfJoutes.push(joute)
               }
           })
           arrToReturn.push(arrOfJoutes);
       }
       console.log('RESULTAT ???', arrToReturn);
    }
    useEffect(() => {
        const fetch = async () => {
            const result = await getJoutes();
            const allPlayers = await getPlayers();
            setJoutes(result);
            setPlayers(allPlayers);
            sortJoutesByPlayers({ joutes: result, players: allPlayers })
            console.log(allPlayers);    
            console.log(result);
        }
        fetch();
    }, [])

    return (
        <Grid.Col md={12}>
            <Grid.Row style={{ width: '100%'}}>
                <Grid.Col md={6}>
                    <StampCard
                        color="orange"
                        icon="award"
                        header={
                            <span>
                            {joutes.length} <small>Joutes jouées</small>
                            </span>
                        }
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <StampCard
                        color="green"
                        icon="shopping-cart"
                        header={
                            <span>
                            78 <small>Orders</small>
                            </span>
                        }
                        footer={"32 shipped"}
                    />
                </Grid.Col>
            </Grid.Row>
            <Grid.Row style={{ width: '100%'}}>
                <Grid.Col md={6}>
                    <StampCard
                        color="green"
                        icon="shopping-cart"
                        header={
                            <a href="#">
                            78 <small>Orders</small>
                            </a>
                        }
                        footer={"32 shipped"}
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <StampCard
                        color="green"
                        icon="shopping-cart"
                        header={
                            <a href="#">
                            78 <small>Orders</small>
                            </a>
                        }
                        footer={"32 shipped"}
                    />
                </Grid.Col>
            </Grid.Row>
        </Grid.Col  >
    );
}

export default Stats;