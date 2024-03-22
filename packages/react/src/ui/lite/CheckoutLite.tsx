'use client'

import { useEffect } from "react"
import { MountCheckoutLiteArgs, StartCheckoutArgs } from "../../types"
import { useYuno } from "../../hooks"

type CheckoutLiteProps = { config: StartCheckoutArgs } & MountCheckoutLiteArgs

export const CheckoutLite = (props: CheckoutLiteProps) => {
    const yuno = useYuno()
    const { config, ...mountCheckoutLiteProps } = props
    const elementSelector = config.elementSelector ?? "#root-yuno-checkout"
    const id = elementSelector.replace("#", "")

    useEffect(() => {
        yuno?.startCheckout({ ...config, elementSelector })
        yuno?.mountCheckoutLite({ ...mountCheckoutLiteProps })
    }, [])

    return (
        <div id={id}></div>
    )
}