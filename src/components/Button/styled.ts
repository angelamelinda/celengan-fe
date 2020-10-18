import styled from "styled-components";
import ButtonComponent from ".";
import { COLOR } from "../../constants";

export const Button = styled(ButtonComponent)`
    font-size: 1rem;
    border-radius: 4px;
    background: ${COLOR.PRIMARY};
    border: 1px solid ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    display: block;
    padding: 10px;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
    transition: all .3s ease;
    text-decoration: none;

    &:hover {
        background: ${COLOR.WHITE};
        color: ${COLOR.PRIMARY};
    }
`