import { useState, useMemo, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { createStyles, makeStyles, Card, CardContent, CardActions } from '@material-ui/core'
import { useI18N } from '../../../utils/i18n-next-ui'
import { ActionButtonPromise } from '../../../extension/options-page/DashboardComponents/ActionButton'
import { SelectTokenAmountPanel } from '../../ITO/UI/SelectTokenAmountPanel'
import { ERC20TokenDetailed, EthereumTokenType, EtherTokenDetailed } from '../../../web3/types'
import type { TokenWatched } from '../../../web3/hooks/useTokenWatched'
import { EthereumWalletConnectedBoundary } from '../../../web3/UI/EthereumWalletConnectedBoundary'
import { DateTimePanel } from '../../../web3/UI/DateTimePanel'
import type { useAsset } from '../hooks/useAsset'
import { ChainState } from '../../../web3/state/useChainState'
import { PluginCollectibleRPC } from '../messages'
import { toAsset, toUnixTimestamp } from '../helpers'

const useStyles = makeStyles((theme) => {
    return createStyles({
        content: {},
        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 2, 2),
        },
        panel: {
            marginTop: theme.spacing(2),
            '&:first-child': {
                marginTop: 0,
            },
        },
        label: {},
        button: {
            marginTop: theme.spacing(1.5),
        },
    })
})

export interface ListingByHighestBidCardProps {
    asset?: ReturnType<typeof useAsset>
    tokenWatched: TokenWatched
}

export function ListingByHighestBidCard(props: ListingByHighestBidCardProps) {
    const { asset, tokenWatched } = props
    const { amount, token, balance, setAmount, setToken } = tokenWatched

    const { t } = useI18N()
    const classes = useStyles()

    const { account } = ChainState.useContainer()

    const [reservePrice, setReservePrice] = useState('')
    const [expirationDateTime, setExpirationDateTime] = useState(new Date())

    const validationMessage = useMemo(() => {
        if (new BigNumber(amount || '0').isZero()) return 'Enter minimum bid'
        if (new BigNumber(reservePrice || '0').isZero()) return 'Ether reserve price'
        if (expirationDateTime.getTime() - Date.now() <= 0) return 'Invalid expiration date'
        return ''
    }, [amount])

    const onPostListing = useCallback(async () => {
        if (!asset?.value) return
        if (!asset.value.token_id || !asset.value.token_address) return
        if (!token?.value) return
        if (token.value.type !== EthereumTokenType.Ether && token.value.type !== EthereumTokenType.ERC20) return
        await PluginCollectibleRPC.createSellOrder({
            asset: toAsset({
                tokenId: asset.value.token_id,
                tokenAddress: asset.value.token_address,
                schemaName: asset.value.assetContract.schemaName,
            }),
            accountAddress: account,
            startAmount: Number.parseFloat(amount),
            expirationTime: toUnixTimestamp(expirationDateTime),
            englishAuctionReservePrice: Number.parseFloat(reservePrice),
        })
    }, [asset?.value, token, amount, account, reservePrice, expirationDateTime])

    return (
        <Card elevation={0}>
            <CardContent>
                <SelectTokenAmountPanel
                    amount={amount}
                    balance={balance.value ?? '0'}
                    onAmountChange={setAmount}
                    token={token.value as EtherTokenDetailed | ERC20TokenDetailed}
                    onTokenChange={setToken}
                    TokenAmountPanelProps={{
                        classes: {
                            root: classes.panel,
                        },
                        label: 'Minimum Bid',
                        TextFieldProps: {
                            helperText: 'Set your starting bid price.',
                        },
                    }}
                />
                <SelectTokenAmountPanel
                    amount={amount}
                    balance={balance.value ?? '0'}
                    onAmountChange={setReservePrice}
                    token={token.value as EtherTokenDetailed | ERC20TokenDetailed}
                    onTokenChange={setToken}
                    TokenAmountPanelProps={{
                        classes: {
                            root: classes.panel,
                        },
                        disableToken: true,
                        disableBalance: true,
                        label: 'Reserve Price',
                        TextFieldProps: {
                            helperText: 'Create a hidden limit by setting a reserve price.',
                        },
                    }}
                />
                <DateTimePanel
                    label="Expiration Date"
                    date={expirationDateTime}
                    onChange={setExpirationDateTime}
                    TextFieldProps={{
                        className: classes.panel,
                        helperText:
                            'Your auction will automatically end at this time and the highest bidder will win. No need to cancel it!',
                    }}
                />
            </CardContent>
            <CardActions className={classes.footer}>
                <EthereumWalletConnectedBoundary>
                    <ActionButtonPromise
                        className={classes.button}
                        variant="contained"
                        disabled={!!validationMessage}
                        fullWidth
                        size="large"
                        init={validationMessage || t('plugin_collectible_post_listing')}
                        waiting={t('plugin_collectible_post_listing')}
                        complete={t('plugin_collectible_done')}
                        failed={t('plugin_collectible_retry')}
                        executor={onPostListing}
                        completeOnClick={() => setAmount('')}
                        failedOnClick="use executor"
                    />
                </EthereumWalletConnectedBoundary>
            </CardActions>
        </Card>
    )
}