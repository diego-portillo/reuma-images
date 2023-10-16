import React, { useState, useEffect } from 'react'
import { Confirm } from 'semantic-ui-react'

import ModalHeaderContent from './ModalHeaderContent'

const Header = () => {
  const [visible, setVisible] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [count, setCount] = useState(0)

  const closeModal = () => setModalOpen(false)
  const toggleVisible = () => setVisible((prevVisible) => !prevVisible)

  useEffect(() => {
    window.setTimeout(toggleVisible, 350)
  }, [])

  useEffect(() => {
    if (count === 4) {
      setModalOpen(true)
    }
  }, [count])

  return (
    <div className="container">

      <Confirm
        open={modalOpen}
        content={{ children: ModalHeaderContent }}
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButton="Ay, lo siento"
        confirmButton="OK"
        closeOnDimmerClick={false}
      />

      <style jsx>
        {`
          .container {
            margin: 2rem 0;
          }
          .container :global(.header) {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  )
}

export default Header