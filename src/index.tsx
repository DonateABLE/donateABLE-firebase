import { createElement } from 'react'
import { render } from 'react-dom'
import { firestore } from './firebase'

// firestore.doc('users/adam').set({
//     name: 'Adam Bibby',
// })

firestore.doc('users/adam').get().then(u => console.log(u.data()))
render(<div>hello world</div>, document.getElementById('app'))
