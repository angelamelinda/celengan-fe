import React, { PureComponent } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ICON_NAME } from '../../constants';
import { getIcons } from '../../helpers/getIcons';
import { IAppState, ICategory } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import { IconsWrapper, Icon, IconWrapper } from './styled';
import { goBack, setCategory } from '../../redux/actions/category';

interface IIconsProps extends RouteComponentProps {
  history: History;
  goBack: (page: 'ICONS' | 'CATEGORY', history: History) => void;
  setCategory: (category: ICategory | undefined) => void;
  state: IAppState;
}

class Icons extends PureComponent<IIconsProps> {
  handleBack = () => {
    const { goBack, history } = this.props;
    goBack('ICONS', history);
  };

  handleClickIcon = (icon: string) => {
    const { setCategory, history, state } = this.props;
    const { categoryReducer } = state;
    const { category } = categoryReducer;

    if (category) {
      setCategory({
        ...category,
        icon,
      });
    }

    history.goBack();
  };

  render() {
    return (
      <AppNavigation title="Icons" onClickNavigation={this.handleBack}>
        <IconsWrapper>
          {ICON_NAME.map((icon, id) => (
            <IconWrapper key={id} onClick={() => this.handleClickIcon(icon)}>
              <Icon>{getIcons(icon)}</Icon>
            </IconWrapper>
          ))}
        </IconsWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  goBack,
  setCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Icons));
