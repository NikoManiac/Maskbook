import { NetworkType, ProviderType } from '@masknet/web3-shared-evm'

export const PLUGIN_META_KEY = 'com.maskbook.evm'
export const PLUGIN_ID = 'com.maskbook.evm'
export const PLUGIN_NAME = 'EVM'
export const PLUGIN_ICON = 'Ξ'
export const PLUGIN_DESCRIPTION = ''
export const PLUGIN_NETWORKS = [
    {
        ID: `${PLUGIN_ID}_ethereum`,
        pluginID: PLUGIN_ID,
        type: NetworkType.Ethereum,
        name: 'Ethereum',
        icon: new URL('./assets/ethereum.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_bsc`,
        pluginID: PLUGIN_ID,
        type: NetworkType.Binance,
        name: 'BSC',
        icon: new URL('./assets/binance.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_polygon`,
        pluginID: PLUGIN_ID,
        type: NetworkType.Polygon,
        name: 'Polygon',
        icon: new URL('./assets/polygon.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_arbitrum`,
        pluginID: PLUGIN_ID,
        type: NetworkType.Arbitrum,
        name: 'Arbitrum One',
        icon: new URL('./assets/arbitrum.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_xdai`,
        pluginID: PLUGIN_ID,
        type: NetworkType.xDai,
        name: 'xDai',
        icon: new URL('./assets/xdai.png', import.meta.url).toString(),
    },
]
export const PLUGIN_PROVIDERS = [
    {
        ID: `${PLUGIN_ID}_maskwallet`,
        pluginID: PLUGIN_ID,
        type: ProviderType.MaskWallet,
        name: 'Mask Network',
        icon: new URL('./assets/maskwallet.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_metamask`,
        pluginID: PLUGIN_ID,
        type: ProviderType.MetaMask,
        name: 'MetaMask',
        icon: new URL('./assets/metamask.png', import.meta.url).toString(),
    },
    {
        ID: `${PLUGIN_ID}_walletconnect`,
        pluginID: PLUGIN_ID,
        type: ProviderType.WalletConnect,
        name: 'WalletConnect',
        icon: new URL('./assets/walletconnect.png', import.meta.url).toString(),
    },
]