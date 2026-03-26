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

const librosCollection = collection(db, 'libros')

export const getLibros = async () => {
    const snapshot = await getDocs(librosCollection)

    return snapshot.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export const createLibro = async (libro) => {
    return await addDoc(librosCollection, libro)
}

export const updateLibro = async(id, libro) => {
  const libroRef = doc(db, 'libros', id) 
  return await updateDoc(libroRef, libro)
}

export const deleteLibro = async(id) =>{
    const libroRef = doc(db, 'libros', id)
    return await deleteDoc(libroRef)
}