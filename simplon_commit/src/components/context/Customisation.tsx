import React, { useContext, createContext, ReactNode, useState } from "react";

interface CustomizationContextType {
    material: string;
    setMaterial: (material: string) => void;
    legs: number;
    setLegs: (legs: number) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

interface CustomizationProviderProps {
    children: ReactNode;
}


// CUSTOMIZATION PROVIDER 
export const CustomizationProvider: React.FC<CustomizationProviderProps> = ({ children }) => {
    const [material, setMaterial] = useState<string>('leather');
    //ETAPE 1 Legs
    const [legs, setLegs] = useState<number>(1);

    return (
        <CustomizationContext.Provider value={{
            material,
            setMaterial,
            //2 ON RAJOUTE ICI LEGS ET SET LEGS ICI
            legs,
            setLegs
        }}>

            {children}
        </CustomizationContext.Provider>
    );
};

export const useCustomization = (): CustomizationContextType => {
    const context = useContext(CustomizationContext);
    if (!context) {
        throw new Error("useCustomization must be used within a CustomizationProvider");
    }
    return context;
};
