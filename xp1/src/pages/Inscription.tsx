import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Values } from '../components/firebase/Users'

const Inscription = () => {

    let navigate = useNavigate()

    let onFinish = async (values: unknown) => {
        try {
            let valuesProps = values as Values

        } catch (error) {

        }
    }

    return (
        <Backy>
            <Formulaire>
                <AForm>
                    <FormSection>
                        <FormTitle>
                            Nom
                        </FormTitle>

                        <AFormItem label="name" name="name" noStyle>
                            <AInput placeholder='Name ..' />
                        </AFormItem>
                    </FormSection>

                    <FormSection>
                        <FormTitle>
                            Email
                        </FormTitle>

                        <AFormItem label="email" name="email" noStyle>
                            <AInput placeholder='Email ..' />
                        </AFormItem>
                    </FormSection>

                    <FormSection>
                        <FormTitle>
                            Password
                        </FormTitle>

                        <AFormItem label="password" name="password" noStyle>
                            <AInput placeholder='Password ..' />
                        </AFormItem>
                    </FormSection>

                    <ASubmitBtn htmlType='submit'>
                        Inscription
                    </ASubmitBtn>

                </AForm>
            </Formulaire>
        </Backy>
    )
}

export default Inscription

//ANTD MEF

let FormSection = styled.div``

let FormTitle = styled.div`
color: white;
font-size: 1.2em;
display: flex;
justify-content: flex-start;
align-items: center;
`

//ANTD MECA

let AForm = styled(Form)``

let AFormItem = styled(Form.Item)``

let AInput = styled(Input)``

let ASubmitBtn = styled(Button)`
margin-top: 15px;
`

let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

let Formulaire = styled.div`
background-color: #000000bb;
padding: 5% 10%;
border-radius: 10px;
font-size: 5.5em;
color: white;
box-shadow: 9px 8px 8px black;
`
