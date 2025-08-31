'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

export type TooltipContent = {
    title: string,
    position: string,
    sticky: boolean,
    tasks: {
        [taskId: number]: {
            hours: number,
            points: number,
            endTime: string,
        }
    }
}

interface TooltipContextType {
    tooltipContentState: TooltipContent;
    setTooltipContentState: React.Dispatch<React.SetStateAction<TooltipContent>>;
}

interface TooltipProviderProps {
    children: ReactNode;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
    const [ tooltipContentState, setTooltipContentState ] = useState<TooltipContent>({title: "", position: "", sticky: false, tasks: {}});
    
    return (
        <TooltipContext.Provider value={{
            tooltipContentState, setTooltipContentState
        }}>
            {children}
        </TooltipContext.Provider>
    );
};

export const useTooltipContext = () => {
    const context = useContext(TooltipContext);
    if (context === undefined) {
      throw new Error('useTooltipContext must be used within an AppProvider');
    }
    return context;
  };

export default TooltipContext;