'use client'

import React, { useState, useEffect } from 'react'
import { NOUNS } from '@/enums/nouns.js'
import { useFormState } from 'react-dom'
import { addNewExchange } from '@/actions/exchange-actions'
import SubmitButton from '@/components/SubmitButton'
import { toast } from 'react-hot-toast'

const NewExchange = ({ exchangeEvent }) => {
  const [formState, formAction] = useFormState(addNewExchange, {})
  const [isLoading, setIsLoading] = useState(false)
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
      exchangeEvent()
      setFormValues({
        name: '',
        baseUrl: '',
        api_key: '',
        secret_key: '',
        password: '',
      })
    } else if (
      formState.messages &&
      formState.messages['type'] === NOUNS.WARNING
    ) {
      toast.error(formState.messages['text'])
    }
    setIsLoading(false)
  }, [formState, formAction])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    formAction(formValues)
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl sm:w-96 text-xs">
      <div className="card-body p-6">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Exchange Name</label>
            <input
              type="text"
              placeholder="Exchange Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
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
          <SubmitButton text={'Add Exchange'} isLoading={isLoading} />
        </form>
      </div>
    </div>
  )
}

export default NewExchange
