import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class LoginComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      show: true
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  notify() {
    return toast('Welcome ' + this.state.username)
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // remove whitespaces
    const username = this.state.username.split(' ').join('')

    this.props.signIn(username)
    this.handleClose()
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={() => {}} centered>
          <Modal.Header>
            <Modal.Title>Login as</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <input onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Username"/>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
