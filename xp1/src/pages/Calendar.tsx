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

let SSelect = styled.select``

let SOption = styled.option``

let SubmitBtn = styled.button``

//Formulaire MEP

let FormSection = styled.div``

let FormTitle = styled.div``

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
`
