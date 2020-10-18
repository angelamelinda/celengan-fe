import React, { ChangeEvent, PureComponent } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { APP_URL } from '../../constants';
import AppNavigation from '../../layouts/AppNavigation';
import {
  RegisterTop,
  RegisterWrapper,
  RegisterBottom,
  RegisterLoginLink,
  RegisterFormWrapper,
} from './styled';
import { Button } from '../../components/Button/styled';
import Input from '../../components/Input';
import { IAppState, IRegisterForm } from '../../interfaces/states';
import {
  setRegisterFieldForm,
  submitRegister,
  goBack,
  resetUserState,
} from '../../redux/actions/user';

interface IRegisterProps extends RouteComponentProps {
  history: History;
  submitRegister: (form: IRegisterForm, histor: History) => void;
  setRegisterFieldForm: (name: string, value: string) => void;
  goBack: (page: 'REGISTER' | 'LOGIN', history: History) => void;
  state: IAppState;
  resetUserState: () => void;
}

class Register extends PureComponent<IRegisterProps> {
  componentDidMount() {
    const { resetUserState } = this.props;
    resetUserState();
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack('REGISTER', history);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setRegisterFieldForm } = this.props;

    setRegisterFieldForm(name, value);
  };

  handleRegister = () => {
    const { state, history, submitRegister } = this.props;
    const { userReducer } = state;
    const { registerForm: form } = userReducer;

    submitRegister(form, history);
  };

  render() {
    const { userReducer } = this.props.state;
    const { registerForm: form, errorRegisterForm: error } = userReducer;

    return (
      <AppNavigation title="Register" onClickNavigation={this.handleBack}>
        <RegisterWrapper>
          <RegisterTop>
            <RegisterFormWrapper>
              <Input
                onChange={this.handleChange}
                name="username"
                id="username"
                placeholder="Username"
                label="Username"
                value={form.username}
                error={error?.username}
              />
              <Input
                onChange={this.handleChange}
                name="email"
                id="email"
                placeholder="Email"
                label="Email"
                value={form.email}
                type="email"
                error={error?.email}
              />
              <Input
                onChange={this.handleChange}
                name="password"
                id="password"
                placeholder="Password"
                label="Password"
                type="password"
                value={form.password}
                error={error?.password}
              />
              <Button onClick={this.handleRegister}>REGISTER</Button>
            </RegisterFormWrapper>
          </RegisterTop>
          <RegisterBottom>
            <RegisterLoginLink>
              Have an account? <Link to={APP_URL.LOGIN}>LOG IN</Link>
            </RegisterLoginLink>
          </RegisterBottom>
        </RegisterWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  submitRegister,
  setRegisterFieldForm,
  goBack,
  resetUserState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Register));
