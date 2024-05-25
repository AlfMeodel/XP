import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CreateUsers, LoginUsers, UserResponse, Values } from '../components/firebase/Users'
import { useDispatch } from 'react-redux'
import { AfficherSpiner } from '../components/redux/chargementSlice'

const Connexion = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    let onFinish = async (values: unknown) => {
        try {
            let valuesProps = values as Values
            dispatch(AfficherSpiner(true))
            let response = await LoginUsers(valuesProps) as UserResponse
            dispatch(AfficherSpiner(false))

            if (response.validation) {
                message.success(response.message)
                navigate("/")
            } else {
                throw new Error(response.message)
            }

        } catch (error: any) {
            message.error(error.message)
        }
    }

    return (
        <Backy>
            <Formulaire>
                <AForm onFinish={onFinish}>

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
                        Connexion
                    </ASubmitBtn>

                </AForm>
            </Formulaire>
        </Backy>
    )
}

export default Connexion

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
