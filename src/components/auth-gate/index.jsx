import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import Overlay from '../overlay';
import { fetchProfileDetails, handleAuthStateChanged, handleIdTokenChanged } from '../../redux/actions/auth';
import { onIdTokenChanged, getAuth, onAuthStateChanged } from 'firebase/auth'
import Button from 'components/button';

const auth = getAuth()

export default function AuthGate({ children }){
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  // const profileData = useSelector(state => state.auth.profile.data)
  const profileMeta = useSelector(state => state.auth.profile.meta)
  const profileStatus = useSelector(state => state.auth.profile.query.status)

  useEffect(() => {
    const unsubscribe1 = onAuthStateChanged(auth, user => {
      dispatch(handleAuthStateChanged(user))
    })
    const unsubscribe2 = onIdTokenChanged(auth, async user => {
      dispatch(handleIdTokenChanged(user))
    })
    return () => {
      unsubscribe1()
      unsubscribe2()
    }
  }, [dispatch]);

  useEffect(() => {
    if (authStatus === 'authenticated'){
      dispatch(fetchProfileDetails())
    } else {
      // flush profile
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (profileMeta.need_refresh_token) {
      const auth = getAuth()
      auth.currentUser.getIdToken(true)
    }
  }, [profileMeta.need_refresh_token]);

  useEffect(() => {
    if (profileMeta.settings && !profileMeta.settings.has_completed_setup) {
      if (location.pathname !== '/users/me/setup')
        navigate('/users/me/setup')
    }
  }, [location, navigate, profileMeta]);

  const handleReload = () => window.location.reload()

  const renderChildren = useCallback(() => {
    if(authStatus === 'idle' || profileStatus === 'loading'){
      return (
        <Overlay.Loading visible position='fixed' title='Please wait...' subtitle='Loading account data' />
      )
    } else if (profileStatus === 'failed') {
      return (
        <Overlay.Error 
          visible 
          position='fixed'
          title='Oops, something went wrong' 
          subtitle={
            <>
              <div>Please reload this page.</div>
              <div className='my-2'><Button onClick={handleReload}>Reload</Button></div>
            </>
          } 
          actions={[
            <button type="primary" key="console"  onClick={() => window.location.reload()}>Reload</button>
          ]}
        />
      )
    } else {
      return children
    }
  }, [authStatus, children, profileStatus])

  return renderChildren()
}