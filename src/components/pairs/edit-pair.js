'use client'

import React, { useState, useEffect } from 'react'
import { NOUNS } from '@/enums/nouns.js'
import { useFormState } from 'react-dom'
import { UpdatePair } from '@/actions/pair-actions'
import SubmitButton from '@/components/SubmitButton'
import { toast } from 'react-hot-toast'

const EditPair = ({ pairEvent, editEvent }) => {
  const [formState, formAction] = useFormState(UpdatePair, {})
  const [isLoading, setIsLoading] = useState(false)
  const [loadedPair, setLoadedPair] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    target: '',
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
    setLoadedPair(pairEvent)
    if (pairEvent) {
      setFormValues({
        name: pairEvent.name || '',
        target: pairEvent.target || '',
      })
    }

    const timer = setTimeout(() => {
      editEvent(null)
    }, 30000)

    return () => clearTimeout(timer)
  }, [pairEvent])

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

  if (!loadedPair) {
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
            <label className="label">Pair Target</label>
            <input
              type="number"
              placeholder="Pair target"
              name="target"
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
          <SubmitButton text={'Edit Pair'} isLoading={isLoading} />
        </form>
      </div>
    </div>
  )
}

export default EditPair
