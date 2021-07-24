import React from 'react';
import './App.css';
import { Button, Box } from '@material-ui/core'
import { useAuth, auth } from './sdk';

function App() {
  const {
    sendOTP,
    confirmOTP,
    logout,
    user
  } = useAuth();
  React.useEffect(() => {
    (async () => {
    })();
  });
  const signIn = React.useCallback(async () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber. 
          await sendOTP('+911234567890', 'sign_in_button');
          await confirmOTP(123456)
  },[])

  return (
    <div className="App">
      {
        user && (
          <Box>
            <Button
              onClick={logout}
              variant="contained" 
              color="primary">
              Logout
            </Button>
            <pre>
              { user.accessToken }
            </pre>
          </Box>
        ) ||
      <Button 
        id="sign_in_button"
        onClick={signIn}
        variant="contained" 
        color="primary">
        This Button triggers send phoneNumber / verify OTP flow and signs user in
      </Button>
      }
    </div>
  );
}

export default App;
