const Ad = require('../models/Ad')
const User = require('../models/User')
// const Mail = require('../services/Mail')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    // this is to send without a queue
    // await Mail.sendMail({
    //   from: '"Jaqueline Botaro" <jlemesbotaro@gmail.com>',
    //   to: purchaseAd.author.email,
    //   subject: `Solicitação de compra: ${purchaseAd.title}`,
    //   template: 'purchase',
    //   context: { user, content, ad: purchaseAd }
    // })

    const purchase = await Purchase.create({ ad, client: req.userId, content })

    // executing this on background by redis
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save() // save on redis

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
