const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    // my appointments for today
    const { id } = req.session.user
    const date = moment()

    const appointments = await Appointment.findAll({
      include: {
        model: User,
        as: 'provider'
      },
      where: {
        user_id: id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const myAppointments = appointments.map(a => {
      const hour = moment(a.date).format('HH:mm')
      return {
        hour,
        provider: {
          name: a.provider.name,
          avatar: a.provider.avatar
        }
      }
    })

    return res.render('dashboard', {
      providers,
      appointments: myAppointments,
      date: date.format('DD/MM/YYYY')
    })
  }
}

module.exports = new DashboardController()
