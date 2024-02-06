import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {signInWithPopup} from 'firebase/auth';
import {auth,Providers} from '../config/firebase'

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
    const navigate = useNavigate();
  useEffect(()=>{
    if (!auth.currentUser){
        navigate("../")
        signInWithPopup(auth, Providers.google)
    }
  }, [])
  return(
   <>{children}</>
  )  
};

export default AuthChecker;