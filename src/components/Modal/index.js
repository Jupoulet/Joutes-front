import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Dropdown } from 'tabler-react'
import { isJSXAttribute, nullLiteral } from '@babel/types';

const AllWindow = styled.div`
    height: 100%;
    width: calc(100% + 2em);
    right: -2em;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    position: absolute;
`;

const Test = styled.div`
    width: 400px;
    height: 300px;
    background-color: white;
    border-radius: 20px;
`;

const Modal = ({template, setShowModal}) => {
    const [players, setPlayers] = useState({
        j1: null,
        j2: nullLiteral
    })
    return (
        <AllWindow>
            <Test>
            <Form onSubmit={(event) => console.log(event.target.name + 'clicked')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Input readOnly value="coucou"></Form.Input>
                    <Button.Dropdown color="primary">
                        <Dropdown.Item>
                            News
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Messages
                        </Dropdown.Item>
                        <Dropdown.ItemDivider />
                        <Dropdown.Item>
                            Edit Profile
                        </Dropdown.Item>
                    </Button.Dropdown>
                </div>
                <Button type='submit' value='Submit' />
            </Form>
            </Test>
        </AllWindow>
    );
}

export default Modal;