const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {
      purchasedBy: null
    }

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    // without paginate, use .populate()
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt' // DESC
    })

    return res.json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    if (ad.purchasedBy) {
      return res.status(400).json({
        error: 'Item esgotado'
      })
    }

    return res.json(ad)
  }

  async store (req, res) {
    const ad = await Ad.create({
      ...req.body,
      author: req.userId // from authmiddleware
    })

    return res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true // info updated to const
    })

    return res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
