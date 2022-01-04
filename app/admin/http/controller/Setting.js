const _ = require('lodash');
const Branding = require('../../models/Setting/Branding');
const Currency = require('../../models/Currencies');
const Modules = require('../../../licence/models/Module');

class setting {
  async getAll (req, res) {
    try {
      const currencybase = await Currency.findOne({},{ _id: 0 }).populate("baseId").populate("displayId").populate("fiscalId")
      const branding = await Branding.findOne()
      let modules = await Modules.findOne()
      modules = modules && modules.modules ? modules.modules : []

      const currency = {}

      if (currencybase && currencybase.length) {
        currency.baseName = currencybase.baseId && currencybase.baseId.name
        ? currencybase.baseId.name
        : null

        currency.basePrecision = currencybase.baseId && currencybase.baseId.precision
        ? currencybase.baseId.precision
        : null

        currency.displayName = currencybase.displayId && currencybase.displayId.name
        ? currencybase.displayId.name
        : null

        currency.displayPrecision = currencybase.displayId && currencybase.displayId.precision
        ? currencybase.displayId.precision
        : null

        currency.displayRate = currencybase.displayId && currencybase.displayId.rate
        ? currencybase.displayId.rate
        : null

        currency.fiscalName = currencybase.fiscalId && currencybase.fiscalId.name
        ? currencybase.fiscalId.name
        : null

        currency.fiscalRate = currencybase.fiscalId && currencybase.fiscalId.rate
        ? currencybase.fiscalId.rate
        : null

        currency.fiscalPrecision = currencybase.fiscalId && currencybase.fiscalId.precision
        ? currencybase.fiscalId.precision
        : null

        currency.baseId = currencybase.baseId && currencybase.baseId.id
        ? currencybase.baseId.id
        : null

        currency.displayId = currencybase.displayId && currencybase.displayId.id
        ? currencybase.displayId.id
        : null

        currency.fiscalId = currencybase.fiscalId && currencybase.fiscalId.id
        ? currencybase.fiscalId.id
        : null
      }

      const data = { 'branding': branding, 'modules': modules, 'currency': currency }

      const filter = {}

      Object.keys(req.query).forEach(key => {
        Object.keys(data).forEach(k => {
          if (k === key) {
            filter[k] = data[k]
          }
        })
      })

      res.status(200).json(filter)
    } catch (err) {
      console.log(err);
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