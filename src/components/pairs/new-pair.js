'use client'

import React, { useState, useEffect } from 'react'
import { NOUNS } from '@/enums/nouns.js'
import { useFormState } from 'react-dom'
import { addNewPair } from '@/actions/pair-actions'
import SubmitButton from '@/components/SubmitButton'
import { toast } from 'react-hot-toast'

const NewPair = ({ pairEvent }) => {
  const [formState, formAction] = useFormState(addNewPair, {})
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    target: ''
  })

  useEffect(() => {
    if (formState.messages && formState.messages['type'] === NOUNS.SUCCESS) {
      toast.success(formState.messages['text'])
      pairEvent()
      setFormValues({
        name: '',
        target: ''
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
    <div className="card w-full bg-base-100 text-xs shadow-xl sm:w-96">
      <div className="card-body p-6">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Pair Name</label>
            <input
              type="text"
              placeholder="Pair Name"
              name="name"
              maxLength={10}
              value={formValues.name}
              onChange={handleInputChange}
              className="input input-sm input-bordered input-primary w-full bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">Pair Target</label>
            <input
              type="number"
              placeholder="Pair Target"
              name="target"
              maxLength={11}
              value={formValues.target}
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
          <SubmitButton text={'Add Pair'} isLoading={isLoading} />
        </form>
      </div>
    </div>
  )
}

export default NewPair
