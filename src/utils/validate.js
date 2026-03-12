/**
 * Configuration validation utilities
 * Ensures runtime type safety for all config objects
 */

/**
 * @typedef {Object} Validator
 * @property {Function} type - Type checker function
 * @property {Function} required - Mark field as required
 * @property {Function} shape - Validate nested object shape
 */

/**
 * Create a type validator
 * @param {string} expectedType - Expected JavaScript type
 * @returns {Function} Validator function
 */
export function typeOf(expectedType) {
  return (value) => typeof value === expectedType
}

/**
 * Validate array type
 * @param {Function} itemValidator - Validator for array items
 * @returns {Function} Array validator function
 */
export function arrayOf(itemValidator) {
  return (value) => {
    if (!Array.isArray(value)) return false
    return value.every((item) => itemValidator(item))
  }
}

/**
 * Validate object shape
 * @param {Object} schema - Schema definition
 * @returns {Function} Shape validator function
 */
export function shape(schema) {
  return (value) => {
    if (typeof value !== 'object' || value === null) return false
    return validateSchema(value, schema)
  }
}

/**
 * Mark a validator as required
 * @param {Function} validator - Base validator
 * @returns {Function} Required validator
 */
export function required(validator) {
  return (value) => {
    if (value === undefined || value === null) return false
    return validator(value)
  }
}

/**
 * Add default value for optional fields
 * @param {Function} validator - Base validator
 * @param {*} defaultValue - Default value if undefined
 * @returns {Function} Validator with default
 */
export function withDefault(validator, defaultValue) {
  return (value) => {
    if (value === undefined) return true
    return validator(value)
  }
}

/**
 * Validate string is non-empty
 * @returns {Function} Non-empty string validator
 */
export function nonEmptyString() {
  return (value) => typeof value === 'string' && value.trim().length > 0
}

/**
 * Validate URL format
 * @returns {Function} URL validator
 */
export function url() {
  return (value) => {
    if (typeof value !== 'string') return false
    if (value === null || value === '') return true // Allow null/empty for optional
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }
}

/**
 * Validate object against schema
 * @param {Object} obj - Object to validate
 * @param {Object} schema - Schema definition
 * @returns {boolean} Validation result
 */
export function validateSchema(obj, schema) {
  for (const [key, validator] of Object.entries(schema)) {
    const value = obj[key]
    if (!validator(value)) {
      console.error(`Validation failed for field "${key}":`, {
        expected: validator.toString(),
        received: value
      })
      return false
    }
  }
  return true
}

/**
 * Create validated config with error handling
 * @param {Object} config - Config object
 * @param {Object} schema - Schema definition
 * @param {string} name - Config name for error messages
 * @returns {Object} Validated config
 * @throws {Error} If validation fails
 */
export function defineConfig(config, schema, name = 'config') {
  if (!validateSchema(config, schema)) {
    throw new Error(`Invalid ${name} configuration. See console for details.`)
  }
  return Object.freeze(config)
}
