import styled from 'styled-components';
import { COLOR } from '../../constants';

export const InputWrapper = styled.div`
    margin-bottom: 20px;
`

export const Label = styled.label`
    display: block;
    padding: 0 10px;
`

export const Input = styled.input` 
    border: 1px solid transparent;
    border-bottom-color: rgba(0, 0, 0, .4);
    height: 40px;
    width: 100%;
    padding: 0 10px;
    outline: none;
    transition: all .3s ease;

    ${InputWrapper}.error & {
        border-bottom-color: ${COLOR.RED};
    }
`



export const InputError = styled.div`
    color: ${COLOR.RED};
    font-size: calc(12 / 16 * 1rem);
    padding: 0 10px;
    margin-top: 5px;
`