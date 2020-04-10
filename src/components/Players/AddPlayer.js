import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Page, Form, Card, Button } from 'tabler-react';
import { addPlayer } from '../../controllers/API';

const Div = styled.div`
    width: ${(props) => props.width || 'unset'};
    display: flex;
    align-items: flex-end;
    max-width: 250px;
    margin-bottom: 1em;
`;

const DivTitle = styled.div`
    padding: 2em 2em 0em 2em;
    display: flex;
    align-items: center;
`;

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

const AddPlayer = ({ setUpdate }) => {
    const [requesting, setRequesting] = useState(false);
    const [ready, setReady] =  useState(false);
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: ''
    })

    useEffect(() => {
        const fetch = async () => {
            setReady(true);
        }
        fetch();

    }, [])

    const handleChange = (e, string) => {
       setInputs({
           ...inputs,
           [string]: e.target.value
       })
    }

    const postPlayer = async () => {
        setRequesting(true);
        const post = await addPlayer(inputs);
        if (post.success) {
            setTimeout(() => {
                setRequesting(false);
                setUpdate((prev) => !prev);
            }, 1000);
        }
    }

    const isValid = (j) => {
        console.log('isValid')
    }

    const isInvalid = (j) => {

        console.log('isInvalid')
    }

    return ready &&(
        <StyledContainerJoutes>
            <Card>
                <DivTitle>
                    <Page.Title>Ajouter un joueur</Page.Title>
                </DivTitle>
                <Table>
                    <Table.Body>
                    <Table.Row>
                            <Table.Col>
                                <Div>
                                    <Form.Input label="Prenom" placeholder="Prenom" value={inputs.firstname} onChange={(e) => handleChange(e, 'firstname') }/>
                                </Div>
                            </Table.Col>
                            <Table.Col>
                                <Div>
                                    <Form.Input label="Nom" placeholder="Nom" value={inputs.lastname} onChange={(e) => handleChange(e, 'lastname') } />
                                </Div>
                            </Table.Col>
                            <Table.Col>
                                <Button loading={requesting} color="primary" onClick={postPlayer}>Ajouter</Button>
                            </Table.Col>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Card>
        </StyledContainerJoutes>
    );
}

export default AddPlayer;