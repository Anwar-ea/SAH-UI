import * as React from 'react';
import { useUserContext } from '../../stateContext/root-state-context';
import { useQuery } from 'react-query';
import { authService } from '../../services/auth.service';
import {useNavigate} from 'react-router-dom';
interface IAuthValidateProps {
}

const AuthValidate: React.FC = () => {
const redirect = useNavigate()
const {setUserState} = useUserContext();
const {data: loggedInUser} = useQuery('logedInUser', () => authService.currentProfile(), {
    onSuccess: (x) => {
        setUserState(x);
        redirect('/console')
    },
    onError: (err) => {
        redirect('/auth?action=login')

    },
    enabled: true
})
  return (
    <>
    <main className='w-full h-full'>
        <div className='w-full h-full flex justify-between items-center'>
            <div>Loadin...</div>
        </div>
    </main>
    </>
  );
};

export default AuthValidate;
