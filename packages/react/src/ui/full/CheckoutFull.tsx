'use client'

import { useEffect } from "react"
import { MountCheckoutArgs, StartCheckoutArgs } from "../../types"
import { useYuno } from "../../hooks"

type CheckoutFullProps = { config: StartCheckoutArgs } & MountCheckoutArgs  

export const CheckoutFull = (props: CheckoutFullProps) => {
    const yuno = useYuno()
    const { config, ...mountCheckoutProps } = props
    const elementSelector = config.elementSelector ?? "#root-yuno-checkout"
    const id = elementSelector.replace("#", "")

    useEffect(() => {
        yuno?.startCheckout({ ...config, elementSelector })
        yuno?.mountCheckout({ ...mountCheckoutProps })
    }, [])

    return (
        <div id={id}></div>
    )
}