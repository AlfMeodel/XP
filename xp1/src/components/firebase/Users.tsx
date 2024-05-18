import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import firestoreDatabase from './firebaseConfig'

export interface Values {
    name: string,
    email: string,
    password: string
}

export interface UserResponse {
    message: string,
    validation: true,
    dataUser?: any
}

export const CreateUsers = async (payload: Values): Promise<UserResponse | Error> => {
    try {
        //QUERY
        let qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email))
        let querySnap = await getDocs(qry)

        if (querySnap.size > 0) {
            throw new Error("Ce mail existe deja")
        }

        let hachage = CryptoJS.AES.encrypt(
            payload.password, "EncryptKey"
        ).toString()

        payload.password = hachage

        //BASE
        let collectionRef = collection(firestoreDatabase, "users")
        await addDoc(collectionRef, payload)

        return {
            message: "Vous êtes Inscrits",
            validation: true
        }

    } catch (error: any) {
        return error
    }
}

export const LoginUsers = async (payload: Values): Promise<UserResponse | Error> => {
    try {
        let qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email))
        let querySnap = await getDocs(qry)

        if (querySnap.size === 0) {
            throw new Error("Ce mail n'existe pas")
        }

        let premierUser = querySnap.docs[0].data()

        let decryptage = CryptoJS.AES.decrypt(
            premierUser.password, "EncryptKey"
        )

        let decryptageUtf = decryptage.toString(CryptoJS.enc.Utf8)

        if (decryptageUtf !== payload.password) {
            throw new Error("Les mots de passe ne correspondent pas ")
        }

        return {
            message: "Vous êtes connectés",
            validation: true,
            dataUser: premierUser
        }

    } catch (error: any) {
        return error
    }

}