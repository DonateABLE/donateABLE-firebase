import { bind, memoize } from 'decko'
import { Children, Component, createElement, ReactElement, ReactNode } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

interface TabContainerProps {
    children: Array<ReactElement<TabProps>>
}

interface TabContainerState {
    active: number
}

export class TabContainer extends Component<TabContainerProps, TabContainerState> {
    private tabContainer: HTMLDivElement | null = null
    private titles: HTMLDivElement | null = null

    constructor(props: TabContainerProps) {
        super(props)

        this.state = {
            active: 0,
        }
    }

    public render(): ReactNode {
        return <div className={styles.tabs} >
            <div className={styles.titles} ref={e => this.titles = e}>
                {(this.props.children ?? []).map((a, i) => (
                    <div
                        key={i}
                        className={classNames(styles.title, {
                            [styles.active]: this.state.active === i,
                        })}
                        onClick={this.tabClick(i)}
                    >
                        {a.props.title}
                    </div>
                ))}
            </div>
            <div
                className={styles.tabContainer}
                ref={e => this.tabContainer = e}
                onScroll={this.onScroll}
            >
                {this.props.children[this.state.active]}
            </div>
        </div>
    }

    @memoize
    private tabClick(i: number): () => void {
        return () => this.setState({ active: i })
    }

    @bind
    private onScroll(e: React.UIEvent<HTMLDivElement>): void {
        if (!this.tabContainer) {
            this.setState({ active: 0 })
            return
        }
        this.titles?.style.setProperty('--position',
            String(this.tabContainer.scrollLeft / this.tabContainer.scrollWidth))
    }
}

interface TabProps {
    title: string
}

export class Tab extends Component<TabProps> {
    public render(): ReactNode {
        return <div className={styles.tab}>
            {this.props.children}
        </div>
    }
}
