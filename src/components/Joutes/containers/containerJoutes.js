import React from 'react';
import styled from 'styled-components';
import { Table } from 'tabler-react';

const StyledContainerJoutes = styled.div`
    padding: 2em;
    display: flex;
    width: 100%;
    justify-content: center;
`;

const containerJoutes = () => {
    const generateTitles = () => {
        return (
            <Table.Header>
                <Table.ColHeader>ID</Table.ColHeader>
                <Table.ColHeader>JOUEURS</Table.ColHeader>
                <Table.ColHeader>SCORE</Table.ColHeader>
                <Table.ColHeader>WINNER</Table.ColHeader>
             </Table.Header>
        )
    }
    return (
        <StyledContainerJoutes>
            <Table>
                {generateTitles()}
            </Table>
        </StyledContainerJoutes>
    );
}

export default containerJoutes;