const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)
    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    if (!date) {
      req.flash('error', 'Escolha uma data e um horário disponível')

      return res.redirect(`/app/appointments/new/${provider}`)
    }

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    req.flash('success', 'Agendamento realizado com sucesso')

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
