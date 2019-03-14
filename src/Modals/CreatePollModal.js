import React from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import history from '../utils/history'


class CreatePollModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      task: '',
      show: false
    }
  }

  notify() {
    return toast('Poll created!')
  }

  handleChange = (e) => {
    this.setState({
      task: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const username = this.props.userEmail.split("@")[0]
    this.props.createPoll(this.state.task, username)
    this.notify()
    // this.props.toggleShow()
    history.push('/polls')


  }

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={() => {}} centered>
          <Modal.Header>
            <Modal.Title>Create poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <input onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Task"/>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleShow}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
              Create poll
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}



export default CreatePollModal
