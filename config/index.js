/* eslint no-magic-numbers: 0 */
import MobileDetect from 'mobile-detect'
import Moment from 'moment-timezone'
import ScreenFull from 'screenfull'

if (ScreenFull.enabled) {
  ScreenFull.request()
}

const detectWebView = () => {
  const isUIwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)

  if (isUIwebview) {
    return true
  } else {
    return false
  }
}

const mobileDetector = new MobileDetect(window.navigator.userAgent)

export default {
  BusinessTypeId: {
    Bar: '56543507baa3a97c455d0fd7',
    Restaurant: '56543627baa3a97c455d0fd8',
    Event: '5654369cbaa3a97c455d0fd9'
  },
  Uber: {
    Rides: {
      MIN: 1,
      MAX: 10
    },
    OfferAmount: {
      MIN: 1,
      MAX: 10
    }
  },
  Photo: {
    MaxWidth: 1080,
    MaxHeight: 633,
    PreviewWidth: 50,
    PreviewHeight: 50
  },
  md: mobileDetector,
  isMobile: !!mobileDetector.mobile(),
  isWebView: detectWebView(),
  LocalStorageKeys: {
    Authorization: 'Authorization',
    Credentials: 'credentials'
  },
  WeekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // DefaultLocation: {
  //   lat: 34.05,
  //   lng: -118.24
  // }
}

export const USERTYPES = {
  FREEBIRD: 'freebird',
  BUSINESS: 'business',
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin'
}

// eslint-disable-next-line complexity, max-statements
const getAllTimeZones = () => {
  const here = Moment.tz.guess()
  const aryTimeZones = []
  const aryNames = Moment.tz.names()
  // from moment-timezone/data/meta
  const USTimezoneNames = [
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu'
  ]
  for (const i in aryNames) {
    const name = aryNames[i]
    const tz = Moment.tz(name.toString())
    if (tz) {
      // only push _z is valid
      if (!isNaN(tz._offset) && tz._z) {
        aryTimeZones.push(tz)
      }
    }
  }
  const TimeZones = aryTimeZones
  const aryAutoTimezones = []
  for (let i = 0; i < TimeZones.length; i++) {
    const _z = TimeZones[i]._z
    /*if (_z && Array.isArray(_z.abbrs)) {
      for (let j = 0; j < _z.abbrs.length; j ++) {
        // Check if already exists
        const abbr = _z.abbrs[j]//`${_z.abbrs[j]} - ${_z.name}`
        const index = aryAutoTimezones.indexOf(abbr)
        if (index === -1) {
          aryAutoTimezones.push(abbr)
        }
      }
    }*/
    const name = _z.name
    const index = aryAutoTimezones.indexOf(name)
    if (index === -1) {
      aryAutoTimezones.push(name)
    }
  }

  return {
    TimeZones,
    TimeZoneNames: aryAutoTimezones,
    USTimezoneNames,
    CurrentTimezone: here
  }
}

export const TimeZoneInfo = getAllTimeZones()

export function timeToDate(time) { // time: String returns Date()
  if (time && typeof time === 'string') {
    const aryElements = time.split(':')
    if (aryElements.length > 0) {
      const hr = parseInt(aryElements[0])
      const min = parseInt(aryElements[1])
      const date = new Date()
      date.setHours(hr)
      date.setMinutes(min)
      return date
    } else {
      return null
    }
  } else {
    return null
  }
}

export function dateToTime(date) { // time: String returns Date()
  if (!isDate(date)) {
    return null
  }

  const hr = date.getHours()
  const min = date.getMinutes()

  return `${hr < 10 ? 0 : ''}${hr}:${min < 10 ? 0 : ''}${min}`
}

/* eslint-disable  max-depth */
// fix Hours of Open and Close from MongoDB by replacing null to {}, string to Date
export const fixHours = (hours) => {

  const fixedHours = [
    {
      opens: false
    }, {
      opens: false
    }, {
      opens: false
    }, {
      opens: false
    }, {
      opens: false
    }, {
      opens: false
    }, {
      opens: false
    }
  ] // return 7 days

  if (Array.isArray(hours)) {
    // eslint-disable-next-line no-magic-numbers
    for (let i = 0; i < hours.length; i++) {

/*      const openingHours = {
        open: {
          day: -1,
          time: -1
        },
        close: {
          day: -1,
          time: -1
        }
      }*/
      const openingHours = hours[i]
      if (openingHours.open) {
        if (openingHours.open.day >= 0 && openingHours.open.day < 7
          && openingHours.open.time >= 0 && openingHours.open.time < 2400
        ) {
          fixedHours[openingHours.open.day].opens = true
          const startTime = new Date()
          startTime.setHours(Math.floor(openingHours.open.time / 100))
          fixedHours[openingHours.open.day].startTime = startTime
        } else {
          console.info('Invalid open time:', openingHours.open)
        }
      }

      if (openingHours.close) {
        if (openingHours.close.day >= 0 && openingHours.close.day < 7
          && openingHours.close.time >= 0 && openingHours.close.time < 2400
        ) {
          fixedHours[openingHours.close.day].opens = true
          const endTime = new Date()
          endTime.setHours(Math.floor(openingHours.close.time / 100))
          fixedHours[openingHours.open.day].endTime = endTime
        } else {
          console.info('Invalid close time:', openingHours.endTime)
        }
      }
    }
    return fixedHours
  } else {
    return fixedHours
  }
}
/* eslint-enable  max-depth */

export function fixPhotos(photos) {
  if (photos) {
    const newPhotos = { ...photos }
    for (const key in photos) {
      // newPhotos[key].isPrimary = newPhotos[key].isPrimary ? true : false
      newPhotos[key] = newPhotos[key]
    }
    return newPhotos
  } else {
    return {}
  }
}

// To generate shared url from AWS pre-signed url
export function getSharedURL(signedURL) {
  if (typeof signedURL === 'string' && signedURL) {
    let indexQuery = signedURL.indexOf('?')
    if (indexQuery < 0) {
      indexQuery = signedURL.length
    }
    return signedURL.substring(0, indexQuery)
  }
  return null
}

export function isDate(d) {
  if (Object.prototype.toString.call(d) === '[object Date]') {
    // it is a date
    if (isNaN(d.getTime())) { // d.valueOf() could also work
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

export function isValidLatLng(loc) {
  if (Array.isArray(loc) && loc.length === 2) {
    const lat = loc[0]
    const lng = loc[1]
    if (isNaN(lat) || isNaN(lng)) {
      return false
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return false
    }
    return true
  } else {
    return false
  }
}

// Check if a valid google object
export function isValidGoogleObject(google) {
  if (typeof google === 'object' && google) {
    return !!google.id
  } else {
    return false
  }
}

// get URL parameters
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

/*
* Convert legacy open/close hours to the latest Hours format
* */

export function toFreebirdHours(hours) {
  if (!Array.isArray(hours)) {
    return []
  }

  const newHours = []
  for (let i = 0; i < hours.length; i++) {
    const day = hours[i]
    const { startTime, endTime, opens } = day
    if (opens) {
      const openingHours = {
        open: {
          day: -1,
          time: -1
        },
        close: {
          day: -1,
          time: -1
        }
      }
      if (isDate(startTime) && isDate(endTime)) {
        // closing hour is on the next day
        if (startTime.getTime() > endTime.getTime()) {
          openingHours.open.day = i
          openingHours.close.day = i + 1
          openingHours.close.time = startTime.getHours() * 100 + startTime.getMinutes()
          openingHours.open.time = endTime.getHours() * 100 + endTime.getMinutes()
        } else {
          openingHours.open.day = i
          openingHours.close.day = i
          openingHours.open.time = startTime.getHours() * 100 + startTime.getMinutes()
          openingHours.close.time = endTime.getHours() * 100 + endTime.getMinutes()
        }
        newHours.push(openingHours)
      } else {
        console.info('Unexpected Opening Hours:', day)
      }
    }
  }
  return newHours
}
