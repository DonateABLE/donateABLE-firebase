import Button from 'components/button'
import Content from 'components/content'
import { Input } from 'components/form'
import Header from 'components/header'
import { PageLoader } from 'components/loader'
import { showToast } from 'components/snack-bar'
import User, { useUser } from 'orm/user'
import { createElement, FunctionComponent, useCallback } from 'react'
import { addValue, bindArgs, useForceUpdate } from 'utils'
import styles from './style.scss'

const userToastKey = Symbol('user-toast-key')

const UserEdit: FunctionComponent = props => {
    const user = useUser()

    const forceUpdate = useForceUpdate()
    const changeUser = useCallback((field: Diff<FilterPropertyNames<User, string>, 'fullName'>, value: string) => {
        if (user) {
            user[field] = value
            forceUpdate()
        }
    }, [user, forceUpdate])

    const save = useCallback(async () => {
        if (user) {
            await user.save()
            showToast('User saved', { key: userToastKey })
        }
    }, [user])

    if (!user) {
        return <PageLoader />
    }
    return <Content>
        <Header
            image={user.portrait}
            imageAlt='User portrait'
            imageRound

            title={user.fullName}
            subtitle={user.email}
            buttonTitle='Start Donating'
            buttonLocation='/'
        />
        <div className={styles.form}>

            <Input
                className={styles.firstName}
                title='First Name'
                value={user.firstName}
                onChange={addValue(bindArgs('firstName', changeUser))}
            />

            <Input
                className={styles.lastName}
                title='Last Name'
                value={user.lastName}
                onChange={addValue(bindArgs('lastName', changeUser))}
            />

            <Input
                className={styles.email}
                title='Email Address'
                value={user.email}
                onChange={addValue(bindArgs('email', changeUser))}
            />

            <Input
                className={styles.user}
                title='Username'
                value={user.user}
                onChange={addValue(bindArgs('user', changeUser))}
            />

        </div>
        <Button onClick={save}>Save</Button>
    </Content>
}

export default UserEdit
