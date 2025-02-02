import type { HistoryResponse, GasPriceDictResponse, WalletTokenRecord } from './type'
import urlcat from 'urlcat'
import { formatAssets } from './format'
import { ChainId } from '@masknet/web3-shared-evm'

const DEBANK_API = 'https://api.debank.com'
const DEBANK_OPEN_API = 'https://openapi.debank.com'

export async function getTransactionList(address: string, chain: string) {
    const response = await fetch(`${DEBANK_API}/history/list?user_addr=${address.toLowerCase()}&chain=${chain}`)
    return (await response.json()) as HistoryResponse
}

export async function getDebankAssetsList(address: string) {
    const response = await fetch(
        `${DEBANK_OPEN_API}/v1/user/token_list?is_all=true&has_balance=true&id=${address.toLowerCase()}`,
    )
    try {
        const result = ((await response.json()) ?? []) as WalletTokenRecord[]
        return formatAssets(result)
    } catch {
        return []
    }
}

const chainIdMap: Record<number, string> = {
    [ChainId.Mainnet]: 'eth',
    [ChainId.BSC]: 'bsc',
    [ChainId.xDai]: 'xdai',
    [ChainId.Matic]: 'matic',
    [ChainId.Arbitrum]: 'arb',
}

const getDebankChain = (chainId: number) => {
    return chainIdMap[chainId] ?? ''
}

export async function getGasPriceDict(chainId: ChainId) {
    const chain = getDebankChain(chainId)
    const response = await fetch(urlcat(DEBANK_API, '/chain/gas_price_dict_v2', { chain }))
    const result = await response.json()
    if (result.error_code === 0) {
        return result as GasPriceDictResponse
    }
    return null
}
