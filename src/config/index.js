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
  WeekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  stripe: {
    publish_key: "pk_test_hXZpjA4OA6gb1bhdv7Tm2Aud"
  }
}

export const USERTYPES = {
  postcard: 'postcard',
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
