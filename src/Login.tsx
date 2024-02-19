import { useState } from 'react'
import { useSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface Props {
  setLogin: (state: boolean) => void
}
export default function Component(props: Props) {
  const { setLogin } = props
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
  const containerStyle = {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2
  }

  const handleSubmit = (password: string) => async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.radio.nickchen120235.dns-cloud.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password
        }),
      })
      if (res.ok) {
        const data = await res.json() as { token: string }
        sessionStorage.setItem('token', data.token)
        enqueueSnackbar('Login successful', { variant:'success' })
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
    finally {
      setLoading(false)
    }
  }

  return (
    <div style={style}>
      <Paper sx={containerStyle}>
        <Typography component='h3' variant='h3' textAlign='center'>
          Radio Station Login
        </Typography>
        <TextField
          label='Password'
          variant='outlined'
          type='password'
          sx={{ marginTop: 2 }}
          onChange={e => setInput(e.target.value)}
        />
        <LoadingButton
          variant='contained'
          color='primary'
          loading={loading}
          sx={{ margin: 2 }}
          endIcon={<LoginIcon />}
          onClick={handleSubmit(input)}
        >
          Login
        </LoadingButton>
      </Paper>
    </div>
  )
}
