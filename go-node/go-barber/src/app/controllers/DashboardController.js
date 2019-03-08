const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const { id, provider } = req.session.user
    if (provider) {
      return res.redirect('/app/dashboard/provider')
    }

    const providers = await User.findAll({ where: { provider: true } })

    // my appointments for today
    const date = moment()

    const appointments = await Appointment.findAll({
      include: {
        model: User,
        as: 'provider',
        where: {
          [Op.not]: id
        }
      },
      where: {
        user_id: id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      order: [['date', 'ASC']]
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

  async indexProvider (req, res) {
    const { id, provider } = req.session.user
    if (!provider) {
      return res.redirect('/app/dashboard')
    }

    const date = moment()

    const appointments = await Appointment.findAll({
      include: {
        model: User,
        as: 'user'
      },
      where: {
        provider_id: id
        // date: {
        //   [Op.between]: [
        //     date.startOf('day').format(),
        //     date.endOf('day').format()
        //   ]
        // }
      },
      order: [['date', 'ASC']]
    })

    const myAppointments = appointments.map(a => {
      const hour = moment(a.date).format('HH:mm')
      return {
        hour,
        user: {
          name: a.user.name,
          avatar: a.user.avatar
        }
      }
    })

    return res.render('dashboard_provider', {
      appointments: myAppointments,
      date: date.format('DD/MM/YYYY')
    })
  }
}

module.exports = new DashboardController()
