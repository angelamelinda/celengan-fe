import React, { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { IAppState } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import {
  goBack,
  getCashflow,
  deleteCashflow,
  submitSaveCashflow,
  setCashflowField,
} from '../../redux/actions/cashflow';
import { setIsSetCategory } from '../../redux/actions/category';
import { setIsSetBudget, setBudgetRangeDate } from '../../redux/actions/budget';
import { IMatch } from '../../interfaces';
import { Button } from '../../components/Button/styled';
import Input from '../../components/Input';
import { APP_URL } from '../../constants';
import {
  CashflowDetailTabs,
  CashflowDetailTab,
  CashflowDetailDeleteButton,
  CashflowDetailCashflowError,
  CashflowDetailBudget,
  CashflowDetailBudgetLabel,
  CashflowDetailBudgetName,
  CashflowDetailCategoryError,
  CashflowDetailCategory,
  CashflowDetailCategoryLabel,
  CashflowDetailCategoryName,
  CashflowDetailForm,
} from './styled';
import { getDate } from '../../helpers';

interface ICashflowDetailProps extends RouteComponentProps {
  state: IAppState;
  history: History;
  goBack: (history: History) => void;
  match: IMatch;
  getCashflow: (id: string) => void;
  deleteCashflow: (id: string, history: History) => void;
  setIsSetCategory: (isSetCategory: boolean) => void;
  setIsSetBudget: (isSetBudget: boolean) => void;
  submitSaveCashflow: (
    type: 'new' | 'update',
    history: History,
    id?: string | undefined,
  ) => void;
  setCashflowField: (name: string, value: string) => void;
  setBudgetRangeDate: (startDate: string, endDate: string) => void;
}

class CashflowDetail extends PureComponent<ICashflowDetailProps> {
  isNew = this.props.location.pathname.includes('new');
  cashflowId = this.props.match.params.id;
  cashflowType = this.props.match.params.type;

  componentDidMount() {
    const { state, setCashflowField } = this.props;
    const { budgetReducer, categoryReducer } = state;
    const { isSetBudget } = budgetReducer;
    const { isSetCategory } = categoryReducer;

    if (!this.isNew && !(isSetBudget || isSetCategory)) {
      const { getCashflow } = this.props;
      getCashflow(this.cashflowId);
    }

    if (this.isNew) {
      setCashflowField('type', this.cashflowType);
    }
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack(history);
  };

  handleChooseCategory = () => {
    const { history, setIsSetCategory } = this.props;

    setIsSetCategory(true);
    history.push(APP_URL.CATEGORY.replace(':type', 'income'));
  };

  handleChooseBudget = () => {
    const { history, setIsSetBudget, setBudgetRangeDate, state } = this.props;
    const { cashflowReducer } = state;
    const { cashflow } = cashflowReducer;
    const { input_date } = cashflow;
    const date = getDate(input_date);
    setIsSetBudget(true);
    setBudgetRangeDate(date.startDate, date.endDate);
    history.push(APP_URL.BUDGET);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setCashflowField } = this.props;
    setCashflowField(name, value);
  };

  handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { setCashflowField } = this.props;
    const date = new Date(value).toISOString();
    setCashflowField(name, date);
  };

  handleSubmitForm = (type: 'new' | 'update') => {
    const { submitSaveCashflow, history } = this.props;
    submitSaveCashflow(type, history, this.cashflowId);
  };

  handleDelete = () => {
    const { deleteCashflow, history } = this.props;
    deleteCashflow(this.cashflowId, history);
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
        <CashflowDetailDeleteButton onClick={this.handleDelete}>
          Delete This Budget
        </CashflowDetailDeleteButton>
      </>
    );
  };

  renderForm = () => {
    const { state } = this.props;
    const { cashflowReducer, budgetReducer, categoryReducer } = state;
    const { selectedBudget: budget } = budgetReducer;
    const { selectedCategory: category } = categoryReducer;
    const { cashflow, errorForm } = cashflowReducer;
    const cashflowType = this.isNew ? this.cashflowType : cashflow.type;
    const d = new Date(cashflow.input_date);
    const MM =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const yyyy = d.getFullYear();
    const date = `${yyyy}-${MM}-${dd}`;
    return (
      <>
        <Input
          label="Cashflow Notes"
          placeholder="Cashflow Notes"
          value={cashflow.notes}
          name="notes"
          id="notes"
          onChange={this.handleChange}
          error={errorForm?.notes}
        />
        {cashflowType === 'income' ? (
          <CashflowDetailCategory
            className={errorForm && errorForm.category ? 'error' : ''}
          >
            <CashflowDetailCategoryLabel>
              Cashflow Category
            </CashflowDetailCategoryLabel>
            <CashflowDetailCategoryName
              onClick={this.handleChooseCategory}
              className={`${category && category.name ? '' : 'empty'}`}
            >
              {(category && category.name) || 'Choose Category'}
            </CashflowDetailCategoryName>
            <CashflowDetailCategoryError>
              {errorForm?.category}
            </CashflowDetailCategoryError>
          </CashflowDetailCategory>
        ) : (
          <CashflowDetailBudget
            className={errorForm && errorForm.budget ? 'error' : ''}
          >
            <CashflowDetailBudgetLabel>
              Cashflow Budget
            </CashflowDetailBudgetLabel>
            <CashflowDetailBudgetName
              onClick={this.handleChooseBudget}
              className={`${budget && budget.name ? '' : 'empty'}`}
            >
              {(budget && budget.name) || 'Choose Budget'}
            </CashflowDetailBudgetName>
            <CashflowDetailCashflowError>
              {errorForm?.budget}
            </CashflowDetailCashflowError>
          </CashflowDetailBudget>
        )}
        <Input
          label="Transaction Date"
          placeholder="Transaction Date"
          value={date}
          name="input_date"
          id="input_date"
          onChange={this.handleChangeDate}
          error={errorForm?.input_date}
          onKeyPress={this.validateNum}
          type="date"
        />
        <Input
          label="Cashflow Amount"
          placeholder="Cashflow Amount"
          value={cashflow.amount}
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
      return 'New Cashflow';
    }

    return 'Edit Cashflow';
  };

  handleClickTab = (type: string) => {
    const { history, setCashflowField } = this.props;
    history.push(APP_URL.NEW_CASHFLOW.replace(':type', type));
    this.cashflowType = type;
    setCashflowField('type', this.cashflowType);
  };

  render() {
    return (
      <AppNavigation
        title={this.getHeader()}
        onClickNavigation={this.handleBack}
      >
        {this.isNew && (
          <CashflowDetailTabs>
            {['income', 'expense'].map((item, id) => (
              <CashflowDetailTab
                key={id}
                className={item === this.cashflowType ? 'active' : ''}
                onClick={() => this.handleClickTab(item)}
              >
                {item}
              </CashflowDetailTab>
            ))}
          </CashflowDetailTabs>
        )}
        <CashflowDetailForm>{this.renderForm()}</CashflowDetailForm>
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  goBack,
  getCashflow,
  deleteCashflow,
  setIsSetCategory,
  setIsSetBudget,
  submitSaveCashflow,
  setCashflowField,
  setBudgetRangeDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CashflowDetail));
