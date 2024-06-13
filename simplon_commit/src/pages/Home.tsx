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
        <Backy>

            {loading ? (
                <LoadingText>Chargement...</LoadingText>
            ) : (
                <Carousel>
                    <Title>Anniversaires du Jour</Title>
                    {currentIndex < birthdaysWithPhotos.length ? (
                        <CarouselItem>
                            <CarouselSection>
                                <ItemTitle>{stripHtmlTags(birthdaysWithPhotos[currentIndex].pages[0].displaytitle)}</ItemTitle>

                            </CarouselSection>
                            <CarouselSection>
                                <CarouselContainer>
                                    <ItemImage src={birthdaysWithPhotos[currentIndex].pages[0].thumbnail!.source} alt={stripHtmlTags(birthdaysWithPhotos[currentIndex].pages[0].displaytitle)} />

                                </CarouselContainer>
                                <CarouselContainer>
                                    {birthdaysWithPhotos[currentIndex].pages[0].extract ? (
                                        <ItemDescription>{birthdaysWithPhotos[currentIndex].pages[0].extract}</ItemDescription>
                                    ) : (
                                        <LoadingText>Chargement de la description...</LoadingText>
                                    )}

                                </CarouselContainer>

                            </CarouselSection>
                            <ItemLink href={birthdaysWithPhotos[currentIndex].pages[0].content_urls.desktop.page} target="_blank" rel="noopener noreferrer">Lire plus sur Wikipedia</ItemLink>


                        </CarouselItem>
                    ) : (
                        <ThankYouText>Merci d'avoir voté pour toutes les images !</ThankYouText>
                    )}
                    <ArrowLeft onClick={handlePrev}><FaArrowAltCircleLeft /> </ArrowLeft>
                    <ArrowRight onClick={handleNext}> <FaArrowAltCircleRight /> </ArrowRight>
                </Carousel>
            )}
        </Backy>
    );
};

export default Home;


let Backy = styled.div`
background: linear-gradient(-45deg, white 0%, blue 100%);
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

let Title = styled.div`
font-size: 2em;
background-color: white;
padding: 2% 5%;
border-radius: 15px;

margin: 10px 0;
`

const LoadingText = styled.p`
    font-size: 1.5em;
`;

const Carousel = styled.div`
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    /* background-color: #a08810; */

   
`;

const CarouselItem = styled.div`
    /* margin: 20px;
    padding: 20px; */
    border: 1px solid #ddd;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    ///YES WITH
    width:80%;
    /* background-color: #141414d4; */
`;

const CarouselSection = styled.div`
  display: flex;
    justify-content: space-around;
    align-items: center;
    /* flex-direction: column; */
    width:100%;
    background-color: #262626d7;
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
flex-direction: column;
width: 40%;
padding: 2%;
border-radius: 15px;

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

const ItemImage = styled.img`
/* height: 100%; */
border-radius: 15px;
    /* margin-bottom: 10px; */
    width: 60%;
    @media (max-width:500px){
        width: 90%;
    }
`;

const ItemDescription = styled.p`
    font-size: 1em;
    margin-bottom: 10px;
    /* height: 60%; */

    background-color: white;
    border-radius: 15px;
    padding: 5px 10px;
    @media (max-width:500px){
        width: 90%;
        background-color: white;
        font-size: 1em;
    margin-bottom: 10px;
    /* height: 60%; */

    background-color: white;
    border-radius: 15px;
    padding: 5px 10px;
    }
`;

const ItemLink = styled.a`
background-color: #efefef;

text-decoration: none;
border-radius: 15px;
color: #101010;
    display: block;
    margin-bottom: 10px;
    text-decoration: none;

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
