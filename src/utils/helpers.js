/**
 * Smooth scroll to element
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: offsetPosition,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }
}

/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Contact form validation
 */
export const validateContactForm = (values) => {
  const errors = {}

  if (values.name !== undefined) {
    if (!values.name || !values.name.trim()) {
      errors.name = "Le nom est requis"
    } else if (values.name.trim().length < 2) {
      errors.name = "Le nom doit contenir au moins 2 caractères"
    }
  }

  if (values.email !== undefined) {
    if (!values.email || !values.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!isValidEmail(values.email)) {
      errors.email = "Format d'email invalide"
    }
  }

  if (values.subject !== undefined) {
    if (!values.subject || !values.subject.trim()) {
      errors.subject = "Le sujet est requis"
    }
  }

  if (values.message !== undefined) {
    if (!values.message || !values.message.trim()) {
      errors.message = "Le message est requis"
    } else if (values.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères"
    }
  }

  return errors
}