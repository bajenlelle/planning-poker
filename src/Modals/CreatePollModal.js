import React from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import history from '../utils/history'


class CreatePollModal extends React.Component {
  // Modal for creating a new poll, handles creatPoll action

  constructor(props){
    super(props)
    this.state = {
      task: '',
      description: '',
      show: false
    }
  }

  notify() {
    return toast('Poll created!')
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }


    const username = this.props.userEmail.split("@")[0]
    this.props.createPoll(this.state.task, this.state.description, username)
    this.notify()
    this.props.toggleShow()
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
                    <input name="task" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} type="text" className="form-control" placeholder="Task"/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <textarea name="description" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Description" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleShow}>
              Cancel
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
