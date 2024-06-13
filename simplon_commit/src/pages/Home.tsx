import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

interface Page {
    displaytitle: string;
    thumbnail?: { source: string };
    content_urls: { desktop: { page: string } };
    extract?: string;
}

interface Birthday {
    text: string;
    pages: Array<Page>;
}

const fetchBirthdays = async (month: string, day: string): Promise<Birthday[]> => {
    const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`);
    const data = await response.json();
    return data.births;
};

const fetchDescription = async (title: string): Promise<string> => {
    const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    const data = await response.json();
    return data.extract;
};

const stripHtmlTags = (str: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
};

const Home: React.FC = () => {
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const birthdayData = await fetchBirthdays(month, day);
            setBirthdays(birthdayData);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDescriptionForCurrentPage = async () => {
            const currentBirthday = birthdays[currentIndex];
            if (currentBirthday && currentBirthday.pages[0] && !currentBirthday.pages[0].extract) {
                const description = await fetchDescription(currentBirthday.pages[0].displaytitle);
                setBirthdays(prevBirthdays => {
                    const updatedBirthdays = [...prevBirthdays];
                    updatedBirthdays[currentIndex].pages[0].extract = description;
                    return updatedBirthdays;
                });
            }
        };
        if (!loading) {
            fetchDescriptionForCurrentPage();
        }
    }, [currentIndex, loading, birthdays]);

    const handlePrev = () => {
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : birthdaysWithPhotos.length - 1);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % birthdaysWithPhotos.length);
    };

    const birthdaysWithPhotos = birthdays.filter(birthday =>
        birthday.pages &&
        birthday.pages.length > 0 &&
        birthday.pages[0].thumbnail
    );

    return (
        <SimpleMain>
            <MarginContainer>
                <MainTitle>Anniversaires du Jour</MainTitle>
            </MarginContainer>
            <WholeMain>


                <BackyOverlay />
                {loading ? (
                    <LoadingText>Chargement...</LoadingText>
                ) : (
                    <MainCarousel>

                        {currentIndex < birthdaysWithPhotos.length ? (
                            <ContainerCarousel>
                                <CarouselSection>
                                    <ItemTitle>{stripHtmlTags(birthdaysWithPhotos[currentIndex].pages[0].displaytitle)}</ItemTitle>

                                </CarouselSection>
                                <CarouselSection>
                                    <CarouselContainer>
                                        <ImageCarousel src={birthdaysWithPhotos[currentIndex].pages[0].thumbnail!.source} alt={stripHtmlTags(birthdaysWithPhotos[currentIndex].pages[0].displaytitle)} />

                                    </CarouselContainer>
                                    <CarouselContainer>
                                        {birthdaysWithPhotos[currentIndex].pages[0].extract ? (
                                            <DescriptionCarousel>{birthdaysWithPhotos[currentIndex].pages[0].extract}</DescriptionCarousel>
                                        ) : (
                                            <LoadingText>Chargement de la description...</LoadingText>
                                        )}

                                    </CarouselContainer>

                                </CarouselSection>
                                <ItemLink href={birthdaysWithPhotos[currentIndex].pages[0].content_urls.desktop.page} target="_blank" rel="noopener noreferrer">Lire plus sur Wikipedia</ItemLink>


                            </ContainerCarousel>
                        ) : (
                            <ThankYouText>Merci d'avoir voté pour toutes les images !</ThankYouText>
                        )}
                        <ArrowLeft onClick={handlePrev}><FaArrowAltCircleLeft /> </ArrowLeft>
                        <ArrowRight onClick={handleNext}> <FaArrowAltCircleRight /> </ArrowRight>
                    </MainCarousel>
                )}
            </WholeMain>

        </SimpleMain>
    );
};

export default Home;



let MarginContainer = styled.div`
height: 140px;
background-color: #4b8c1a6b;
color: white;
border-radius: 0 0 20px 20px ;
box-shadow: 6px 6px 6px #00000062;
width: 100%;
position: relative;
top: 0;
display: flex;
justify-content: center;
align-items: end;
@media (max-width:700px){

    height: 115px;
    }

`

let MainTitle = styled.div`
font-size: 2em;
margin-bottom: 10px;
font-family: 'Spicy Rice', serif;
    font-weight: 200;
    font-style: normal;


@media (max-width:700px){
    font-size: 1.6em;
    margin-bottom: 10px;
       
    }
`

let SimpleMain = styled.div`
width: 100%;
/* height: 100vh; */

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

let WholeMain = styled.div`
width: 100%;
/* height: 100vh;    */
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
/* flex-wrap: wrap; */
position: relative;

`

let BackyOverlay = styled.div`
background: linear-gradient(-45deg, #9ed5d5 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
position: fixed;
top: 0;
left: 0;
z-index: -1;
`




const LoadingText = styled.p`
    font-size: 1.5em;
`;

const MainCarousel = styled.div`
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 95%;
    max-height: 95%;
    /* background-color: #7a7a7a61; */
    padding: 2%;
    border-radius: 15px;
    /* box-shadow: inset 8px 8px 10px #30303061; */
    @media (max-width: 500px){
        width: 90%;

    
    }

   
`;

const ContainerCarousel = styled.div`
    /* margin: 20px;
    padding: 20px; */
    border: 1px solid #ddd;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    ///YES WITH
    width:80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2%;
    background-color: #141414a2;
    @media (max-width:700px){
        width: 95%;
       
    }
`;

const CarouselSection = styled.div`
  display: flex;
    justify-content: space-between;
    align-items: center;
    /* flex-direction: column; */
    width:100%; 
    /* background-color: #26262683; */
    border-radius: 15px;
    margin: 1% 0;
    @media (max-width: 500px){
    flex-direction: column;

    
    }
  
`

let CarouselContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
/* flex-direction: column; */
background-color: #1d1d1d99;

width: 40%;
padding: 2%;
border-radius: 15px;
@media (max-width:700px){
        width: 90%;
       
    }
`



const ItemTitle = styled.h2`
    margin-bottom: 10px;
    color: white;
    background-color: #000000bb;
    width: 90%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1% 0;
    border-radius: 15px;
`;

const ImageCarousel = styled.img`

/* height: 100%; */
border-radius: 15px;
    /* margin-bottom: 10px; */
    /* width: 80%; */
    width: auto;
    max-height: 300px; 
    box-shadow: 8px 8px 8px #00000066;

    @media (max-width:700px){
        width: 96%;
        max-height: none;
    }
`;

const DescriptionCarousel = styled.p`
    font-size: 1em;
    margin-bottom: 10px;
    /* height: 60%; */

    background-color: white;
    border-radius: 15px;
    padding: 5px 10px;
    box-shadow: 8px 8px 8px #00000066;

    @media (max-width:700px){
        width: 100%;
       
    }
`;

const ItemLink = styled.a`
background-color: #b7400d;

text-decoration: none;
border-radius: 9px;
color: #ffffff;
font-weight: 500;
padding: 1% 5%;
    display: block;
    margin-bottom: 10px;
    text-decoration: none;
    width: 80%;

    &:hover {
        text-decoration: underline;
    }
`;


const ThankYouText = styled.p`
    font-size: 1.5em;
    color: #28a745;
`;

const Arrow = styled.div`
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
    color: #007BFF;
    cursor: pointer;
    user-select: none;
    z-index: 1000;

    &:hover {
        color: #0056b3;
    }
`;

const ArrowLeft = styled(Arrow)`
    left: 20px;
    /* background-color:#000000bb; */
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`;

const ArrowRight = styled(Arrow)`
    right: 20px;
`;
