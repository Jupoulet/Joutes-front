import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Tag } from 'tabler-react';
import { getJoutes } from '../../../controllers/API';
const StyledContainerJoutes = styled.div`
    padding: 2em;
    display: flex;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const ContainerJoutes = ({ listOfJoutes }) => {
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

    return (
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