import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUsers, UserResponse, Values } from '../components/firebase/Users'
import { useDispatch } from 'react-redux'
import { AfficherSpiner } from '../components/redux/chargementSlice'
import { Login } from '../components/redux/protectedSlice'

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
                localStorage.setItem("user", JSON.stringify({
                    ...response.dataUser, password: ""
                }))
                dispatch(Login())

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
                    <FormMainTitle>
                        Connexion
                    </FormMainTitle>

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

                    <ASubmitBtn htmlType='submit' ghost>
                        Connexion
                    </ASubmitBtn>
                    <FormLink to="/inscription" key="inscriptionBtn">
                        Pas encore de compte ? inscrivez vous
                    </FormLink>


                </AForm>
            </Formulaire>
        </Backy>
    )
}

export default Connexion

//ANTD MEF

let FormMainTitle = styled.div`
background-color: #00000055;
box-shadow:inset 4px 4px 4px black;
color: white;
padding: 3%;
border-radius: 8px;
font-size: 2em;
margin-bottom: 20px;
`

let FormLink = styled(Link)`
text-decoration: none;
color: white;
margin-top: 15px;
`

let FormSection = styled.div``

let FormTitle = styled.div`
color: white;
font-size: 1.2em;
display: flex;
justify-content: flex-start;
align-items: center;
`

//ANTD MECA

let AForm = styled(Form)`
display: flex;
flex-direction: column;
`

let AFormItem = styled(Form.Item)``

let AInput = styled(Input)`
box-shadow:inset 2px 2px 4px black;

`

let ASubmitBtn = styled(Button)`
margin-top: 35px;
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
background-color: #0000006e;
padding: 2% 5%;
border-radius: 15px;
font-size: 5.5em;
color: white;
box-shadow: 6px 6px 9px #000000d4, inset -3px -3px 4px #1e1e1e87;
border: 2px solid #ffffff63;

@media (max-width:750px){
    padding: 5% 10%;
}
`
