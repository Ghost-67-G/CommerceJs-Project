/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

const Checkout = () => {

  return (
    <div className={`container`}>
        <div className="row bs-wizard" style={{ borderBottom: 0 }}>
  <div className="col-xs-3 bs-wizard-step complete">
    <div className="text-center bs-wizard-stepnum">Step 1</div>
    <div className="progress">
      <div className="progress-bar" />
    </div>
    <a href="#" className="bs-wizard-dot" />
    <div className="bs-wizard-info text-center">
      Lorem ipsum dolor sit amet.
    </div>
  </div>
  <div className="col-xs-3 bs-wizard-step complete">
    !-- complete --
    <div className="text-center bs-wizard-stepnum">Step 2</div>
    <div className="progress">
      <div className="progress-bar" />
    </div>
    <a href="#" className="bs-wizard-dot" />
    <div className="bs-wizard-info text-center">
      Nam mollis tristique erat vel tristique. Aliquam erat volutpat. Mauris et
      vestibulum nisi. Duis molestie nisl sed scelerisque vestibulum. Nam
      placerat tristique placerat
    </div>
  </div>
  <div className="col-xs-3 bs-wizard-step active">
    !-- complete --
    <div className="text-center bs-wizard-stepnum">Step 3</div>
    <div className="progress">
      <div className="progress-bar" />
    </div>
    <a href="#" className="bs-wizard-dot" />
    <div className="bs-wizard-info text-center">
      Integer semper dolor ac auctor rutrum. Duis porta ipsum vitae mi bibendum
      bibendum
    </div>
  </div>
  <div className="col-xs-3 bs-wizard-step disabled">
    {" "}
    !-- active --
    <div className="text-center bs-wizard-stepnum">Step 4</div>
    <div className="progress">
      <div className="progress-bar" />
    </div>
    <a href="#" className="bs-wizard-dot" />
    <div className="bs-wizard-info text-center">
      {" "}
      Curabitur mollis magna at blandit vestibulum. Vestibulum ante ipsum primis
      in faucibus orci luctus et ultrices posuere cubilia Curae
    </div>
  </div>
</div>

    </div>
  )
}

export default Checkout