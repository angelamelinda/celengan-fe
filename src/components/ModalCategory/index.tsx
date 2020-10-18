import React, { ChangeEvent, FC } from 'react';
import { getIcons } from '../../helpers/getIcons';
import { ICategory } from '../../interfaces/states';
import Input from '../Input';
import {
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalWrapperContent,
  ModalFooterConfirm,
  ModalFooterCancel,
  ModalContentIcon,
  ModalContentInput,
} from './styled';

interface IModal {
  type: 'new' | 'update' | 'delete' | undefined;
  onCancel: () => void;
  onConfirm: () => void;
  category?: ICategory;
  open: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickIcon: () => void;
}

const ModalCategory: FC<IModal> = ({
  type,
  onCancel,
  onConfirm,
  category,
  open,
  onChange,
  onClickIcon,
}) => {
  const getHeader = (
    type: 'new' | 'update' | 'delete' | undefined,
    category?: ICategory,
  ) => {
    switch (type) {
      case 'new':
        return 'Add Category';
      case 'update':
        return `Update Category`;
      case 'delete':
        return `Delete Category`;
    }
  };

  const getFooter = (type: 'new' | 'update' | 'delete' | undefined) => {
    switch (type) {
      case 'new':
      case 'update':
        return (
          <>
            <ModalFooterCancel onClick={onCancel}>Cancel</ModalFooterCancel>
            <ModalFooterConfirm onClick={onConfirm}>Save</ModalFooterConfirm>
          </>
        );
      case 'delete':
        return (
          <>
            <ModalFooterCancel onClick={onCancel}>No</ModalFooterCancel>
            <ModalFooterConfirm onClick={onConfirm}>Yes</ModalFooterConfirm>
          </>
        );
    }
  };

  const getContent = (
    type: 'new' | 'update' | 'delete' | undefined,
    category?: ICategory,
  ) => {
    switch (type) {
      case 'new':
      case 'update':
        return (
          <>
            <ModalContentIcon onClick={onClickIcon}>
              {category && category.icon ? getIcons(category.icon) : '?'}
            </ModalContentIcon>
            <ModalContentInput>
              <Input
                value={category && category.name ? category.name : ''}
                placeholder="Category Name"
                onChange={onChange}
                name={'category-name'}
                id={'category-name'}
              />
            </ModalContentInput>
          </>
        );
      case 'delete':
        return `Are you sure delete ${(category as ICategory).name} category?`;
    }
  };

  if (open) {
    return (
      <ModalWrapper>
        <ModalWrapperContent>
          <ModalHeader>{getHeader(type, category)}</ModalHeader>
          <ModalBody>
            <ModalContent>{getContent(type, category)}</ModalContent>
            <ModalFooter>{getFooter(type)}</ModalFooter>
          </ModalBody>
        </ModalWrapperContent>
      </ModalWrapper>
    );
  }

  return null;
};

export default ModalCategory;
