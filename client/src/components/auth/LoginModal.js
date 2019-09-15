import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    //If authenticated Close Modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }
  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    //Create User object
    const user = {
      email,
      password
    };
    //Call login() in authActions
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='warning'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  className='mb-2'
                  type='email'
                  name='email'
                  placeholder='Email'
                  aria-placeholder='Email'
                  id='email'
                  onChange={this.onChange}
                ></Input>
                <Input
                  className='mb-2'
                  type='password'
                  name='password'
                  placeholder='Password'
                  aria-placeholder='Password'
                  id='password'
                  onChange={this.onChange}
                ></Input>
                <Button className='mt-2' color='info' block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
