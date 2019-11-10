import React, { useEffect, useState } from 'react';
import { Grid, StampCard, colors, Card } from 'tabler-react';
import { getJoutes, getPlayers } from '../../controllers/API';
import C3Chart from "react-c3js";


const Stats = () => {
    const [joutes, setJoutes] = useState([]);
    const [players, setPlayers] = useState([]);
    const [joutesByPlayers, setJoutesByPlayers] = useState({})

    const sortJoutesByPlayers = ({ players, joutes }) => {
        let gamers = {};
        let sortedJoutes = joutes.reduce ((result, game) => {
            gamers = [game.winner, game.loser].sort ()
            if (!result[`${gamers[0]}_${gamers[1]}`]) {
                result[`${gamers[0]}_${gamers[1]}`] = []
            }
        
            result[`${gamers[0]}_${gamers[1]}`].push (game)
        
            return result
        }, { })
       setJoutesByPlayers(sortedJoutes);
    }
    useEffect(() => {
        const fetch = async () => {
            const result = await getJoutes();
            const allPlayers = await getPlayers();
            setJoutes(result);
            setPlayers(allPlayers);
            sortJoutesByPlayers({ joutes: result, players: allPlayers })
        }
        fetch();
    }, [])
    const generateCharts = () => {
        const arrToReturn = [];
        Object.entries(joutesByPlayers).map((jouteByPlayer) => {
            let { refPlayer, refPlayer2, joutesWon, joutesLost } = {
                refPlayer: joutesByPlayers[jouteByPlayer[0]][0].winner,
                refPlayer2: joutesByPlayers[jouteByPlayer[0]][0].loser,
                joutesWon: jouteByPlayer[1].filter((j) => joutesByPlayers[jouteByPlayer[0]][0].winner === j.winner ).length,
                joutesLost: jouteByPlayer[1].filter((j) => joutesByPlayers[jouteByPlayer[0]][0].winner === j.loser ).length
            }
            arrToReturn.push(
                <Grid.Col sm={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>Victoires : {jouteByPlayer[0].split('_').join(' - ')}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "14rem" }}
                      data={{
                        columns: [
                          [`${refPlayer}: ${joutesWon}`, (joutesWon * 100 / jouteByPlayer[1].length).toFixed(0)],
                          [`${refPlayer2}: ${joutesLost} `, (joutesLost * 100 / jouteByPlayer[1].length).toFixed(0)],
                        ],
                        type: "donut", // default type of chart
                        // colors: {
                        //   [`${refPlayer} ${joutesWon} Victoires`]: colors["orange-dark"],
                        //   [`${refPlayer} ${joutesLost} Victoires`]: colors["blue-light"],
                        // }
                      }}
                      legend={{
                        show: true, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            )
        })
        return arrToReturn;
    }
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
                {generateCharts()}
            </Grid.Row>
        </Grid.Col  >
    );
}

export default Stats;