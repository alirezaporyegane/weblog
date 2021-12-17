const _ = require('lodash'),
Branding = require('../../models/Setting/Branding');
const Currency = require('../../models/Currencies');

class setting {
  async getAll (req, res) {
    try {
      const currencybase = await Currency.findOne({},{ _id: 0 }).populate("baseId").populate("displayId").populate("fiscalId")
      const branding = await Branding.findOne()


      const currency = {}

      currency.baseName = currencybase.baseId.name ? currencybase.baseId.name : null
      currency.basePrecision = currencybase.baseId.precision ? currencybase.baseId.precision : null
      currency.displayName = currencybase.displayId.name ? currencybase.displayId.name : null
      currency.displayPrecision = currencybase.displayId.precision ? currencybase.displayId.precision : null
      currency.displayRate = currencybase.displayId.rate ? currencybase.displayId.rate : null
      currency.fiscalName = currencybase.fiscalId.name ? currencybase.fiscalId.name : null
      currency.fiscalRate = currencybase.fiscalId.rate ? currencybase.fiscalId.rate : null
      currency.fiscalPrecision = currencybase.fiscalId.precision ? currencybase.fiscalId.precision : null
      currency.baseId = currencybase.baseId.id ? currencybase.baseId.id : null
      currency.displayId = currencybase.displayId.id ? currencybase.displayId.id : null
      currency.fiscalId = currencybase.fiscalId.id ? currencybase.fiscalId.id : null

      // Object.keys(req.query).forEach(key => {
      //   if (key === 'branding' && 'currency') {
      //     return res.status(200).json({ branding ,currency })
      //   }
      //   if (key === 'branding') {
      //     return res.status(200).json({branding})
      //   } else if (key === "currency") {
      //     return res.status(200).json(currency)
      //   } else {
      //     return res.status(200).json({ branding ,currency })
      //   }
      // })

      return res.status(200).json({ branding })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async updateBranding (req, res) {
    Branding.find()
      .then(data => {
        if (data.length  === 0) {
          const branding = new Branding(req.body)

          branding.save()
            .then(result => {
              res.status(200).json(result)
            })
            .catch(() => {
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500
              })
            })
        } else {
          Branding.updateOne({}, req.body, { new: true })
            .then(result => {
              res.status(200).json(result)
            })
            .catch(() => {
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500
              })
            })
        }
      })
  }
}

module.exports = new setting()