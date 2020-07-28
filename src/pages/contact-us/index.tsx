import Content from 'components/content'
import { createElement, FunctionComponent, useState, constructor, Component, ReactNode } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import styles from './style.scss'
import { Input } from 'components/form'
import { addValue, bindArgs } from 'utils'
import Contact from 'orm/contactUs'
import { bind } from 'decko'
import Button from 'components/button'

type Props = RouteComponentProps<{ id?: string }>

interface State {
    contact: Contact
}

const handleSubmit = (event: any) => {
    console.log(1)
}

export default class ContactUs extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            contact: new Contact(),
        }
    }

    public render(): ReactNode {
        const contact = this.state.contact

        return <Content>
            <h2 className={styles.header1}>
                THANK YOU FOR VISITING
            </h2>
            <h2 className={styles.header}>
                WE WOULD LOVE TO HEAR FROM YOU
            </h2>
            
            <div className={styles.row}>
                <div className={styles.column}>
                    <h3 className={styles.header1}>Technical Support</h3>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Input
                                white
                                title=''
                                value={contact.firstNameU}
                                onChange={addValue(bindArgs('firstNameU', this.contactChangeString))}
                                placeholder='First Name'
                            />
                        </div>
                        <div className={styles.column}>
                            <Input
                                white
                                title=''
                                value={contact.lastNameU}
                                onChange={addValue(bindArgs('lastNameU', this.contactChangeString))}
                                placeholder='Last Name'
                            />
                        </div>
                    </div>

                    <div className={styles.formElement}> <Input
                        white
                        title=''
                        value={contact.emailU}
                        onChange={addValue(bindArgs('emailU', this.contactChangeString))}
                        placeholder='Email'
                    /> </div>
                    <div className={styles.formElement}> <Input
                        white
                        title=''
                        value={contact.subjectU}
                        onChange={addValue(bindArgs('subjectU', this.contactChangeString))}
                        placeholder='Subject'
                    /> </div>
                    <div className={styles.formElement}> 
                        <Input
                        white
                        title=''
                        value={contact.messageU}
                        onChange={addValue(bindArgs('messageU', this.contactChangeString))}
                        placeholder='Message'
                        /> 
                        <Button onClick={handleSubmit} fullWidth color='dark' size='medium'>
                        Submit
                        </Button>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.header1}>Get Involved</h3>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Input
                                white
                                title=''
                                value={contact.firstNameC}
                                onChange={addValue(bindArgs('firstNameC', this.contactChangeString))}
                                placeholder='First Name'
                            />
                        </div>
                        <div className={styles.column}>
                            <Input
                                white
                                title=''
                                value={contact.lastNameC}
                                onChange={addValue(bindArgs('lastNameC', this.contactChangeString))}
                                placeholder='Last Name'
                            />
                        </div>
                    </div>

                    <div className={styles.formElement}> <Input
                        white
                        title=''
                        value={contact.emailC}
                        onChange={addValue(bindArgs('emailC', this.contactChangeString))}
                        placeholder='Email'
                    /> </div>
                    <div className={styles.formElement}> <Input
                        white
                        title=''
                        value={contact.charityName}
                        onChange={addValue(bindArgs('charityName', this.contactChangeString))}
                        placeholder='Charity Name'
                    /> </div>
                    <div className={styles.formElement}> 
                        <Input
                        white
                        title=''
                        value={contact.addInfo}
                        onChange={addValue(bindArgs('addInfo', this.contactChangeString))}
                        placeholder='Additional Information'
                        />
                        <Button onClick={handleSubmit} fullWidth color='dark' size='medium'>
                        Submit
                        </Button> 
                    </div>
                </div>
            </div>


            

        </Content>
    }

    @bind
    private contactChangeString(field: FilterPropertyNames<Contact, string>, value: string): void {
        this.setState(state => {
            state.contact[field] = value as any
            return { contact: state.contact }
        })
    }
    
    
    
    
}
