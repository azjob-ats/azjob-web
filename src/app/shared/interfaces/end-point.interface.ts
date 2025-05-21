import { iUrl } from "./url.interface"

type Methd = 'POST' | 'GET'

export interface iEndpointConfig {
    method: Methd,
    property: iUrl,
    api: () => string
}