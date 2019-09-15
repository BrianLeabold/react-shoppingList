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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
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
    const { name, email, password } = this.state;
    //Create User object
    const newUser = {
      name,
      email,
      password
    };
    //Call register() in authActions
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='warning'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  className='mb-2'
                  type='text'
                  name='name'
                  placeholder='Name'
                  aria-placeholder='Name'
                  id='name'
                  onChange={this.onChange}
                ></Input>
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
                  Register
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
  { register, clearErrors }
)(RegisterModal);
