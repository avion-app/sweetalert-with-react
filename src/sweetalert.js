import React, { createElement, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import transformer, { bindActions } from '@sweetalert/transformer'

const CallbackWrapper = ({ callback, children }) => {
  useEffect(() => { callback() }, [callback])

  return children
}

/*
 * Convert <Element /> to pure DOM node using ReactDOM
 * (remember that ReactDOM.render() is async!)
 */
const getDOMNodeFromJSX = (Element) => {
  const wrapper = document.createElement('div')
  const root = createRoot(wrapper)

  return new Promise((resolve) => {
    const callback = () => resolve(wrapper.firstChild)
    root.render(createElement(CallbackWrapper, { callback }, Element))
  })
}

const swal = (...params) => (
  transformer(params, {
    identifier: React.isValidElement,
    transformer: getDOMNodeFromJSX, 
  })
)

bindActions(swal)

export default swal

