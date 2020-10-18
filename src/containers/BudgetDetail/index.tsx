import React, { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History, Location } from 'history';
import { IAppState, ICategory } from '../../interfaces/states';
import {
  goBack,
  getBudget,
  setBudgetField,
  submitSaveCategory,
  deleteBudget,
  resetBudgetState,
} from '../../redux/actions/budget';
import {
  setSelectedCategory,
  setIsSetCategory,
} from '../../redux/actions/category';
import Input from '../../components/Input';
import AppNavigation from '../../layouts/AppNavigation';
import {
  BudgetDetailCategory,
  BudgetDetailCategoryError,
  BudgetDetailCategoryLabel,
  BudgetDetailCategoryName,
  BudgetDetailDeleteButton,
  BudgetDetailWrapper,
} from './styled';
import { APP_URL } from '../../constants';
import { Button } from '../../components/Button/styled';
import { IMatch } from '../../interfaces';

interface IBudgetDetailProps extends RouteComponentProps {
  state: IAppState;
  getBudget: (id: string) => void;
  location: Location;
  history: History;
  setBudgetField: (name: string, value: string) => void;
  submitSaveCategory: (
    type: 'new' | 'update',
    history: History,
    id?: string | undefined,
  ) => void;
  match: IMatch;
  goBack: (history: History) => void;
  deleteBudget: (id: string, history: History) => void;
  resetBudgetState: () => void;
  setSelectedCategory: (category: ICategory | undefined) => void;
  setIsSetCategory: (isSetCategory: boolean) => void;
}

class BudgetDetail extends PureComponent<IBudgetDetailProps> {
  isNew = this.props.location.pathname.includes('new');
  budgetId = this.props.match.params.id;

  componentDidMount() {
    const { state } = this.props;
    const { categoryReducer } = state;
    const { isSetCategory } = categoryReducer;

    if (!this.isNew && !isSetCategory) {
      const { getBudget } = this.props;
      getBudget(this.budgetId);
    }
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack(history);
  };

  handleChooseCategory = () => {
    const { history, setIsSetCategory } = this.props;

    setIsSetCategory(true);
    history.push(APP_URL.CATEGORY.replace(':type', 'expense'));
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setBudgetField } = this.props;
    setBudgetField(name, value);
  };

  handleSubmitForm = (type: 'new' | 'update') => {
    const { submitSaveCategory, history } = this.props;

    submitSaveCategory(type, history, this.budgetId);
  };

  handleDelete = () => {
    const { deleteBudget, history } = this.props;
    deleteBudget(this.budgetId, history);
  };

  validateNum = (evt: any) => {
    const keyCode = evt.keyCode || evt.which;
    const string = String.fromCharCode(keyCode);
    const regex = /[0-9,]|\./;

    if (!regex.test(string)) {
      evt.returnValue = false;
      if (evt.preventDefault) evt.preventDefault();
    }
  };

  renderFormButton = () => {
    if (this.isNew) {
      return <Button onClick={() => this.handleSubmitForm('new')}>Save</Button>;
    }

    return (
      <>
        <Button onClick={() => this.handleSubmitForm('update')}>Update</Button>
        <BudgetDetailDeleteButton onClick={this.handleDelete}>
          Delete This Budget
        </BudgetDetailDeleteButton>
      </>
    );
  };

  renderForm = () => {
    const { state } = this.props;
    const { budgetReducer, categoryReducer } = state;
    const { budget, errorForm } = budgetReducer;
    const { selectedCategory: category } = categoryReducer;

    return (
      <>
        <Input
          label="Budget Name"
          placeholder="Budget Name"
          value={budget.name}
          name="name"
          id="name"
          onChange={this.handleChange}
          error={errorForm?.name}
        />
        <BudgetDetailCategory
          className={errorForm && errorForm.category ? 'error' : ''}
        >
          <BudgetDetailCategoryLabel>Budget Category</BudgetDetailCategoryLabel>
          <BudgetDetailCategoryName
            onClick={this.handleChooseCategory}
            className={`${category && category.name ? '' : 'empty'}`}
          >
            {(category && category.name) || 'Choose Category'}
          </BudgetDetailCategoryName>
          <BudgetDetailCategoryError>
            {errorForm?.category}
          </BudgetDetailCategoryError>
        </BudgetDetailCategory>
        <Input
          label="Budget Goal"
          placeholder="Budget Goal"
          value={budget.amount}
          name="amount"
          id="amount"
          onChange={this.handleChange}
          error={errorForm?.amount}
          onKeyPress={this.validateNum}
        />
        {this.renderFormButton()}
      </>
    );
  };

  getHeader = () => {
    if (this.isNew) {
      return 'New Budget';
    }

    return 'Edit Budget';
  };

  render() {
    return (
      <AppNavigation
        title={this.getHeader()}
        onClickNavigation={this.handleBack}
      >
        <BudgetDetailWrapper>{this.renderForm()}</BudgetDetailWrapper>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  getBudget,
  setBudgetField,
  submitSaveCategory,
  goBack,
  deleteBudget,
  resetBudgetState,
  setSelectedCategory,
  setIsSetCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BudgetDetail));
