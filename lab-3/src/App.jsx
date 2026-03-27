import { useState } from 'react'
import './App.css'
import FormInput from './components/FormInput.jsx'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (isLogin) {
      console.log({ username, password })
      alert('Logged in!')
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      console.log({ username, email, password })
      alert('Account created!')
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  function handleToggle() {
    setIsLogin(!isLogin)
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="page">
      <div className="card">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!isLogin && (
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button className="submit-btn" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button className="toggle-btn" onClick={handleToggle}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default App
