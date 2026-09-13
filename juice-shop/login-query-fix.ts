/*
Sanitized excerpt from my OWASP Juice Shop SQL injection remediation work.

The original Juice Shop project is MIT licensed. This excerpt only shows the
query pattern I changed during the lab. Challenge specific credentials and
unrelated application code are intentionally omitted.
*/

models.sequelize.query(
  'SELECT * FROM Users WHERE email = $email AND password = $password AND deletedAt IS NULL',
  {
    bind: {
      email: req.body.email || '',
      password: security.hash(req.body.password || '')
    },
    model: UserModel,
    plain: true
  }
)
  .then((authenticatedUser) => {
    const user = utils.queryResultToJson(authenticatedUser)

    if (user.data?.id) {
      afterLogin(user, res, next)
    } else {
      res.status(401).send('Invalid email or password.')
    }
  })
  .catch((error: Error) => {
    next(error)
  })
