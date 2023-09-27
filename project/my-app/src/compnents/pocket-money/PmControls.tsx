import React from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare, BsSave } from 'react-icons/bs'
import { TfiBackLeft } from 'react-icons/tfi'
import { PmControlsProps } from './types'
import Notification from '../../compnents/notification/Notification'
import NotificationSuccess from '../notification/NotificationSuccess'

const PmControls = ({
  setIsMonthChange,
  handleSavePm,
  setChangeCancel,
  saveDiasbled,
  sussessAlert,
}: PmControlsProps) => {
  return (
    <div className="">
      <div className="flex flex-row justify-start">
        <div className="flex space-x-3 mx-5">
          <button onClick={() => setIsMonthChange('prev')}>
            <BsArrowLeftSquare className="icons-controls" />
          </button>
          <button onClick={() => setIsMonthChange('next')}>
            <BsArrowRightSquare className="icons-controls" />
          </button>
        </div>
        <div className=" border-l border-gray-300 h-8"></div>
        <div className="flex space-x-3 px-10">
          <button
            className={`px-5 py-2 ${
              saveDiasbled ? 'button-disabled' : 'button-month'
            }`}
            onClick={() => handleSavePm()}
            disabled={saveDiasbled}
          >
            <div className="flex flex-row space-x-2">
              <div className="py-1">
                <BsSave />
              </div>
              <span>Save</span>
            </div>
          </button>
          <button
            className="button-empty flex flex-row space-x-2 button-month px-5 py-2"
            onClick={() => setChangeCancel(true)}
          >
            <div className="py-1">
              <TfiBackLeft />
            </div>
            <span>Cancel</span>
          </button>
          {saveDiasbled && (
            <Notification notification={'Budget limit exceeded !'} />
          )}
          {sussessAlert && <NotificationSuccess />}
        </div>
      </div>
    </div>
  )
}

export default PmControls
