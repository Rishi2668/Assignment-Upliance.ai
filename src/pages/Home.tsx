
import React from 'react';
import { getAuth, signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom'; 
import RichTextEditor from "./RichTextEditors";
import UserDataForm from "./UserDataForm";
import Counter from "./counter";

const Home: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        // Redirect to the login page after signing out
        navigate('/signin'); 
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div className="d-flex flex-column h-100">
   
      <div className="header d-flex justify-content-center align-items-center">
        <button 
          className="btn btn-sm btn-danger" 
          onClick={handleLogout}
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '95%', 
            transform: 'translateX(-50%)', 
            zIndex: 10 
          }}
        >
          Logout
        </button>
      </div>

      <div className="d-flex flex-column flex-md-row h-100">
        <div className="col-12 col-md-6 h-100">
          <Counter />
          <RichTextEditor />
        </div>
        <div className="col-12 col-md-6 px-5">
          <UserDataForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
