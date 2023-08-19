import React from 'react'
import { CashFlowControlsProps } from './types'

const CfControls = ({
  setIsMonthChange,
  pocketMoney,
  setFormOpen,
  setSelectedCashFlow,
}: CashFlowControlsProps) => {
  return (
    <div className="mx-10">
      <div className="flex space-x-10 justify-center items-center mt-10">
        <button
          className=" button-month "
          onClick={() => setIsMonthChange('prev')}
        >
          Previous
        </button>

        <button
          className=" button-month "
          onClick={() => setIsMonthChange('next')}
        >
          Next
        </button>
        <div className="">
          {pocketMoney?.month.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <button
          className=" button-month items-center"
          onClick={() => {
            setFormOpen(true)
            setSelectedCashFlow(null)
          }}
        >
          Add +
        </button>
      </div>
    </div>
  )
}

export default CfControls
