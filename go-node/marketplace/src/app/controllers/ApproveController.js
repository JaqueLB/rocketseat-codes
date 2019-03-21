const Purchase = require('../models/Purchase')

class ApproveController {
  async update (req, res) {
    const { purchaseId } = req.params
    const { ad } = await Purchase.findById(purchaseId).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: 'Você não é o dono do anúncio' })
    }

    if (ad.purchasedBy) {
      return res.status(400).json({ error: 'Anúncio esgotado' })
    }

    ad.purchasedBy = purchaseId

    await ad.save()

    return res.json(ad)
  }
}

module.exports = new ApproveController()
