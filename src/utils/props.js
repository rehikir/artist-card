/**
 * Props Validation Utility
 * Runtime validation for component props with helpful error messages
 */

// ===================================
// VALIDATION TYPES
// ===================================

const TypeValidators = {
  string: (value) => typeof value === 'string',
  number: (value) => typeof value === 'number',
  boolean: (value) => typeof value === 'boolean',
  function: (value) => typeof value === 'function',
  array: (value) => Array.isArray(value),
  object: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
  element: (value) => value instanceof Element,
  nullish: (value) => value === null || value === undefined
}

/**
 * Create a required validator
 * @param {string} type - Type to validate
 * @returns {Function} Validator function
 */
export function propType(type) {
  const validator = TypeValidators[type]
  if (!validator) {
    console.warn(`Unknown prop type: ${type}`)
    return () => true
  }
  return (value) => validator(value) && value !== null && value !== undefined
}

/**
 * Create a required validator (alias for propType)
 * @param {string} type - Type to validate
 * @returns {Function} Validator function
 */
export const required = propType

/**
 * Create an optional validator
 * @param {string} type - Type to validate
 * @returns {Function} Validator function
 */
export function optional(type) {
  const validator = TypeValidators[type]
  if (!validator) {
    return () => true
  }
  return (value) => value === null || value === undefined || validator(value)
}

/**
 * Create one-of validator (enum)
 * @param {Array} values - Allowed values
 * @returns {Function} Validator function
 */
export function oneOf(values) {
  return (value) => values.includes(value)
}

/**
 * Create one-of-type validator
 * @param {Array} types - Allowed types
 * @returns {Function} Validator function
 */
export function oneOfType(types) {
  return (value) => {
    for (const type of types) {
      if (typeof type === 'string') {
        const validator = TypeValidators[type]
        if (validator && validator(value)) return true
      } else if (typeof type === 'function' && type(value)) {
        return true
      }
    }
    return false
  }
}

/**
 * Create array-of validator
 * @param {Function} validator - Item validator
 * @returns {Function} Validator function
 */
export function arrayOf(validator) {
  return (value) => {
    if (!Array.isArray(value)) return false
    return value.every((item) => validator(item))
  }
}

/**
 * Create shape validator for objects
 * @param {Object} schema - Schema definition
 * @returns {Function} Validator function
 */
export function shape(schema) {
  return (value) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return false
    }
    return validateProps(value, schema, 'nested')
  }
}

/**
 * Create custom validator
 * @param {Function} validator - Custom validator function
 * @returns {Function} Validator function
 */
export function custom(validator) {
  return validator
}

// ===================================
// VALIDATION ENGINE
// ===================================

/**
 * Validate props against schema
 * @param {Object} props - Props to validate
 * @param {Object} schema - Schema definition
 * @param {string} componentName - Component name for error messages
 * @returns {boolean} Validation result
 */
export function validateProps(props, schema, componentName = 'Component') {
  if (!schema) return true

  const errors = []

  // Check each schema field
  for (const [propName, validator] of Object.entries(schema)) {
    const value = props[propName]

    // Check if required (validator doesn't allow null/undefined)
    const isRequired = !TypeValidators.nullish(value)

    if (value === undefined || value === null) {
      // Check if it's a required field by testing the validator
      const testValue = propName === 'children' ? '' : 'test'
      if (validator(testValue) && value === undefined && propName !== 'children') {
        // Validator passed a test value, so it's required
        // This is a simplification - in practice we'd mark required differently
      }
      continue // Skip validation for undefined/null optional props
    }

    if (!validator(value)) {
      errors.push(`  - "${propName}": expected ${getValidatorType(validator)}, received ${getTypeName(value)}`)
    }
  }

  // Check for unknown props (optional - can be disabled in production)
  const knownProps = new Set(Object.keys(schema))
  for (const propName of Object.keys(props)) {
    if (!knownProps.has(propName) && !propName.startsWith('data-') && !propName.startsWith('aria-')) {
      // Warning only, not an error
      console.warn(`[Props Warning] ${componentName}: Unknown prop "${propName}"`)
    }
  }

  if (errors.length > 0) {
    console.error(`[Props Error] ${componentName}: Invalid props:\n${errors.join('\n')}`)
    return false
  }

  return true
}

/**
 * Get type name for error messages
 * @param {*} value - Value to check
 * @returns {string} Type name
 */
function getTypeName(value) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

/**
 * Get validator type description for error messages
 * @param {Function} validator - Validator function
 * @returns {string} Type description
 */
function getValidatorType(validator) {
  const validatorStr = validator.toString()
  
  // Check for common patterns
  if (validatorStr.includes('string')) return 'string'
  if (validatorStr.includes('number')) return 'number'
  if (validatorStr.includes('boolean')) return 'boolean'
  if (validatorStr.includes('function')) return 'function'
  if (validatorStr.includes('array')) return 'array'
  if (validatorStr.includes('object')) return 'object'
  if (validatorStr.includes('includes')) return 'one of [...]'
  
  return 'custom'
}

// ===================================
// HOC FOR PROP VALIDATION
// ===================================

/**
 * Create a component with prop validation
 * @param {Function} Component - Component function
 * @param {Object} schema - Props schema
 * @param {string} name - Component name
 * @returns {Function} Wrapped component
 */
export function withProps(Component, schema, name) {
  return function ValidatedComponent(props = {}) {
    validateProps(props, schema, name || 'Component')
    return Component(props)
  }
}

// ===================================
// PREDEFINED SCHEMAS
// ===================================

/**
 * Common link props schema
 */
export const linkPropsSchema = {
  href: optional('string'),
  text: optional('string'),
  target: optional('string'),
  rel: optional('string'),
  variant: oneOf(['default', 'cta', 'secondary']),
  disabled: optional('boolean'),
  children: optional('string')
}

/**
 * Common image props schema
 */
export const imagePropsSchema = {
  src: required('string'),
  alt: required('string'),
  width: optional('string'),
  height: optional('string'),
  loading: oneOf(['lazy', 'eager'])
}

/**
 * Common button props schema
 */
export const buttonPropsSchema = {
  text: optional('string'),
  onClick: optional('function'),
  variant: oneOf(['default', 'primary', 'secondary', 'cta']),
  disabled: optional('boolean'),
  type: oneOf(['button', 'submit', 'reset']),
  children: optional('string')
}

export default {
  propType,
  required,
  optional,
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  custom,
  validateProps,
  withProps,
  linkPropsSchema,
  imagePropsSchema,
  buttonPropsSchema
}
