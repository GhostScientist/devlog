'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GithubAuthProvider, getRedirectResult, signInWithPopup } from "firebase/auth";

import { getAuth, signInWithRedirect, onAuthStateChanged } from "firebase/auth";

const provider = new GithubAuthProvider();

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRCFNjvPTEwJFH1jAooR0EN1LqgWDFMpA",
  authDomain: "devlog-431ec.firebaseapp.com",
  projectId: "devlog-431ec",
  storageBucket: "devlog-431ec.appspot.com",
  messagingSenderId: "104489042513",
  appId: "1:104489042513:web:5a9dfc8827456a2ee12e70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export default function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  const projects = ['Project 1', 'Project 2', 'Project 3']; // Replace with your actual projects

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    signInWithRedirect(auth, provider);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(function() {
        console.log('User logged out');
      })
      .catch(function(error) {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthed(true);
      } else {
        // User is logged out
        setIsAuthed(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const dummy = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  };

  useEffect(() => {
    console.log("IS user authed? " + !!auth.currentUser);
  }, [auth])

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>DevLog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8">
        <h1 className="text-4xl font-bold">DevLog</h1>
      </header>

      <main className="flex justify-center">
        {!isAuthed ? (
          <Button onClick={() => signInWithRedirect(auth, provider)}>Login with GitHub</Button>
        ) : (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              {/* Rest of the dialog code */}
            </Dialog>
          </>
        )}
      </main>

      {/* Rest of the code */}
    </div>
  );
}
