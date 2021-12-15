import { ChainId, NonFungibleAssetProvider } from '@masknet/web3-shared-evm'
import { OpenSeaApi, RaribleApi, NFTScanApi } from '@masknet/web3-providers'

import { unreachable } from '@dimensiondev/kit'

export async function getListings(
    address: string,
    tokenId: string,
    chainId: ChainId,
    provider: NonFungibleAssetProvider,
) {
    switch (provider) {
        case NonFungibleAssetProvider.OPENSEA:
            return OpenSeaApi.getListings(address, tokenId, chainId)
        case NonFungibleAssetProvider.NFTSCAN:
            return NFTScanApi.getListings(address, tokenId, chainId)
        case NonFungibleAssetProvider.RARIBLE:
            return RaribleApi.getListings(address, tokenId, chainId)
        default:
            unreachable(provider)
    }
}
