import React from 'react';
import styled from 'styled-components';
import { useCustomization } from '../context/Customisation';

const Configurator: React.FC = () => {
  // const { material, setMaterial } = useCustomization();
  const {
    material,
    setMaterial,
    legs,
    setLegs, } = useCustomization()


  console.log("material", material);

  return (
    <ConfiguratorContainer>
      <Section>
        <SectionTitle>Chaise</SectionTitle>
        <SectionValues>
          <SItem $active={material === "leather"} onClick={() => setMaterial('leather')}>
            <div>Cuir</div>
          </SItem>
          <SItem $active={material === "fabric"} onClick={() => setMaterial('fabric')}>
            <div>Tissu</div>
          </SItem>
        </SectionValues>
      </Section>
      {/* <Section>
        <SectionTitle>Chair color</SectionTitle>
        <SectionValues>
        </SectionValues>
      </Section> */}
      {/* <Section>
        <SectionTitle>Cushion color</SectionTitle>
        <SectionValues>
        </SectionValues>
      </Section> */}
      <Section>
        <SectionTitle>Pieds</SectionTitle>
        <SectionValues>

          <SItem $active={legs === 1} onClick={() => setLegs(1)}>
            <div>Design</div>
          </SItem>

          <SItem $active={legs === 2} onClick={() => setLegs(2)}>
            <div>Classic</div>
          </SItem>



        </SectionValues>
      </Section>
    </ConfiguratorContainer>
  );
};

export default Configurator;

const ConfiguratorContainer = styled.div`
  position: fixed;
  right: 24px;
  bottom: 25vh;
  width: 360px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* background-color: white; */
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: white;
  display: flex;
  justify-content: flex-start;
`;

const SectionValues = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 0;
`;

const SItem = styled.div < { $active: boolean }>`
color:white;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.9)};
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    opacity: 0.8;
    border: 1px solid white;
  }
`;

const SItemLabel = styled.div<{ active: boolean }>`
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: ${({ active }) => (active ? 'white' : '#aaa')};
  text-transform: capitalize;
`;