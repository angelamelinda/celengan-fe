import styled from "styled-components";
import { COLOR } from "../../constants";

export const CashflowDetailTabs = styled.div`
    display: flex;

`

export const CashflowDetailTab = styled.div`
    padding: 10px;
    flex: 0 0 50%;
    max-width: 50%;
    text-align: center;
    border-bottom: 2px solid transparent;
    text-transform: uppercase;
    color: black;
    opacity: .2;

    &.active {
        border-color: ${COLOR.PRIMARY};
        color: ${COLOR.PRIMARY};
        opacity: 1;
    }
`

export const CashflowDetailDeleteButton = styled.div`
    text-align: center;
    margin-top: 20px;
    opacity: .6;
    cursor: pointer;
    user-select: none;
`

export const CashflowDetailCategoryError = styled.div`
    color: ${COLOR.RED};
    font-size: calc(12 / 16 * 1rem);
    padding: 0 10px;
    margin-top: 5px;
`

export const CashflowDetailCashflowError = styled.div`
    color: ${COLOR.RED};
    font-size: calc(12 / 16 * 1rem);
    padding: 0 10px;
    margin-top: 5px;
`

export const CashflowDetailCategory = styled.div`
    margin-bottom: 20px;
`

export const CashflowDetailCategoryLabel = styled.div`
    padding: 0 10px;
`

export const CashflowDetailCategoryName = styled.div`
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

    ${CashflowDetailCategory}.error & {
        border-bottom-color: ${COLOR.RED};
    }
`

export const CashflowDetailBudget = styled.div`
    margin-bottom: 20px;
`

export const CashflowDetailBudgetLabel = styled.div`
    padding: 0 10px;
`

export const CashflowDetailBudgetName = styled.div`
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

    ${CashflowDetailBudget}.error & {
        border-bottom-color: ${COLOR.RED};
    }
`

export const CashflowDetailForm = styled.div`
    padding: 15px;
`