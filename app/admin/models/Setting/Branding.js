const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const slides = new Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    background: {
      type: String
    }
})

const adminSplash = new Schema({
    slides: [slides],
    buttonLabel: {
      type: String
    },
    active: {
      type: Boolean
    }
})

const androidSplash = new Schema({
  slides: [slides],
  buttonLabel: {
    type: String
  },
  active: {
    type: Boolean
  }
})

const iosSplash = new Schema({
  slides: [slides],
  buttonLabel: {
    type: String
  },
  active: {
    type: Boolean
  }
})

const coordinates = new Schema({
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  zoom: {
    type: Number
  }
}, { _id: false })

const BrandingSchema = new Schema({
  color: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  altName: {
    type: String,
    required: true
  },
  favicon: {
    type: String
  },
  logo: {
    type: String
  },
  logoAlt: {
    type: String
  },
  noImage: {
    type: String
  },
  adminSplash: adminSplash,
  androidSplash: androidSplash,
  iosSplash: iosSplash,
  instagram: {
    type: String,
  },
  youtube: {
    type: String
  },
  whatsapp: {
    type: String
  },
  linkedin: {
    type: String
  },
  aparat: {
    type: String
  },
  twitter: {
    type: String
  },
  email: {
    type: String
  },
  telegram: {
    type: String,
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  facebook: {
    type: String
  },
  coordinates: coordinates,
  directionUrl: {
    type: String
  }
})

module.exports = mongoose.model('Branding', BrandingSchema)