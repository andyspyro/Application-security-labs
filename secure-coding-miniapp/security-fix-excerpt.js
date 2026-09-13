/*
Sanitized excerpt from my secure coding mini app remediation.

The goal was to stop user input from being joined directly into SQL and to
require a session CSRF token for state changing requests.
*/

app.post('/login', verifyCsrfToken, async function (request, response) {
  const email = String(request.body.email || '').trim()
  const password = String(request.body.password || '')

  const users = await query(
    'SELECT fullname, email FROM users WHERE email = ? AND password = ? LIMIT 1',
    [email, password]
  )

  if (!users || users.length === 0) {
    return response.send(loginPage(request, 'Invalid email or password.'))
  }

  request.session.userEmail = users[0].email
  request.session.csrfToken = crypto.randomBytes(32).toString('hex')

  response.redirect('/home')
})

app.post('/register', verifyCsrfToken, async function (request, response) {
  const fullname = String(request.body.fullname || '').trim()
  const email = String(request.body.email || '').trim()
  const password = String(request.body.password || '')

  await query(
    'INSERT INTO users (fullname, password, email) VALUES (?, ?, ?)',
    [fullname, password, email]
  )

  request.session.userEmail = email
  request.session.csrfToken = crypto.randomBytes(32).toString('hex')

  response.redirect('/home')
})
