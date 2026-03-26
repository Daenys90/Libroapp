import { db } from '../firebase/firebase'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
}
from 'firebase/firestore'

const autoresCollection = collection(db, 'autores')

export const getAutores = async () => {
    try{ 
    const snapshot = await getDocs(autoresCollection)

    return snapshot.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
    }))
} catch (error) {
    console.log('Error al intentar obtener los autores', error)
}
}

export const createAutor = async (autor) => {
    return await addDoc(autoresCollection, autor)
}

export const updateAutor = async(id, autor) => {
  const autorRef = doc(db, 'autores', id) 
  return await updateDoc(autorRef, autor)
}

export const deleteAutor = async(id) => {
    const autorRef = doc(db, 'autores', id)
    return await deleteDoc(autorRef)
}
