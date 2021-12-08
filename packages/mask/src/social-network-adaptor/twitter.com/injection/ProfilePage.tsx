import { MutationObserverWatcher } from '@dimensiondev/holoflows-kit'
import { getMaskColor, makeStyles } from '@masknet/theme'
import { EnhancedProfilePage } from '../../../plugins/Profile/SNSAdaptor/EnhancedProfile'
import { createReactRootShadowed, startWatch } from '../../../utils'
import {
    searchNewTweetButtonSelector,
    searchProfileEmptySelector,
    searchProfileTabPageSelector,
} from '../utils/selector'

function ProfilePageAtTwitter() {
    const newTweetButton = searchNewTweetButtonSelector().evaluate()
    const style = newTweetButton ? window.getComputedStyle(newTweetButton) : EMPTY_STYLE
    const fontStyle = newTweetButton?.firstChild
        ? window.getComputedStyle(newTweetButton.firstChild as HTMLElement)
        : EMPTY_STYLE

    const { classes } = useStyles({ backgroundColor: style.backgroundColor, fontFamily: fontStyle.fontFamily })

    return <EnhancedProfilePage classes={classes} />
}

function injectProfilePageForEmptyState(signal: AbortSignal) {
    const watcher = new MutationObserverWatcher(searchProfileEmptySelector())
    startWatch(watcher, signal)
    createReactRootShadowed(watcher.firstDOMProxy.afterShadow, { signal }).render(<ProfilePageAtTwitter />)
}

function injectProfilePageState(signal: AbortSignal) {
    const watcher = new MutationObserverWatcher(searchProfileTabPageSelector())
    startWatch(watcher, signal)
    createReactRootShadowed(watcher.firstDOMProxy.afterShadow, { signal }).render(<ProfilePageAtTwitter />)
}

const EMPTY_STYLE = {} as CSSStyleDeclaration
interface StyleProps {
    backgroundColor: string
    fontFamily: string
}

const useStyles = makeStyles<StyleProps>()((theme, props) => ({
    text: {
        paddingTop: 29,
        paddingBottom: 29,
        '& > p': {
            fontSize: 28,
            fontFamily: props.fontFamily,
            fontWeight: 700,
            color: getMaskColor(theme).textPrimary,
        },
    },
    button: {
        backgroundColor: props.backgroundColor,
        color: 'white',
        marginTop: 18,
        '&:hover': {
            backgroundColor: props.backgroundColor,
        },
    },
}))

export function injectProfilePageAtTwitter(signal: AbortSignal) {
    injectProfilePageForEmptyState(signal)
    injectProfilePageState(signal)
}