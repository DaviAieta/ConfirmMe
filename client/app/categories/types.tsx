import { GuestProps } from "../events/guests/types"
import { EventProps } from "../events/types"

export type CategoryProps = {
    id: number
    uuid: string
    name: string
    color: string
    Events: EventProps[]
}