import Content from 'components/content'
import Header from 'components/header'
import { PageLoader } from 'components/loader'
import { useUser } from 'orm/user'
import { createElement, Fragment, FunctionComponent } from 'react'

const UserEdit: FunctionComponent = props => {
    const user = useUser()
    if (!user) {
        return <PageLoader />
    }
    return <Content>
        <Header
            image={user.portrait}
            imageAlt='User portrait'
            title={user.fullName}
            subtitle={user.email}
            buttonTitle='Start Donating'
            buttonLocation='/'
        />
    </Content>
}

export default UserEdit
