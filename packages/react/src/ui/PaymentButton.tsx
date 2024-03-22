'use client'

import { ReactNode, useMemo } from "react";
import { useYuno } from "../hooks";

type PaymentButtonProps = {
    elementSelector?: string;
    children: ReactNode
} & Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'id' | 'onClick'>

export const PaymentButton = (props: PaymentButtonProps) => {
    const yuno = useYuno()
    const {elementSelector: selector, ...reactButtonAttributes} = props
    const elementSelector = useMemo(() => {
        return selector ?? "#root-yuno-checkout-lite"
    }, [])

    const handleStartPayment = () => {
        yuno?.startPayment()
    }

    return <button {...reactButtonAttributes} id={elementSelector} onClick={handleStartPayment}>
        {props.children}
    </button>
}