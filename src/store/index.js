/**
 * Centralized State Management
 * Lightweight reactive store with subscription pattern
 */

// ===================================
// STORE STATE
// ===================================

const state = {
  slots: {
    max: 5,
    taken: 3
  }
}

// ===================================
// GETTERS (Derived State)
// ===================================

const getters = {
  /**
   * Get available slots count
   * @returns {number} Available slots
   */
  availableSlots: (state) => {
    return state.slots.max - state.slots.taken
  },

  /**
   * Check if slots are available
   * @returns {boolean} Has availability
   */
  hasAvailability: (state, getters) => {
    return getters.availableSlots > 0
  },

  /**
   * Get availability percentage
   * @returns {number} Percentage (0-100)
   */
  availabilityPercent: (state, getters) => {
    if (state.slots.max === 0) return 0
    return (getters.availableSlots / state.slots.max) * 100
  },

  /**
   * Get status message
   * @returns {string} Status message
   */
  statusMessage: (state, getters) => {
    if (getters.hasAvailability) {
      return `Available slots: ${getters.availableSlots}`
    }
    return 'No slots available.'
  }
}

// ===================================
// SUBSCRIPTION SYSTEM
// ===================================

let listeners = []

/**
 * Subscribe to state changes
 * @param {Function} callback - Callback function (newState, prevState)
 * @returns {Function} Unsubscribe function
 */
export function subscribe(callback) {
  listeners.push(callback)

  // Return unsubscribe function
  return () => {
    listeners = listeners.filter((listener) => listener !== callback)
  }
}

// ===================================
// STATE MODIFIERS
// ===================================

/**
 * Notify all listeners of state change
 * @param {Object} newState - New state
 * @param {Object} prevState - Previous state
 */
function notifyListeners(newState, prevState) {
  listeners.forEach((callback) => callback(newState, prevState))
}

/**
 * Set state at a given path
 * @param {string} path - Dot-notation path (e.g., 'slots.taken')
 * @param {*} value - New value
 */
export function setState(path, value) {
  const keys = path.split('.')
  let current = state
  let prevValue

  // Navigate to parent
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      console.warn(`setState: Path "${path}" does not exist`)
      return
    }
    current = current[keys[i]]
  }

  // Get previous value
  const lastKey = keys[keys.length - 1]
  prevValue = current[lastKey]

  // Skip if value hasn't changed
  if (prevValue === value) return

  // Set new value
  current[lastKey] = value

  // Notify listeners
  notifyListeners(
    JSON.parse(JSON.stringify(state)),
    JSON.parse(JSON.stringify({ ...state, [lastKey]: prevValue }))
  )
}

/**
 * Get state at a given path
 * @param {string} path - Dot-notation path
 * @returns {*} State value
 */
export function getState(path) {
  const keys = path.split('.')
  let current = state

  for (const key of keys) {
    if (!(key in current)) {
      console.warn(`getState: Path "${path}" does not exist`)
      return undefined
    }
    current = current[key]
  }

  return current
}

/**
 * Get computed value from getters
 * @param {string} name - Getter name
 * @returns {*} Computed value
 */
export function getGetter(name) {
  if (!(name in getters)) {
    console.warn(`getGetter: Unknown getter "${name}"`)
    return undefined
  }
  return getters[name](state, getters)
}

/**
 * Reset state to initial values
 */
export function resetState() {
  const prevState = JSON.parse(JSON.stringify(state))

  state.slots = {
    max: 5,
    taken: 3
  }

  notifyListeners(
    JSON.parse(JSON.stringify(state)),
    prevState
  )
}

// ===================================
// SLOT-SPECIFIC HELPERS
// ===================================

/**
 * Set max slots
 * @param {number} max - Max slots
 */
export function setMaxSlots(max) {
  if (typeof max !== 'number' || max < 0) {
    console.warn('setMaxSlots: max must be a non-negative number')
    return
  }
  setState('slots.max', max)
}

/**
 * Set taken slots
 * @param {number} taken - Taken slots
 */
export function setTakenSlots(taken) {
  if (typeof taken !== 'number' || taken < 0) {
    console.warn('setTakenSlots: taken must be a non-negative number')
    return
  }
  setState('slots.taken', taken)
}

/**
 * Increment taken slots
 * @param {number} amount - Amount to increment (default: 1)
 */
export function incrementTaken(amount = 1) {
  const current = getState('slots.taken')
  setTakenSlots(current + amount)
}

/**
 * Decrement taken slots
 * @param {number} amount - Amount to decrement (default: 1)
 */
export function decrementTaken(amount = 1) {
  const current = getState('slots.taken')
  setTakenSlots(Math.max(0, current - amount))
}

// ===================================
// DEVTOOLS INTEGRATION (Optional)
// ===================================

/**
 * Enable state logging for development
 */
export function enableDevTools() {
  if (typeof window !== 'undefined') {
    window.__STORE__ = {
      state,
      getters,
      getState,
      setState,
      getGetter,
      subscribe,
      resetState
    }
    console.log('[Store] DevTools enabled. Access store via window.__STORE__')
  }
}

/**
 * Disable state logging for development
 */
export function disableDevTools() {
  if (typeof window !== 'undefined') {
    delete window.__STORE__
    console.log('[Store] DevTools disabled')
  }
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize store with config values
 * @param {Object} config - Initial config
 */
export function initStore(config = {}) {
  if (config.slots) {
    if (typeof config.slots.max === 'number') {
      state.slots.max = config.slots.max
    }
    if (typeof config.slots.taken === 'number') {
      state.slots.taken = config.slots.taken
    }
  }

  // Enable dev tools in development
  if (process?.env?.NODE_ENV === 'development') {
    enableDevTools()
  }

  console.log('[Store] Initialized', JSON.parse(JSON.stringify(state)))
}

// ===================================
// EXPORTS
// ===================================

export default {
  state,
  getters,
  subscribe,
  getState,
  setState,
  getGetter,
  resetState,
  setMaxSlots,
  setTakenSlots,
  incrementTaken,
  decrementTaken,
  enableDevTools,
  disableDevTools,
  initStore
}
