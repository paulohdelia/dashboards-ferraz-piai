import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  const validUser = process.env.USER_NAME
  const validPass = process.env.USER_PASSWORD

  if (!validUser || !validPass) {
    return res.status(500).json({ error: 'Credenciais não configuradas no servidor' })
  }

  if (username === validUser && password === validPass) {
    req.session.authenticated = true
    return res.json({ authenticated: true })
  }

  res.status(401).json({ error: 'Usuário ou senha inválidos' })
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao encerrar sessão' })
    }
    res.clearCookie('connect.sid')
    res.json({ authenticated: false })
  })
})

router.get('/check', (req, res) => {
  res.json({ authenticated: !!req.session?.authenticated })
})

export default router
