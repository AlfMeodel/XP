import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUsers, UserResponse, Values } from '../components/firebase/Users'
import { useDispatch } from 'react-redux'
import { AfficherSpiner } from '../components/redux/chargementSlice'
import { Login } from '../components/redux/protectedSlice'
import { FaCircleInfo } from 'react-icons/fa6'

const Connexion = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [ouvertureInfo, setOuvertureInfo] = useState(false)

    let interrupteurBulleInfo = () => {
        setOuvertureInfo(!ouvertureInfo)
    }

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
                <AForm onFinish={onFinish} layout="vertical">
                    <FormMainTitle>
                        <h2>Connexion</h2>
                        <OverInfo onClick={interrupteurBulleInfo}>
                            <FaCircleInfo />
                        </OverInfo>
                    </FormMainTitle>
                    <OverBulleInfo ouvertureInfo={ouvertureInfo}>
                        <OverBulleInfoTitle>
                            <strong> Connexion sans inscription : </strong>
                        </OverBulleInfoTitle>
                        <OverBulleInfoSection>
                            <strong>nom</strong> : test22@gmail.com
                        </OverBulleInfoSection>
                        <OverBulleInfoSection>
                            <strong> password </strong>: 22
                        </OverBulleInfoSection>
                    </OverBulleInfo>
                    <FormSection>
                        <FormTitle>
                            Email
                        </FormTitle>
                        <AFormItem
                            name="email"
                            rules={[
                                { type: 'email', message: 'L\'adresse email n\'est pas valide!' },
                                { required: true, message: 'Veuillez saisir votre email!' }
                            ]}
                        >
                            <AInput placeholder='Email ..' />
                        </AFormItem>
                    </FormSection>
                    <FormSection>
                        <FormTitle>
                            Mot de passe
                        </FormTitle>
                        <AFormItem
                            name="password"
                            rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                        >
                            <AInput placeholder='Mot de passe ..' type="password" />
                        </AFormItem>
                    </FormSection>
                    <ASubmitBtn htmlType='submit' ghost>
                        Connexion
                    </ASubmitBtn>
                    <FormLink to="/inscription" key="inscriptionBtn">
                        Pas encore de compte ? <strong> Inscrivez-vous </strong>
                    </FormLink>
                </AForm>
            </Formulaire>
        </Backy>
    )
}

export default Connexion

let OverBulleInfoTitle = styled.div`
color: white;
`

let OverBulleInfo = styled.div<{ ouvertureInfo: boolean }>`
transition: 0.3s ease-in-out;
display: ${(props: { ouvertureInfo: boolean }) => props.ouvertureInfo ? "flex" : "none"};
padding: 5% 10%;
border-radius: 5px;
justify-content: flex-start;
align-items: center;
flex-direction: column;
border: 1px dashed white;
`

let OverBulleInfoSection = styled.div`
width: 100%;
background-color: #bababa;
box-shadow: 4px 4px 4px #0000005d;
padding: 4px 10px;
margin-top: 5px;
border-radius: 8px;
display: flex;
justify-content: flex-start;
align-items: center; 
`

let OverInfo = styled.div`
font-size: 2.1em;
color: white;
display: flex;
justify-content: center;
align-items: center;
transition: 0.3s ease-in-out;
margin-left: 20px;
&:hover{
    transform: scale(1.05);
}
`

let FormMainTitle = styled.div`
background-color: #00000055;
box-shadow:inset 4px 4px 4px black;
color: white;
padding: 3%;
border-radius: 8px;
margin-bottom: 20px;
display: flex;
justify-content: center;
align-items: center;
`

let FormLink = styled(Link)`
text-decoration: none;
color: white;
background-color: #0f8496;
margin-top: 15px;
padding: 5px 10px;
border-radius: 8px;
`

let FormSection = styled.div``

let FormTitle = styled.div`
color: white;
font-size: 1.2em;
display: flex;
justify-content: flex-start;
align-items: center;
`

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
