import React, { useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

if(getApps().length === 0){
    initializeApp({
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
    });
}

export const auth = getAuth();
auth.languageCode = 'it';

export function useAuth() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        auth.onAuthStateChanged((signedInUser) => {
            setUser(signedInUser);
            console.log('-------------------')
            console.log(signedInUser)
            if(signedInUser === null){
                //logout
                
                return;
            }
            //redirect to dashboard
        })
    }, []);

    const sendOTP = React.useCallback(async (phoneNumber, signInButtonId) => {
        try{
            window.recaptchaVerifier = new RecaptchaVerifier(signInButtonId, {
                'size': 'invisible',
                'callback': (response) => {
                }
            }, auth);
            window.confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        }
        catch(e){
            //show error screen
        }
    }, []);

    const confirmOTP = React.useCallback(async (otp) => {
        await window.confirmationResult.confirm(otp);
    }, []);

    const logout = React.useCallback(async() => {
        await auth.signOut();
    }, []);
    
    return {
        sendOTP,
        confirmOTP,
        logout,
        user
    }
}