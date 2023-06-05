// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  if (req.method === 'POST') {

    const { login, password } = req.body;
    const email = login + 'some@gmail.com';
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
      });
    
    

    
    
  }
  // res.status(200).json({ name: 'John Doe' });
}
