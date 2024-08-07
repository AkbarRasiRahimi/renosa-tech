'use client'

import React, { useState, useEffect } from 'react'
import { NOUNS } from '@/enums/nouns.js'
import { useFormState } from 'react-dom'
import { UpdateExchange } from '@/actions/exchange-actions'
import SubmitButton from '@/components/SubmitButton'
import { toast } from 'react-hot-toast'

const EditExchange = ({ exchangeEvent, editEvent }) => {
  const [formState, formAction] = useFormState(UpdateExchange, {})
  const [isLoading, setIsLoading] = useState(false)
  const [loadedExchange, setLoadedExchange] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    baseUrl: '',
    api_key: '',
    secret_key: '',
    password: '',
  })

  useEffect(() => {
    if (formState.messages && formState.messages['type'] === NOUNS.SUCCESS) {
      toast.success(formState.messages['text'])
      editEvent(null)
    } else if (
      formState.messages &&
      formState.messages['type'] === NOUNS.WARNING
    ) {
      toast.error(formState.messages['text'])
    }
    setIsLoading(false)
  }, [formState, formAction])

  useEffect(() => {
    setLoadedExchange(exchangeEvent)
    if (exchangeEvent) {
      setFormValues({
        name: exchangeEvent.name || '',
        baseUrl: exchangeEvent.baseUrl || '',
        api_key: exchangeEvent.api_key || '',
        secret_key: exchangeEvent.secret_key || '',
        password: exchangeEvent.password || '',
      })
    }

    const timer = setTimeout(() => {
      editEvent(null)
    }, 30000)

    return () => clearTimeout(timer)
  }, [exchangeEvent])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.target)
    console.log(formData)
    formAction(formData)
  }

  if (!loadedExchange) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-bars loading-sm"></span>
      </div>
    )
  }

  return (
    <div className="card w-full bg-base-100 text-xs shadow-xl sm:w-96">
      <div className="card-body p-6">
        <form onSubmit={handleSubmit}>
          <label className="label">{formValues.name}</label>
          <input type="hidden" name="name" value={formValues.name} />
          <div className="form-control">
            <label className="label">Exchange URL</label>
            <input
              type="text"
              placeholder="Exchange URL"
              name="baseUrl"
              value={formValues.baseUrl}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">API Key</label>
            <input
              type="text"
              placeholder="API Key"
              name="api_key"
              value={formValues.api_key}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">Secret Key</label>
            <input
              type="text"
              placeholder="Secret Key"
              name="secret_key"
              value={formValues.secret_key}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
          {formState.errors && (
            <ul className="mt-4 text-error">
              {Object.keys(formState.errors).map((key) => (
                <li key={key}>{formState.errors[key]}</li>
              ))}
            </ul>
          )}
          <SubmitButton text={'Edit Exchange'} isLoading={isLoading} />
        </form>
      </div>
    </div>
  )
}

export default EditExchange
