import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class PollDescriptionModal extends React.Component {
  // Modal that shows poll descrption

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={() => {}} centered>
          <Modal.Header>
            <Modal.Title>Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              { this.props.description }
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.toggleDescription}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default PollDescriptionModal
