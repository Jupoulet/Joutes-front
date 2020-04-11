import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, StampCard, Card, Avatar, Button } from 'tabler-react';
import { getJoutes, getPlayers } from '../../controllers/API';
import Joutes from '../../components/Joutes/containers/containerJoutes';


const WrapperStat = styled.div`
    display: flex;
    height: 3em;
    align-items: center;
    width: 50%;
    @media (max-width: 600px) {
      width: 100%;
    }
`

const ProgressBar = styled.div`
  width: ${props => props.width}%;
  height: 80%;
  background-color: ${props => props.width < 50 ? 'indianred' : 'darkseagreen'};
  color: white;
  text-align: center;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
`

const Stats = () => {
    const [joutes, setJoutes] = useState([]);
    const [players, setPlayers] = useState([]);
    const [joutesByPlayers, setJoutesByPlayers] = useState({})
    const [showMore, setShowMore] = useState({})

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
        
       setShowMore(Object.keys(sortedJoutes).reduce((total, key) => {
        return {
          ...total,
          [key]: false
        }
       }, {}))
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
    const handleShowMore = (key) => {
      setShowMore({ ...setShowMore, [key]: !showMore[key] })
    }
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
                <Grid.Col width={window.innerWidth > 800 ?  6 : 12} key={jouteByPlayer[0]}>
                <Card>
                  <Card.Header>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                      <Card.Title>
                          <span>{jouteByPlayer[0].split('_').join(' - ')}</span>
                      </Card.Title>
                      <Avatar color="blue">{joutesLost + joutesWon}</Avatar>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <WrapperStat>
                        <span style={{width: "65px"}}>{`${refPlayer}:`}</span>
                        <ProgressBar width={(joutesWon * 100 / jouteByPlayer[1].length).toFixed(0)}>{(joutesWon * 100 / jouteByPlayer[1].length).toFixed(0)}% ({joutesWon})</ProgressBar>
                      </WrapperStat>
                      <WrapperStat>
                        <span style={{width: "65px"}}>{`${refPlayer2}:`}</span>
                        <ProgressBar width={(joutesLost * 100 / jouteByPlayer[1].length).toFixed(0)}>{(joutesLost * 100 / jouteByPlayer[1].length).toFixed(0)}% ({joutesLost})</ProgressBar>
                      </WrapperStat>
                    </div>
                    <div style={{marginTop: "1em"}}>
                      <Button icon={showMore[jouteByPlayer[0]] ? "minus" : "plus"} color="secondary" onClick={() => handleShowMore(jouteByPlayer[0])}>Détails</Button>
                      {showMore[jouteByPlayer[0]] ? <Joutes listOfJoutes={joutesByPlayers[jouteByPlayer[0]]}/> : null}
                    </div>
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
                <Grid.Col md={12}>
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
            </Grid.Row>
            <Grid.Row md={12}>
              {generateCharts()}
            </Grid.Row>
        </Grid.Col  >
    );
}

export default Stats;