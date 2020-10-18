import styled from "styled-components";
import { COLOR } from "../../constants";

export const BudgetDetailWrapper = styled.div`
    padding: 15px;
    
`

export const BudgetDetailCategory = styled.div`
    margin-bottom: 20px;
`

export const BudgetDetailCategoryLabel = styled.div`
    padding: 0 10px;
`

export const BudgetDetailCategoryName = styled.div`
    border: 1px solid transparent;
    border-bottom-color: rgba(0,0,0,.4);
    height: 40px;
    width: 100%;
    padding: 0 10px;
    outline: none;
    transition: all .3s ease;
    display: flex;
    align-items: center;
    font-size: 13.33px;
    cursor: pointer;
    user-select: none;

    &.empty {
        color: #878482;
    }

    ${BudgetDetailCategory}.error & {
        border-bottom-color: ${COLOR.RED};
    }
`

export const BudgetDetailDeleteButton = styled.div`
    text-align: center;
    margin-top: 20px;
    opacity: .6;
    cursor: pointer;
    user-select: none;
`

export const BudgetDetailCategoryError = styled.div`
    color: ${COLOR.RED};
    font-size: calc(12 / 16 * 1rem);
    padding: 0 10px;
    margin-top: 5px;`