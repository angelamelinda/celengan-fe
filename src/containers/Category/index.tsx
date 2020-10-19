import React, { ChangeEvent, PureComponent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import ModalCategory from '../../components/ModalCategory';
import { APP_URL } from '../../constants';
import { getIcons } from '../../helpers/getIcons';
import { IMatch } from '../../interfaces';
import { IAppState, ICategory } from '../../interfaces/states';
import AppNavigation from '../../layouts/AppNavigation';
import {
  goBack,
  setCategory,
  setModalType,
  setIsModalCategoryOpen,
  deleteCategory,
  submitSaveCategory,
  getCategories,
  setSelectedCategory,
} from '../../redux/actions/category';
import {
  CategoryCTA,
  CategoryCTADelete,
  CategoryCTAUpdate,
  CategoryItem,
  CategoryItemIcon,
  CategoryItemName,
  CategoryNotFound,
  CategoryWrapper,
} from './styled';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

interface ICategoryProps extends RouteComponentProps {
  match: IMatch;
  state: IAppState;
  setCategory: (category: ICategory | undefined) => void;
  setSelectedCategory: (category: ICategory | undefined) => void;
  setModalType: (type: 'new' | 'update' | 'delete' | undefined) => void;
  setIsModalCategoryOpen: (isModalCategoryOpen: boolean) => void;
  deleteCategory: (id: string, data: ICategory) => void;
  submitSaveCategory: (
    data: ICategory,
    type: 'new' | 'update',
    id?: string | undefined,
  ) => void;
  getCategories: () => void;
  goBack: (page: 'ICONS' | 'CATEGORY', history: History) => void;
  history: History;
}

class Category extends PureComponent<ICategoryProps> {
  categoryType: string = this.props.match.params.type;

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleBack = () => {
    const { goBack, history } = this.props;
    goBack('CATEGORY', history);
  };

  handleChangeInputCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { state, setCategory } = this.props;
    const { categoryReducer } = state;
    const { category } = categoryReducer;

    if (category) {
      setCategory({ ...category, name: value });
    }
  };

  handleAddCategory = () => {
    const { setCategory, setModalType, setIsModalCategoryOpen } = this.props;
    const category = {
      name: '',
      type: this.categoryType,
      icon: '',
    };

    setModalType('new');
    setIsModalCategoryOpen(true);
    setCategory(category);
  };

  handleDeleteCategory = (
    e: MouseEvent<HTMLDivElement>,
    category: ICategory,
  ) => {
    e.stopPropagation();
    const { setCategory, setModalType, setIsModalCategoryOpen } = this.props;

    setModalType('delete');
    setIsModalCategoryOpen(true);
    setCategory(category);
  };

  handleUpdateCategory = (
    e: MouseEvent<HTMLDivElement>,
    category: ICategory,
  ) => {
    e.stopPropagation();
    const { setCategory, setModalType, setIsModalCategoryOpen } = this.props;

    setModalType('update');
    setIsModalCategoryOpen(true);
    setCategory(category);
  };

  handleConfirmModal = () => {
    const { state, submitSaveCategory, deleteCategory } = this.props;
    const { categoryReducer } = state;
    const { modalType, category } = categoryReducer;

    switch (modalType) {
      case 'new':
      case 'update':
        submitSaveCategory(
          category as ICategory,
          modalType,
          (category as ICategory)._id as string,
        );
        break;
      case 'delete':
        deleteCategory(
          (category as ICategory)._id as string,
          category as ICategory,
        );
        break;
    }
  };

  handleCancelModal = () => {
    const { setCategory, setIsModalCategoryOpen, setModalType } = this.props;
    setCategory(undefined);
    setIsModalCategoryOpen(false);
    setModalType(undefined);
  };

  handleClickIcon = () => {
    const { history } = this.props;
    history.push(APP_URL.ICONS);
  };

  handleClickCategory = (category: ICategory) => {
    const { setSelectedCategory, history } = this.props;
    setSelectedCategory(category);
    history.goBack();
  };

  getCategoryData = (type: string) => {
    const { state } = this.props;
    const { categoryReducer } = state;
    const { categoryExpense, categoryIncome } = categoryReducer;

    if (type === 'income') {
      return categoryIncome;
    }

    return categoryExpense;
  };

  getAppNavigationHeader = (type: string) => {
    if (type === 'income') {
      return 'Income Category';
    }

    return 'Expense Category';
  };

  render() {
    const { state } = this.props;
    const { categoryReducer, commonReducer } = state;
    const { isModalCategoryOpen, category, modalType } = categoryReducer;
    const { isLoading } = commonReducer;
    const categoryData = this.getCategoryData(this.categoryType);

    return (
      <AppNavigation
        title={this.getAppNavigationHeader(this.categoryType)}
        onClickAdd={this.handleAddCategory}
        onClickNavigation={this.handleBack}
      >
        {categoryData && categoryData.length === 0 && !isLoading && (
          <CategoryNotFound>Category is Empty</CategoryNotFound>
        )}
        {categoryData && (
          <CategoryWrapper>
            {categoryData &&
              categoryData.map((category, id) => (
                <CategoryItem
                  key={id}
                  onClick={() => this.handleClickCategory(category)}
                >
                  <CategoryItemIcon>{getIcons(category.icon)}</CategoryItemIcon>
                  <CategoryItemName>{category.name}</CategoryItemName>
                  <CategoryCTA>
                    <CategoryCTADelete
                      onClick={(e: MouseEvent<HTMLDivElement>) =>
                        this.handleDeleteCategory(e, category)
                      }
                    >
                      <AiFillDelete />
                    </CategoryCTADelete>
                    <CategoryCTAUpdate
                      onClick={(e: MouseEvent<HTMLDivElement>) =>
                        this.handleUpdateCategory(e, category)
                      }
                    >
                      <MdEdit />
                    </CategoryCTAUpdate>
                  </CategoryCTA>
                </CategoryItem>
              ))}
          </CategoryWrapper>
        )}
        <ModalCategory
          open={isModalCategoryOpen}
          category={category}
          onChange={this.handleChangeInputCategory}
          type={modalType}
          onCancel={this.handleCancelModal}
          onConfirm={this.handleConfirmModal}
          onClickIcon={this.handleClickIcon}
        />
      </AppNavigation>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({ state });

const mapDispatchToProps = {
  goBack,
  setCategory,
  setModalType,
  setIsModalCategoryOpen,
  deleteCategory,
  submitSaveCategory,
  getCategories,
  setSelectedCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Category));
