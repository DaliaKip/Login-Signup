import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useAuth } from './AuthProvider' // Adjust path according to your project structure
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

axios.defaults.withCredentials = true

export const AUTH_URL = 'https://taubeventsauthservice.onrender.com/api/v1'
export const REQUEST_TIMEOUT = 50000

const defaultTheme = createTheme()

const SignUp = () => {
  const navigate = useNavigate()
  const [isAlert, setIsAlert] = useState(false)
  const [alertType, setAlertType] = useState('error')
  const [alertMessage, setAlertMessage] = useState('')
  const [address, setAddress] = useState('')
  const [areasOfInterest, setAreasOfInterest] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = data.get('username')
    const password = data.get('password')

    try {
      const authResponse = await axios.post(
        `${AUTH_URL}/signup`,
        { username, password, address, areasOfInterest },
        { timeout: REQUEST_TIMEOUT }
      )

      setIsAlert(true)
      setAlertType('success')
      setAlertTime('Successfully signed up!')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('An unexpected error occurred:', error)
      setIsAlert(true)
      setAlertMessage(
        error.response?.data?.msg || 'An error occurred during sign up.'
      )
      setAlertTime('error')
    }
  }
  const handleAreasOfInterestChange = (event) => {
    setAreasOfInterest(event.target.value)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#5F9EA0' }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
              autoComplete="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="areas-of-interest-label">
                Areas of Interest
              </InputLabel>
              <Select
                labelId="areas-of-interest-label"
                id="areas-of-interest"
                multiple
                value={areasOfInterest}
                onChange={handleAreasOfInterestChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="North">North</MenuItem>
                <MenuItem value="South">South</MenuItem>
                <MenuItem value="Center">Center</MenuItem>
              </Select>
            </FormControl>

            {isAlert && <Alert severity={alertType}>{alertMessage}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#5F9EA0' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Link href="/" variant="body2">
                  {'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
