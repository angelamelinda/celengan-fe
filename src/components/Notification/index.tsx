import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppState, INotification } from '../../interfaces/states';
import { NotificationWrapper, NotificationContent } from './styled';
import { setNotification } from '../../redux/actions/common';

interface INotificationProps {
  state: IAppState;
  setNotification: (notification: INotification | null) => void;
}

class Notification extends PureComponent<INotificationProps> {
  timerHandle: number = 0;
  timerHandleCloseOnClick: number = 0;
  mounted: boolean = true;

  state = {
    willClose: false,
  };

  componentDidMount() {
    const { state } = this.props;
    const { commonReducer } = state;
    const { notification } = commonReducer;

    if (notification && notification.autoClose) {
      this.timerHandle = setTimeout(() => {
        this.handleCloseNotification();
      }, notification.autoClose);
    }
  }

  componentWillUnmount = () => {
    this.mounted = false;
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }

    if (this.timerHandleCloseOnClick) {
      clearTimeout(this.timerHandleCloseOnClick);
      this.timerHandleCloseOnClick = 0;
    }
  };

  handleCloseNotification = () => {
    this.setState(
      () => ({
        willClose: true,
      }),
      () => {
        this.timerHandleCloseOnClick = setTimeout(() => {
          const { setNotification } = this.props;
          setNotification(null);
          if (this.mounted) this.setState({ willClose: false });
        }, 500);
      },
    );
  };

  render() {
    const { state } = this.props;
    const { commonReducer } = state;
    const { notification } = commonReducer;

    return (
      <NotificationWrapper
        onClick={this.handleCloseNotification}
        className={this.state.willClose ? 'close' : 'open'}
      >
        <NotificationContent>
          {notification && notification.message}
        </NotificationContent>
      </NotificationWrapper>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
