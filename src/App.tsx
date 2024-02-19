import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AudioPlayer from 'react-h5-audio-player'
import Browser from './Browser'
import Login from './Login'
import { enqueueSnackbar } from 'notistack'

export default function Component() {
  const [currFile, setCurrFile] = useState<string>('')
  const [currFolder, setCurrFolder] = useState('Radio')
  const [login, setLogin] = useState(false)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token === null) {
      setLogin(false)
      return
    }
    async function verifyToken(token: string): Promise<void> {
      try {
        const res = await fetch('https://api.radio.nickchen120235.dns-cloud.net/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token
          }),
        })
        if (res.ok) {
          enqueueSnackbar('Login successful', { variant: 'success' })
          setLogin(true)
        }
        else {
          if (res.status === 400 || res.status === 401) {
            const data = await res.json() as { error: string }
            enqueueSnackbar(data.error, { variant: 'error' })
            setLogin(false)
          }
          else {
            enqueueSnackbar(`Backend returned ${res.status}`, { variant: 'error' })
            setLogin(false)
          }
        }
      }
      catch (e) {
        console.error(e)
        enqueueSnackbar('Failed to login', { variant: 'error' })
        setLogin(false)
      }
    }
    verifyToken(token)
  }, [])

  if (!login)
    return <Login setLogin={setLogin} />
  return (<div style={{height: '100vh'}}>
    <AppBar elevation={0} color='inherit'>
      <Toolbar>
        <Typography variant='h6' component='div'>
          Radio Station
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <div style={{ height: `calc(100% - 64px${currFile && ' - 88px'})` }}>
      <Browser setCurrFile={setCurrFile} setLogin={setLogin} setCurrRadioFolder={setCurrFolder} />
    </div>
    {currFile && <AudioPlayer src={`https://s3.tebi.io/nickchen120235-radio/${encodeURIComponent(currFolder)}/${encodeURIComponent(currFile)}`} />}
  </div>)
}
