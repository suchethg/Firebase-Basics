import {initializeApp} from 'firebase/app'
import {getFirestore,collection,onSnapshot,addDoc,deleteDoc,doc,query,where,orderBy,serverTimestamp,getDoc,updateDoc} from 'firebase/firestore'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDml1527-JqwUw6GThT8o_LbLVgL3yozrI",
    authDomain: "something-unique-90b20.firebaseapp.com",
    projectId: "something-unique-90b20",
    storageBucket: "something-unique-90b20.appspot.com",
    messagingSenderId: "152324288633",
    appId: "1:152324288633:web:c6110f29b93138ef1764a8",
    measurementId: "G-HYG36DLQ15"
  };
  //init firebase app
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()
  const auth = getAuth()
  //collection ref
  const colRef = collection(db,'books')

  //queries 
  const q = query(colRef,orderBy('createdAt'))
  
  // real time get collection data

  onSnapshot(q,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(),id:doc.id})
    })
    console.log(books)
  })
  //adding documents
  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(colRef,{
        title:addBookForm.title.value,
        author:addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(()=>{
        addBookForm.reset() 
    })
})
  //deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db,'books',deleteBookForm.id.value)
    deleteDoc(docRef).then(()=>{
        deleteBookForm.reset()
    })

  })
//get a single document
const docRef = doc(db,'books','Zijy0TCsQ7ITSUTXK4VP')
getDoc(docRef).then((doc)=>{
    console.log(doc.data(),doc.id)
})
onSnapshot(docRef,(doc)=>{
console.log(doc.data(),doc.id)
})
//update a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db,'books',updateForm.id.value)
    updateDoc(docRef,{
        title:'updated title',

    }).then(()=>{
        updateForm.reset()
    })
})
//signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth,email,password).then((cred)=>{
        console.log('user created',cred.user)
        signupForm.reset()
    })
    .catch((err)=>{
        err.message
    })
})