import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'




const Calendar = () => {

    let navigate = useNavigate()

    let [selectedMonth, setSelectedMonth] = useState("")
    let [selectedDay, setSelectedDay] = useState("")

    let months = [
        {
            value: "01",
            name: "Janvier"
        },
        {
            value: "02",
            name: "Février"
        },
        {
            value: "03",
            name: "Mars"
        },
        {
            value: "04",
            name: "Avril"
        },
        {
            value: "05",
            name: "Mai"
        },
        {
            value: "06",
            name: "Juin"
        },
        {
            value: "07",
            name: "Juillet"
        },
        {
            value: "08",
            name: "Aout"
        },
        {
            value: "09",
            name: "Septembre"
        },
        {
            value: "10",
            name: "Octobre"
        },
        {
            value: "11",
            name: "Novembre"
        },
        {
            value: "12",
            name: "Decembre"
        },
    ]

    let days = Array.from({ length: 31 }, (_, i) => i + 1)

    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedDay && selectedMonth) {
            navigate(`/land/${selectedMonth}/${selectedDay}`)
        } else (
            alert("Indiquez le jour et le mois")
        )
    }

    return (
        <Backy>
            <Formulaire>
                <FormulaireTitle>
                    Calendar
                </FormulaireTitle>

                <FormulaireDescription>
                    Indiquez le Jour ainsi que votre Mois de Naissance
                </FormulaireDescription>


                <SForm onSubmit={handleSubmit}>

                    <FormSection>
                        <FormTitle>
                            Mois :
                        </FormTitle>

                        <SLabel>
                            <SSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                <SOption value="">
                                    Mois
                                </SOption>

                                {
                                    months.map((month) => {
                                        return (
                                            <SOption value={month.value} key={month.name}>
                                                {month.name}
                                            </SOption>
                                        )
                                    })
                                }

                            </SSelect>
                        </SLabel>

                    </FormSection>

                    <FormSection>
                        <FormTitle>
                            Jours :
                        </FormTitle>

                        <SLabel>
                            <SSelect value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                <SOption value="">
                                    Jours
                                </SOption>

                                {
                                    days.map((day) => {
                                        return (
                                            <SOption value={day} key={day}>
                                                {day}
                                            </SOption>
                                        )
                                    })
                                }

                            </SSelect>
                        </SLabel>

                    </FormSection>

                    <SubmitBtn type='submit'>
                        Lancer
                    </SubmitBtn>
                </SForm>

            </Formulaire>
        </Backy>
    )
}

export default Calendar


//FORMULAIRE 

let SForm = styled.form``

let SLabel = styled.label``

let SSelect = styled.select`
padding: 5px 10px;
border-radius: 9px;
`

let SOption = styled.option``

let SubmitBtn = styled.button`
padding: 8px 14px;
border-radius: 10px;
font-size: 1.2em;
color: white;
background-color: #000000b5;
margin-top: 10px;
border: 1px solid white;
box-shadow: 3px 3px 9px black;
transition: 0.3s ease-in-out;

&:hover{
    transform: scale(1.01);
}
`

//Formulaire MEP

let FormSection = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 10px;
border: 1px solid white;
border-radius: 10px;
box-shadow: 3px 3px 9px black;
margin-top: 10px;


`


let FormTitle = styled.div`
margin-right: 20px;
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
color: white;
box-shadow: 9px 8px 8px black;

@media (max-width:750px){
    padding: 5% 3%;
    width: 80%;
}
`

let FormulaireDescription = styled.div`

@media (max-width:750px){
   font-size: 0.8em;
}
`

let FormulaireTitle = styled.div`
font-size: 2em;
background-color: #00000063;
padding: 2% 3%;
border-radius: 15px;
margin-bottom: 10px;
`